document.addEventListener('DOMContentLoaded', function () {
    // Kirish formasi
    document.querySelector('.sign-in-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const phone = document.getElementById('phone').value;
        const password = document.querySelector('.sign-in-form input[type="password"]').value;

        fetch('http://10.100.0.24/api/v1/public/profile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number: phone,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Kirish muvaffaqiyatli:', data);
                // Kirish muvaffaqiyatli bo'lsa, boshqa sahifaga yo'naltirish
                window.location.href = 'dashboard.html';
            } else {
                alert('Kirishda xato: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Xatolik:', error);
        });
    });

    // Ro'yxatdan o'tish formasi
    document.querySelector('.sign-up-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const phone = document.getElementById('reg-phone').value;
        const password = document.querySelector('.sign-up-form input[type="password"]').value;

        fetch('http://10.100.0.24/api/v1/public/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number: phone,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // API javobini ko'rsatadi
            if (data.success) {
                console.log('Ro\'yxatdan otish muvaffaqiyatli:', data);
                alert('Ro\'yxatdan otdingiz, endi kirishingiz mumkin.');
            } else {
                alert('Ro\'yxatdan otishda xato: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Xatolik:', error);
        });
    });
});
