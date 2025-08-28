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

// Add to your main <script> block or home.js

const musicToggleBtn = document.getElementById('music-toggle-btn');
const musicPopup = document.getElementById('music-popup');
const audioPlayer = document.getElementById('audio-player');
const musicPlayBtn = document.getElementById('music-play-btn');
const musicPauseBtn = document.getElementById('music-pause-btn');
const musicPrevBtn = document.getElementById('music-prev-btn');
const musicNextBtn = document.getElementById('music-next-btn');
const musicCover = document.getElementById('music-cover');
const musicTitle = document.getElementById('music-title');
const musicArtist = document.getElementById('music-artist');
const musicProgressBar = document.getElementById('music-progress-bar');
const musicCurrentTime = document.getElementById('music-current-time');
const musicDuration = document.getElementById('music-duration');
const musicVolumeBar = document.getElementById('music-volume-bar');

const songs = [
  {
    src: "https://cdn.pixabay.com/audio/2022/10/16/audio_12b6fae5b6.mp3",
    title: "Dreamscape Drifter",
    artist: "Stardust Beats",
    cover: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=256&q=80"
  },
  {
    src: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b4bfa.mp3",
    title: "Chill Vibes",
    artist: "LoFi Collective",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80"
  },
  {
    src: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5b6.mp3",
    title: "Night City",
    artist: "Neon Runner",
    cover: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&q=80"
  }
];

let currentSong = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.src;
  musicTitle.textContent = song.title;
  musicArtist.textContent = song.artist;
  musicCover.src = song.cover;
  musicProgressBar.value = 0;
  musicCurrentTime.textContent = "0:00";
  musicDuration.textContent = "0:00";
}

function playSong() {
  audioPlayer.play();
  isPlaying = true;
  musicPlayBtn.style.display = "none";
  musicPauseBtn.style.display = "inline-block";
}

function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  musicPlayBtn.style.display = "inline-block";
  musicPauseBtn.style.display = "none";
}

musicToggleBtn.addEventListener('click', () => {
  musicPopup.style.display = musicPopup.style.display === 'none' ? 'flex' : 'none';
});

musicPlayBtn.addEventListener('click', playSong);
musicPauseBtn.addEventListener('click', pauseSong);

musicPrevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  if (isPlaying) playSong();
});

musicNextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  if (isPlaying) playSong();
});

audioPlayer.addEventListener('loadedmetadata', () => {
  musicDuration.textContent = formatTime(audioPlayer.duration);
  musicProgressBar.max = Math.floor(audioPlayer.duration);
});

audioPlayer.addEventListener('timeupdate', () => {
  musicCurrentTime.textContent = formatTime(audioPlayer.currentTime);
  musicProgressBar.value = Math.floor(audioPlayer.currentTime);
});

musicProgressBar.addEventListener('input', () => {
  audioPlayer.currentTime = musicProgressBar.value;
});

musicVolumeBar.addEventListener('input', () => {
  audioPlayer.volume = musicVolumeBar.value;
});

function formatTime(sec) {
  sec = Math.floor(sec);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Hide popup if click outside
document.addEventListener('click', (e) => {
  if (!musicPopup.contains(e.target) && e.target !== musicToggleBtn) {
    musicPopup.style.display = 'none';
    pauseSong();
  }
});

// Prevent closing when clicking inside popup
musicPopup.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Initialize
loadSong(currentSong);
audioPlayer.volume = 1;