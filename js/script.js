// 1. Функція діалогу з користувачем (змінні, умови, цикли)
function startFanQuiz() {
    let userName = prompt("Вітаємо у Паддоку! Як вас звати?");
    if (!userName) return;

    let races = 0;
    // Цикл: питаємо, поки не введе число 24
    while (races !== 24) {
        let answer = prompt(`Привіт, ${userName}! Скільки Гран-прі заплановано в календарі 2026 року? (Підказка: 24)`);
        if (answer === null) break; // скасування
        races = parseInt(answer);
        
        if (races === 24) {
            alert("Абсолютно точно! Ви справжній знавець календаря Ф1.");
        } else {
            alert("Не зовсім. Спробуйте ще раз!");
        }
    }
}

// 2. Інформація про розробника (параметр "посада" за замовчуванням)
function showDeveloper(surname, name, position = "Студент ФІОТ") {
    alert(`Розробник порталу:\nПрізвище: ${surname}\nІм'я: ${name}\nПосада: ${position}`);
}

// 3. Порівняння двох рядків (виклик на сторінці Пілотів)
function compareDriverNames() {
    let name1 = prompt("Введіть прізвище першого пілота:");
    let name2 = prompt("Введіть прізвище другого пілота:");
    
    if (name1 && name2) {
        if (name1.length > name2.length) {
            alert(`Більший рядок: ${name1}`);
        } else if (name2.length > name1.length) {
            alert(`Більший рядок: ${name2}`);
        } else {
            alert("Прізвища мають однакову довжину.");
        }
    }
}

// 4. BOM: Перенаправлення (виклик на сторінці Календаря)
function buyTickets() {
    // Перенаправлення за допомогою location
    location.assign("https://tickets.formula1.com/");
}

// 5. DOM: Робота з вузлами (Стрічка новин на Головній) - ТРИ ФУНКЦІЇ

// 5.1. Функція додавання (append, prepend, after, createElement, innerHTML)
function addNews() {
    let feed = document.getElementById('live-feed-box');
    if (!feed) {
        alert("Помилка: не знайдено елемент з id='live-feed-box'");
        return;
    }

    // Створення вузлів
    let newItem = document.createElement('div');
    newItem.className = 'feed-item';
    newItem.style.color = "#e10600";
    newItem.style.fontWeight = "bold";
    newItem.style.padding = "5px 0";

    let textNode = document.createTextNode('Шаблон');
    textNode.nodeValue = '🔴 ' + new Date().toLocaleTimeString() + ' - Пілот заїжджає на піт-стоп!'; // nodeValue / data
    
    newItem.append(textNode); // append
    feed.prepend(newItem); // prepend (на початок стрічки)

    // Додаємо або оновлюємо підпис часу під дошкою (after)
    let oldTimestamp = document.getElementById('feed-time');
    if (oldTimestamp) oldTimestamp.remove(); 

    let timestamp = document.createElement('p');
    timestamp.id = 'feed-time';
    timestamp.innerHTML = `<small style="color:gray;">Остання активність: ${new Date().toLocaleTimeString()}</small>`; // innerHTML
    feed.after(timestamp); // after
}

// 5.2. Функція заміни (replaceWith, textContent)
function replaceStatus() {
    let statusSpan = document.getElementById('track-status');
    if (statusSpan) {
        let newStatus = document.createElement('span');
        // Якщо зараз "Траса вільна", міняємо на "Піт-лейн активний", і навпаки
        let currentText = statusSpan.textContent;
        newStatus.textContent = (currentText === "Траса вільна") ? "Піт-лейн активний" : "Траса вільна";
        
        newStatus.style.color = (newStatus.textContent === "Траса вільна") ? "green" : "blue";
        newStatus.id = "track-status"; 
        newStatus.style.fontWeight = "bold";
        
        statusSpan.replaceWith(newStatus); 
    }
}

// 5.3. Функція видалення (querySelectorAll, remove, outerHTML)
function deleteOldestNews() {
    let allItems = document.querySelectorAll('.feed-item'); // Шукаємо всі новини
    
    if (allItems.length > 0) {
        let oldestItem = allItems[allItems.length - 1]; // Беремо останню в списку (найстарішу)
        console.log("Видалено з DOM: " + oldestItem.outerHTML); // outerHTML - виводимо в консоль
        oldestItem.remove(); // remove() видалення зі сторінки
    } else {
        alert("Стрічка новин порожня! Немає що видаляти.");
    }
}