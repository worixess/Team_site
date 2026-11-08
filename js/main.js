/* Клуб «Долголетие» — небольшие улучшения удобства */

document.addEventListener('DOMContentLoaded', function () {

    /* 1. Кнопка «А+» — увеличение шрифта на всём сайте.
          Выбор запоминается, чтобы не нажимать на каждой странице. */
    var btn = document.querySelector('.text-size-btn');

    function applySize(big) {
        document.body.classList.toggle('big-text', big);
        if (btn) {
            btn.setAttribute('aria-pressed', big ? 'true' : 'false');
            btn.textContent = big ? 'А− Обычный шрифт' : 'А+ Крупный шрифт';
        }
    }

    var saved = false;
    try { saved = localStorage.getItem('bigText') === '1'; } catch (e) {}
    applySize(saved);

    if (btn) {
        btn.addEventListener('click', function () {
            var big = !document.body.classList.contains('big-text');
            applySize(big);
            try { localStorage.setItem('bigText', big ? '1' : '0'); } catch (e) {}
        });
    }

    /* 2. Подсветка текущей страницы в меню */
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul a').forEach(function (link) {
        if (link.getAttribute('href') === here) {
            link.setAttribute('aria-current', 'page');
        }
    });

    /* 3. Форма записи: простая проверка и понятное сообщение */
    var form = document.querySelector('form[data-signup]');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var note = document.querySelector('.form-note');
            var name = form.querySelector('#name');
            var phone = form.querySelector('#phone');

            if (!name.value.trim() || !phone.value.trim()) {
                if (note) {
                    note.hidden = false;
                    note.textContent = 'Пожалуйста, заполните имя и телефон — остальное не обязательно.';
                }
                (name.value.trim() ? phone : name).focus();
                return;
            }

            if (note) {
                note.hidden = false;
                note.textContent = 'Спасибо, ' + name.value.trim() +
                    '! Заявка принята. Мы позвоним вам в течение дня.';
                note.scrollIntoView({ block: 'center' });
            }
            form.reset();
        });
    }
});
