<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fadli's AI Virtual Office - Isometric View</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #07090e;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            user-select: none;
        }
        #ui-overlay {
            position: absolute;
            top: 20px;
            left: 20px;
            color: white;
            pointer-events: none;
            z-index: 10;
        }
        h1 {
            font-size: 20px;
            margin: 0 0 4px 0;
            background: linear-gradient(90deg, #ff7b00, #38bdf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
        }
        p {
            font-size: 12px;
            color: #94a3b8;
            margin: 0;
        }
        #status-panel {
            position: absolute;
            top: 80px;
            left: 20px;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 123, 0, 0.3);
            padding: 12px 16px;
            border-radius: 12px;
            width: 250px;
            z-index: 10;
            box-shadow: 0 10px 25px rgba(0,0,0,0.6);
        }
        .robot-status-item {
            font-size: 11px;
            color: #cbd5e1;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
        }
        .robot-status-item span {
            color: #ff7b00;
            font-weight: bold;
        }
        #control-panel {
            position: absolute;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            padding: 15px 22px;
            border-radius: 14px;
            border: 1px solid rgba(255, 123, 0, 0.4);
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.8);
            z-index: 10;
            width: 440px;
        }
        .input-row {
            display: flex;
            gap: 10px;
        }
        input {
            background: #0b0f19;
            border: 1px solid #334155;
            padding: 10px 14px;
            color: white;
            border-radius: 8px;
            flex: 1;
            outline: none;
            font-size: 13px;
        }
        input:focus {
            border-color: #ff7b00;
        }
        button {
            background: linear-gradient(135deg, #ff7b00, #ff5100);
            border: none;
            color: white;
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
        }
        button:hover {
            opacity: 0.9;
        }
        #log-box {
            font-size: 11px;
            color: #38bdf8;
            background: rgba(0, 0, 0, 0.4);
            padding: 8px 12px;
            border-radius: 6px;
            border-left: 3px solid #ff7b00;
        }
    </style>
    <!-- Three.js CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>

    <div id="ui-overlay">
        <h1>Fadli's AI Virtual Office</h1>
        <p>Orchestrator: Boss Fadli | Isometric 3D View</p>
    </div>

    <div id="status-panel">
        <p style="font-weight: bold; color: #fff; margin-bottom: 8px;">LIVE WORKFORCE STATUS</p>
        <div id="status-list"></div>
    </div>

    <div id="control-panel">
        <div class="input-row">
            <input type="text" id="promptInput" placeholder="Cth: @Delta buat kopi / @Alpha matikan lampu">
            <button onclick="sendCommand()">Eksekusi</button>
        </div>
        <div id="log-box">Sistem siap. Ketik perintah berformat @namarobot [perintah]...</div>
    </div>

    <!-- Memuat file script.js terpisah -->
    <script src="script.js" defer></script>
</body>
</html>
