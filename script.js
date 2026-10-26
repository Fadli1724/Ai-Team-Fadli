// --- SETUP SCENE & CAMERA DENGAN ORBIT CONTROLS ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07090e);
scene.fog = new THREE.FogExp2(0x07090e, 0.006);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(28, 24, 28);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Memuat OrbitControls untuk fitur Putar 360° & Zoom In/Out
const scriptControls = document.createElement('script');
scriptControls.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
scriptControls.onload = () => {
    window.controls = new THREE.OrbitControls(camera, renderer.domElement);
    window.controls.enableDamping = true;
    window.controls.dampingFactor = 0.05;
    window.controls.maxPolarAngle = Math.PI / 2 - 0.05; // Batas agar tidak tembus ke bawah lantai
    window.controls.minDistance = 10;
    window.controls.maxDistance = 60;
    window.controls.target.set(0, 4, 0);
};
document.head.appendChild(scriptControls);

// --- LIGHTING & LED STRIP ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
dirLight.position.set(15, 30, 15);
dirLight.castShadow = true;
scene.add(dirLight);

const neonOrange = new THREE.PointLight(0xff7b00, 2, 40);
neonOrange.position.set(0, 9, 0);
scene.add(neonOrange);

// --- ARSITEKTUR GEDUNG 2 LANTAI ---
const floorMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 });

const floor1 = new THREE.Mesh(new THREE.BoxGeometry(32, 0.4, 20), floorMat);
floor1.position.set(0, -0.2, 0);
scene.add(floor1);

const floor2 = new THREE.Mesh(new THREE.BoxGeometry(32, 0.4, 20), floorMat);
floor2.position.set(0, 8.5, 0);
scene.add(floor2);

// Dinding Belakang
const backWall1 = new THREE.Mesh(new THREE.BoxGeometry(32, 9, 0.4), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
backWall1.position.set(0, 4, -10);
scene.add(backWall1);

const backWall2 = new THREE.Mesh(new THREE.BoxGeometry(32, 9, 0.4), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
backWall2.position.set(0, 13, -10);
scene.add(backWall2);

// --- RUANG BOS & WORKSTATION ---
const bossDesk = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.3, 2), new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 }));
bossDesk.position.set(0, 8.8, -5);
scene.add(bossDesk);

const fadliMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1, 0.7), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }));
fadliMesh.position.set(0, 9.5, -5);
scene.add(fadliMesh);

for(let i = 0; i < 4; i++) {
    let xPos = (i - 1.5) * 6;
    let workDesk = new THREE.Mesh(new THREE.BoxGeometry(4, 0.25, 1.8), new THREE.MeshStandardMaterial({ color: 0x1f2937 }));
    workDesk.position.set(xPos, 8.8, 3);
    scene.add(workDesk);

    let monitor = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.2, 0.1), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.5 }));
    monitor.position.set(xPos, 9.6, 2.9);
    scene.add(monitor);
}

// --- COFFEE BAR & FASE RINTANGAN (TANGGA & LIFT) ---
const coffeeCounter = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 2), new THREE.MeshStandardMaterial({ color: 0x334155 }));
coffeeCounter.position.set(10, 0.5, 5);
scene.add(coffeeCounter);

const coffeeMachine = new THREE.Mesh(new THREE.BoxGeometry(1, 0.9, 0.8), new THREE.MeshStandardMaterial({ color: 0xff7b00, emissive: 0x442200 }));
coffeeMachine.position.set(10, 1.45, 5);
scene.add(coffeeMachine);

// Efek Uap Kopi (Animasi Mesin Kopi)
const steamParticles = [];
for(let i=0; i<3; i++) {
    let steam = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
    steam.position.set(9.7 + (i*0.2), 2.0, 5);
    scene.add(steam);
    steamParticles.push(steam);
}

const coffeeCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.22, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.4 }));
coffeeCup.position.set(9.2, 1.15, 5);
scene.add(coffeeCup);

const sofa = new THREE.Mesh(new THREE.BoxGeometry(5, 0.7, 2), new THREE.MeshStandardMaterial({ color: 0x475569 }));
sofa.position.set(-10, 0.35, -5);
scene.add(sofa);

const prayerMat = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.04, 3.8), new THREE.MeshStandardMaterial({ color: 0x065f46 }));
prayerMat.position.set(-10, 0.02, 5);
scene.add(prayerMat);

// Tangga Fisik
for(let i = 0; i < 8; i++) {
    let step = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.2, 0.8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
    step.position.set(13, i * 1.05 + 0.5, -3 + (i * 0.6));
    scene.add(step);
}

// Kotak Lift Fisik
const elevatorBox = new THREE.Mesh(new THREE.BoxGeometry(2.2, 8, 2.2), new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.15 }));
elevatorBox.position.set(-13, 4, -3);
scene.add(elevatorBox);

// Saklar Lampu
const lightSwitch = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.1), new THREE.MeshStandardMaterial({ color: 0xff7b00, emissive: 0x7c2d12 }));
lightSwitch.position.set(-15.8, 2, 0);
scene.add(lightSwitch);

// --- PEMBUATAN TEXT SPRITE NAMA DI ATAS ROBOT ---
function createTextSprite(message) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = 'Bold 36px Arial';
    context.fillStyle = '#38bdf8';
    context.textAlign = 'center';
    context.fillText(message, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1.5, 0.75, 1);
    sprite.position.set(0, 1.8, 0);
    return sprite;
}

// --- PEMBUATAN MODEL ROBOT KOTAK DENGAN ANIMASI ANGGOTA TUBUH ---
function createBlockyRobot(colorHex, name) {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.3, metalness: 0.5 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });

    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), darkMat);
    legL.position.set(-0.14, 0.2, 0);
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), darkMat);
    legR.position.set(0.14, 0.2, 0);
    group.add(legR);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.35), mat);
    torso.position.y = 0.7;
    group.add(torso);

    // Simpan referensi tangan untuk animasi ayunan
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.45, 0.14), darkMat);
    armL.position.set(-0.38, 0.7, 0);
    group.add(armL);

    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.45, 0.14), darkMat);
    armR.position.set(0.38, 0.7, 0);
    group.add(armR);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.35), mat);
    head.position.y = 1.2;
    group.add(head);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.05), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.9 }));
    visor.position.set(0, 1.2, 0.18);
    group.add(visor);

    // Tambahkan label teks nama di atas robot
    const nameSprite = createTextSprite('@' + name);
    group.add(nameSprite);

    group.userData = { armL, armR, legL, legR };
    return group;
}

// --- 6 ROBOT DATA ---
const robots = [
    { name: "alpha", color: 0xff7b00, pos: new THREE.Vector3(-6, 9.1, 3), home: new THREE.Vector3(-6, 9.1, 3), target: new THREE.Vector3(-6, 9.1, 3), status: "Bekerja di Workstation (L2)" },
    { name: "beta", color: 0x38bdf8, pos: new THREE.Vector3(-2, 9.1, 3), home: new THREE.Vector3(-2, 9.1, 3), target: new THREE.Vector3(-2, 9.1, 3), status: "Coding System (L2)" },
    { name: "gamma", color: 0xa855f7, pos: new THREE.Vector3(-10, 0.2, -5), home: new THREE.Vector3(-10, 0.2, -5), target: new THREE.Vector3(-10, 0.2, -5), status: "Bersantai di Sofa (L1)" },
    { name: "delta", color: 0x10b981, pos: new THREE.Vector3(10, 0.2, 5), home: new THREE.Vector3(10, 0.2, 5), target: new THREE.Vector3(10, 0.2, 5), status: "Barista di Coffee Bar (L1)" },
    { name: "epsilon", color: 0x3b82f6, pos: new THREE.Vector3(-10, 0.2, 5), home: new THREE.Vector3(-10, 0.2, 5), status: "Menjaga Ruang Sholat (L1)" },
    { name: "zeta", color: 0xec4899, pos: new THREE.Vector3(2, 9.1, 3), home: new THREE.Vector3(2, 9.1, 3), target: new THREE.Vector3(2, 9.1, 3), status: "Monitoring Sistem (L2)" }
];

const robotMeshes = robots.map(r => {
    const mesh = createBlockyRobot(r.color, r.name);
    mesh.position.copy(r.pos);
    scene.add(mesh);
    return { data: r, mesh: mesh };
});

function updateStatusUI() {
    const listEl = document.getElementById('status-list');
    if (!listEl) return;
    listEl.innerHTML = robots.map(r => `
        <div class="robot-status-item">
            <b>@${r.name}</b>
            <span>${r.status}</span>
        </div>
    `).join('');
}
updateStatusUI();

// --- KONTROL LAMPU ---
let isLightOn = true;
function toggleLights(status, robotName) {
    isLightOn = status;
    dirLight.intensity = isLightOn ? 1.1 : 0.2;
    neonOrange.intensity = isLightOn ? 2 : 0.2;
    scene.background.setHex(isLightOn ? 0x07090e : 0x020305);
    lightSwitch.material.emissive.setHex(isLightOn ? 0x7c2d12 : 0x047857);
    
    let msg = isLightOn ? "Lampu ruangan dihidupkan." : "Lampu ruangan dimatikan.";
    if(robotName) {
        msg = `Robot @${robotName} menekan saklar dinding dan ${isLightOn ? 'menyalakan' : 'mematikan'} lampu!`;
    }
    const logBox = document.getElementById('log-box');
    if (logBox) logBox.innerText = msg;
    updateStatusUI();
}

// --- PATHFINDING & NAVIGASI BERTAPAK (TANGGA/LIFT) ---
function moveRobotTo(robotObj, finalDest, callback) {
    const startY = robotObj.mesh.position.y;
    const destY = finalDest.y;

    // Jika perpindahan lantai (L1 ke L2 atau sebaliknya), arahkan dulu ke jalur Lift/Tangga agar tidak nembus
    if (Math.abs(startY - destY) > 2) {
        // Titik transit lewat lift (-13, lantai_asal, -3)
        let transitPoint = new THREE.Vector3(-13, startY, -3);
        
        animateStep(robotObj.mesh, transitPoint, () => {
            // Naik/turun lift secara vertikal halus
            let verticalPoint = new THREE.Vector3(-13, destY, -3);
            animateStep(robotObj.mesh, verticalPoint, () => {
                // Menuju tujuan akhir di lantai tersebut
                animateStep(robotObj.mesh, finalDest, callback);
            });
        });
    } else {
        animateStep(robotObj.mesh, finalDest, callback);
    }
}

function animateStep(mesh, targetPos, onComplete) {
    let startTime = null;
    let startPos = mesh.position.clone();
    let duration = 1200; // Durasi milidetik per segmen gerakan agar mulus

    function stepAnim(timestamp) {
        if (!startTime) startTime = timestamp;
        let elapsed = timestamp - startTime;
        let progress = Math.min(elapsed / duration, 1);

        mesh.position.lerpVectors(startPos, targetPos, progress);

        if (progress < 1) {
            requestAnimationFrame(stepAnim);
        } else if (onComplete) {
            onComplete();
        }
    }
    requestAnimationFrame(stepAnim);
}

// --- SISTEM PERINTAH & INTERAKSI ANTAR ROBOT ---
function sendCommand() {
    const inputEl = document.getElementById('promptInput');
    const logBox = document.getElementById('log-box');
    if (!inputEl) return;

    const raw = inputEl.value.trim();
    if(!raw) return;
    const lower = raw.toLowerCase();
    
    let targetRobot = null;
    robotMeshes.forEach(rm => {
        if(lower.includes('@' + rm.data.name)) targetRobot = rm;
    });

    if(targetRobot) {
        if(lower.includes('matikan lampu') || lower.includes('matiin lampu')) {
            targetRobot.data.status = "Berjalan ke Saklar";
            updateStatusUI();
            
            let switchPos = new THREE.Vector3(-14, 0.2, 0);
            moveRobotTo(targetRobot, switchPos, () => {
                toggleLights(false, targetRobot.data.name);
                targetRobot.data.status = "Interaksi Sistem";
                updateStatusUI();

                setTimeout(() => {
                    targetRobot.data.status = "Kembali ke Posisi Asal";
                    updateStatusUI();
                    moveRobotTo(targetRobot, targetRobot.data.home, () => {
                        targetRobot.data.status = "Standby (Lampu Mati)";
                        updateStatusUI();
                    });
                }, 1200);
            });
        } else if(lower.includes('hidupkan lampu') || lower.includes('nyalakan lampu')) {
            targetRobot.data.status = "Berjalan ke Saklar";
            updateStatusUI();

            let switchPos = new THREE.Vector3(-14, 0.2, 0);
            moveRobotTo(targetRobot, switchPos, () => {
                toggleLights(true, targetRobot.data.name);
                targetRobot.data.status = "Interaksi Sistem";
                updateStatusUI();

                setTimeout(() => {
                    targetRobot.data.status = "Kembali ke Posisi Asal";
                    updateStatusUI();
                    moveRobotTo(targetRobot, targetRobot.data.home, () => {
                        targetRobot.data.status = "Standby (Lampu Hidup)";
                        updateStatusUI();
                    });
                }, 1200);
            });
        } else if(lower.includes('kopi') || lower.includes('buatkan kopi')) {
            targetRobot.data.status = "Menuju Coffee Bar";
            updateStatusUI();

            let coffeePos = new THREE.Vector3(8.5, 0.2, 5);
            moveRobotTo(targetRobot, coffeePos, () => {
                targetRobot.data.status = "Meracik Kopi";
                if (logBox) logBox.innerText = `Robot @${targetRobot.data.name}: "Secangkir kopi hangat siap untuk Boss Fadli!"`;
                
                // Aktifkan uap mesin kopi
                steamParticles.forEach(s => s.material.opacity = 0.8);
                coffeeCup.material.emissiveIntensity = 0.9;
                updateStatusUI();

                setTimeout(() => {
                    // Simulasi sapaan interaksi dengan robot terdekat (misal Epsilon)
                    if (logBox) logBox.innerText = `Robot @${targetRobot.data.name} berinteraksi & menyapa @epsilon.`;
                    
                    setTimeout(() => {
                        targetRobot.data.status = "Kembali ke Posisi Asal";
                        steamParticles.forEach(s => s.material.opacity = 0);
                        updateStatusUI();

                        moveRobotTo(targetRobot, targetRobot.data.home, () => {
                            targetRobot.data.status = "Standby di Posisi";
                            updateStatusUI();
                        });
                    }, 1500);
                }, 1800);
            });
        } else {
            targetRobot.data.status = "Menjalankan Tugas";
            if (logBox) logBox.innerText = `Robot @${targetRobot.data.name} merespons: "${raw}"`;
            updateStatusUI();
        }
    } else {
        if(lower.includes('matikan lampu')) toggleLights(false);
        else if(lower.includes('hidupkan lampu')) toggleLights(true);
        else if (logBox) logBox.innerText = `Perintah umum: "${raw}"`;
    }

    inputEl.value = '';
    updateStatusUI();
}

window.sendCommand = sendCommand;

// --- ANIMASI LOOP & GERAKAN ANGGOTA TUBUH ---
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (window.controls) window.controls.update();

    robotMeshes.forEach(rm => {
        let currentPos = rm.mesh.position;
        let targetPos = rm.data.target;

        // Jika sedang berjalan, animasikan ayunan tangan dan kaki
        if (currentPos.distanceTo(targetPos) > 0.05) {
            rm.mesh.userData.armL.rotation.x = Math.sin(time * 12) * 0.5;
            rm.mesh.userData.armR.rotation.x = -Math.sin(time * 12) * 0.5;
            rm.mesh.userData.legL.rotation.x = -Math.sin(time * 12) * 0.5;
            rm.mesh.userData.legR.rotation.x = Math.sin(time * 12) * 0.5;
            
            currentPos.lerp(targetPos, 0.04);
        } else {
            // Posisi diam (mengapung halus bernapas)
            rm.mesh.userData.armL.rotation.x = 0;
            rm.mesh.userData.armR.rotation.x = 0;
            rm.mesh.userData.legL.rotation.x = 0;
            rm.mesh.userData.legR.rotation.x = 0;
            rm.mesh.position.y = targetPos.y + Math.sin(time * 4 + rm.mesh.id) * 0.03;
        }
    });

    // Animasi uap kopi mengepul jika aktif
    steamParticles.forEach((s, idx) => {
        if (s.material.opacity > 0) {
            s.position.y += 0.01;
            s.material.opacity -= 0.008;
            if (s.position.y > 2.5) s.position.y = 2.0;
        }
    });

    renderer.render(scene, camera);
}
animate();

// Responsive Window Resize
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
