// Ambil elemen HTML yang dibutuhkan (sama seperti sebelumnya)
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Tambahkan elemen baru untuk pesan hadiah
const messageDiv = document.createElement('div'); // Buat div baru untuk pesan
messageDiv.id = 'message'; // Beri ID
messageDiv.style.marginTop = '20px'; // Tambah sedikit margin atas
messageDiv.style.fontSize = '1.5em';
messageDiv.style.color = '#ffeb3b'; // Warna kuning untuk pesan
messageDiv.style.fontWeight = 'bold';
messageDiv.style.display = 'none'; // Sembunyikan dulu
document.querySelector('.stopwatch-container').appendChild(messageDiv); // Masukkan ke dalam container

// Variabel untuk menyimpan waktu dan status stopwatch (sama seperti sebelumnya)
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Variabel target waktu
const TARGET_TIME_MS = 10 * 1000; // 10 detik dalam milidetik

// Fungsi untuk format waktu (sama seperti sebelumnya)
function formatTime(ms) {
    let minutes = Math.floor(ms / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
}

// Fungsi untuk mengupdate display setiap interval (sama seperti sebelumnya)
function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// --- LOGIKA UTAMA TOMBOL START/PAUSE ---
startPauseBtn.addEventListener('click', () => {
    // Sembunyikan pesan hadiah setiap kali tombol diklik (untuk mulai game baru)
    messageDiv.style.display = 'none';

    if (isRunning) { // Kalau lagi jalan (status true), berarti mau PAUSE
        clearInterval(timerInterval);
        isRunning = false;
        startPauseBtn.textContent = 'Start'; // Ubah teks tombol jadi 'Start'

        // --- FITUR BARU: Cek Waktu Saat Pause ---
        // Range waktu hadiah: 10 detik (10000 ms)
        // Kita beri toleransi kecil, misal 50 milidetik ke atas atau ke bawah dari 10 detik
        const TOLERANCE = 50; // milidetik
        if (elapsedTime >= TARGET_TIME_MS - TOLERANCE && elapsedTime <= TARGET_TIME_MS + TOLERANCE) {
            messageDiv.textContent = 'Selamat! Dapet Hadiah!';
            messageDiv.style.color = '#4CAF50'; // Warna hijau untuk sukses
            messageDiv.style.display = 'block'; // Tampilkan pesan
        } else if (elapsedTime < TARGET_TIME_MS - TOLERANCE) {
            messageDiv.textContent = 'Terlalu cepat!';
            messageDiv.style.color = '#f44336'; // Warna merah untuk gagal
            messageDiv.style.display = 'block';
        } else {
            messageDiv.textContent = 'Terlalu lambat!';
            messageDiv.style.color = '#f44336'; // Warna merah untuk gagal
            messageDiv.style.display = 'block';
        }
        // --- AKHIR FITUR BARU ---

    } else { // Kalau lagi berhenti (status false), berarti mau START
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        startPauseBtn.textContent = 'Pause'; // Ubah teks tombol jadi 'Pause'
    }
});

// Event Listener untuk tombol Reset
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    isRunning = false;
    startPauseBtn.textContent = 'Start'; // Pastikan tombol kembali ke 'Start'
    messageDiv.style.display = 'none'; // Sembunyikan pesan hadiah saat reset
});

// --- FITUR KEYBOARD (SPACEBAR) ---
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.keyCode === 32) {
        event.preventDefault(); // Mencegah browser melakukan default action
        startPauseBtn.click(); // Simulasikan klik tombol start/pause
    }
    if (event.key === 'r' || event.key === 'R') {
        resetBtn.click(); // Simulasikan klik tombol reset
    }
});

// Inisialisasi tampilan awal
display.textContent = formatTime(elapsedTime);