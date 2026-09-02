const token = localStorage.getItem('token');
const userName = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');
const adminLink = document.getElementById('admin-link');

if (!token) {
    window.location.href = 'connexion.html';
} else {
    fetch('/api/me', { headers: { Authorization: 'Bearer ' + token } })
        .then(response => {
            if (!response.ok) throw new Error('Session expirée');
            return response.json();
        })
        .then(user => {
            userName.textContent = user.name || 'élève';
            if (user.isAdmin) adminLink.hidden = false;
        })
        .catch(() => {
            localStorage.removeItem('token');
            window.location.href = 'connexion.html';
        });
}

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
});
