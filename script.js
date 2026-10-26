async function runWorkflow() {
    const task = document.getElementById('taskInput').value;
    const logOutput = document.getElementById('logOutput');
    const bossStatus = document.querySelector('#boss-agent .status');
    const writerStatus = document.querySelector('#writer-agent .status');

    if (!task) {
        alert("Masukkan perintah terlebih dahulu, Bro!");
        return;
    }

    // Reset & Mulai Simulasi Orchestrator
    logOutput.innerHTML = `[00:01] 👑 Orchestrator menerima tugas: "${task}"\n`;
    bossStatus.className = "status working";
    bossStatus.innerText = "Status: Berpikir & Memecah Tugas";

    await sleep(2000);

    // Langkah 2: Delegasi ke AI Copywriter
    logOutput.innerHTML += `[00:03] 🔄 Orchestrator mendelegasikan sub-tugas ke AI Copywriter...\n`;
    writerStatus.className = "status working";
    writerStatus.innerText = "Status: Sedang Menulis Konten";

    await sleep(3000);

    // Hasil Akhir Simulasi
    logOutput.innerHTML += `[00:06] ✅ AI Copywriter selesai! Tugas berhasil dieksekusi.\n`;
    bossStatus.className = "status idle";
    bossStatus.innerText = "Status: Selesai / Siaga";
    writerStatus.className = "status idle";
    writerStatus.innerText = "Status: Standby";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
