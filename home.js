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

    // ...existing code...

const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authMessage = document.getElementById('auth-message');

// Show auth section on load, hide main content until logged in
function showAuth() {
  authSection.style.display = 'flex';
  mainSection.style.display = 'none';
  gameSection.style.display = 'none';
  settingsSection.style.display = 'none';
}
function showMain() {
  authSection.style.display = 'none';
  mainSection.style.display = 'flex';
}

// Check for session on load
fetch('/api/session')
  .then(res => res.json())
  .then(data => {
    if (data.loggedIn) showMain();
    else showAuth();
  });

// Login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: loginForm.login-username.value,
      password: loginForm.login-password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) showMain();
    else authMessage.textContent = data.message || 'Login failed';
  });
});

// Register
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  fetch('/api/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: registerForm['register-username'].value,
      password: registerForm['register-password'].value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      authMessage.textContent = 'Registration successful! Please log in.';
    } else {
      authMessage.textContent = data.message || 'Registration failed';
    }
  });
});