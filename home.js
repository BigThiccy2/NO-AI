const fractalBtn = document.getElementById('fractal-secret-btn');
    const mainSection = document.getElementById('main-section');
    const gameSection = document.getElementById('game-section');
    const backBtn = document.getElementById('back-btn');

    fractalBtn.addEventListener('click', () => {
      mainSection.style.display = 'none';
      gameSection.style.display = 'flex';
    });

    backBtn.addEventListener('click', () => {
      gameSection.style.display = 'none';
      mainSection.style.display = 'flex';
    });

const musicToggleBtn = document.getElementById('music-toggle-btn');
const musicPopup = document.getElementById('music-popup');
const musicCloseBtn = document.getElementById('music-close-btn');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const songBtns = document.querySelectorAll('.music-song-btn');

musicToggleBtn.addEventListener('click', () => {
  musicPopup.style.display = musicPopup.style.display === 'none' ? 'block' : 'none';
});

musicCloseBtn.addEventListener('click', () => {
  musicPopup.style.display = 'none';
  audioPlayer.pause();
});

songBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    audioSource.src = btn.getAttribute('data-src');
    audioPlayer.load();
    audioPlayer.play();
  });
});