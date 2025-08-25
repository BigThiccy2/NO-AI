const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const app = express();

const USERS_FILE = path.join(__dirname, 'users.json');

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Helper: load users
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return {};
  return JSON.parse(fs.readFileSync(USERS_FILE));
}
// Helper: save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.json({ success: false, message: 'Missing fields' });
  const users = loadUsers();
  if (users[username]) return res.json({ success: false, message: 'User exists' });
  users[username] = { password, apps: [] };
  saveUsers(users);
  res.json({ success: true });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  if (!users[username] || users[username].password !== password) {
    return res.json({ success: false, message: 'Invalid credentials' });
  }
  req.session.user = username;
  res.json({ success: true });
});

// Session check
app.get('/api/session', (req, res) => {
  res.json({ loggedIn: !!req.session.user, user: req.session.user });
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// Serve static files
app.use(express.static(__dirname));

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));