const token = localStorage.getItem('token');
const errorElement = document.getElementById('admin-error');

async function loadAdminData() {
    errorElement.textContent = '';
    try {
        const response = await fetch('/api/admin/summary', {
            headers: { Authorization: 'Bearer ' + token }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Accès refusé');
        document.getElementById('users-count').textContent = data.users;
        document.getElementById('pending-count').textContent = data.pendingPayments;
        renderPayments(data.payments);
        renderLeaderboard(data.leaderboard);
    } catch (error) {
        errorElement.textContent = error.message;
    }
}

function renderPayments(payments) {
    const body = document.getElementById('payments-body');
    body.innerHTML = payments.length ? payments.map(payment => `
        <tr>
            <td>${payment.email}</td>
            <td>${payment.tier}</td>
            <td>${payment.montant} HTG</td>
            <td><a class="proof-link" href="#" data-proof="${payment._id}">Voir</a></td>
            <td>${payment.status}</td>
            <td>${payment.status === 'pending' ? `<button class="action-btn approve" data-action="approved" data-id="${payment._id}">Approuver</button><button class="action-btn reject" data-action="rejected" data-id="${payment._id}">Refuser</button>` : '-'}</td>
        </tr>
    `).join('') : '<tr><td colspan="6">Aucune demande.</td></tr>';
    body.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => updatePayment(button.dataset.id, button.dataset.action)));
    body.querySelectorAll('[data-proof]').forEach(link => link.addEventListener('click', event => {
        event.preventDefault();
        viewProof(link.dataset.proof);
    }));
}

function renderLeaderboard(users) {
    document.getElementById('leaderboard-body').innerHTML = users.map((user, index) => `
        <tr><td>${index + 1}</td><td>${user.name}</td><td>${user.email}</td><td>${user.weeklyLeague?.xp || 0}</td><td>${user.weeklyLeague?.league || 'Bronze'}</td></tr>
    `).join('');
}

async function updatePayment(id, status) {
    const response = await fetch('/api/admin/payments/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ status })
    });
    if (!response.ok) {
        const data = await response.json();
        errorElement.textContent = data.message;
        return;
    }
    loadAdminData();
}

async function viewProof(id) {
    const response = await fetch('/api/admin/payments/' + id + '/screenshot', {
        headers: { Authorization: 'Bearer ' + token }
    });
    const data = await response.json();
    if (!response.ok) {
        errorElement.textContent = data.message;
        return;
    }
    const windowRef = window.open('', '_blank');
    if (data.type === 'application/pdf') {
        windowRef.location.href = data.data;
    } else {
        windowRef.document.write(`<img src="${data.data}" style="max-width:100%">`);
    }
}

document.getElementById('refresh-btn').addEventListener('click', loadAdminData);
loadAdminData();
