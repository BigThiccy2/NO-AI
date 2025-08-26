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
