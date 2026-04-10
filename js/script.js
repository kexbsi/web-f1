// ==========================================
// БАЗОВІ ФУНКЦІЇ ПОРТАЛУ
// ==========================================

function startFanQuiz() {
    let userName = prompt("Вітаємо у Паддоку! Як вас звати?");
    if (!userName) return;

    let races = 0;
    while (races !== 24) {
        let answer = prompt(`Привіт, ${userName}! Скільки Гран-прі заплановано в календарі 2026 року? (Підказка: 24)`);
        if (answer === null) break; 
        races = parseInt(answer);
        
        if (races === 24) {
            alert("Абсолютно точно! Ви справжній знавець календаря Ф1.");
        } else {
            alert("Не зовсім. Спробуйте ще раз!");
        }
    }
}

function showDeveloper(surname, name, position = "Студент ФІОТ") {
    alert(`Розробник порталу:\nПрізвище: ${surname}\nІм'я: ${name}\nПосада: ${position}`);
}

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

function buyTickets() {
    location.assign("https://tickets.formula1.com/");
}

function addNews() {
    let feed = document.getElementById('live-feed-box');
    if (!feed) {
        alert("Помилка: не знайдено елемент з id='live-feed-box'");
        return;
    }

    let newItem = document.createElement('div');
    newItem.className = 'feed-item';
    newItem.style.color = "#e10600";
    newItem.style.fontWeight = "bold";
    newItem.style.padding = "5px 0";

    let textNode = document.createTextNode('Шаблон');
    textNode.nodeValue = '🔴 ' + new Date().toLocaleTimeString() + ' - Пілот заїжджає на піт-стоп!'; 
    
    newItem.append(textNode); 
    feed.prepend(newItem); 

    let oldTimestamp = document.getElementById('feed-time');
    if (oldTimestamp) oldTimestamp.remove(); 

    let timestamp = document.createElement('p');
    timestamp.id = 'feed-time';
    timestamp.innerHTML = `<small style="color:gray;">Остання активність: ${new Date().toLocaleTimeString()}</small>`; 
    feed.after(timestamp); 
}

function replaceStatus() {
    let statusSpan = document.getElementById('track-status');
    if (statusSpan) {
        let newStatus = document.createElement('span');
        let currentText = statusSpan.textContent;
        newStatus.textContent = (currentText === "Траса вільна") ? "Піт-лейн активний" : "Траса вільна";
        
        newStatus.style.color = (newStatus.textContent === "Траса вільна") ? "green" : "blue";
        newStatus.id = "track-status"; 
        newStatus.style.fontWeight = "bold";
        
        statusSpan.replaceWith(newStatus); 
    }
}

function deleteOldestNews() {
    let allItems = document.querySelectorAll('.feed-item'); 
    
    if (allItems.length > 0) {
        let oldestItem = allItems[allItems.length - 1]; 
        console.log("Видалено з DOM: " + oldestItem.outerHTML); 
        oldestItem.remove(); 
    } else {
        alert("Стрічка новин порожня! Немає що видаляти.");
    }
}

//Lab7

const trackManager = {
    handleEvent(event) {
        console.log(`Система: Подія ${event.type} на кнопці збереження`);
        
        switch(event.type) {
            case 'mousedown':
                event.currentTarget.style.transform = 'scale(0.95)';
                event.currentTarget.innerText = "⏳ Обробка запиту...";
                break;
            case 'mouseup':
                event.currentTarget.style.transform = 'scale(1)';
                
                let selectedTeam = document.querySelector('.selected-item');
                
                if (selectedTeam) {
                    alert(`Вибір підтверджено! Ваша улюблена команда: ${selectedTeam.innerText}. Дані збережено!`);
                    
                    event.currentTarget.removeEventListener('mousedown', this);
                    event.currentTarget.removeEventListener('mouseup', this);
                    
                    event.currentTarget.style.opacity = '0.5';
                    event.currentTarget.style.cursor = 'not-allowed';
                    event.currentTarget.style.background = '#222';
                    event.currentTarget.innerText = "✔️ Вибір збережено";
                    
                    document.querySelector('.highlight-list').style.pointerEvents = 'none';
                    document.querySelector('.highlight-list').style.opacity = '0.7';
                } else {
                    alert("Спочатку оберіть команду зі списку вище!");
                    event.currentTarget.innerText = "💾 Зберегти мій вибір";
                }
                break;
        }
    }
};

function setupInitialEvents() {
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        mainTitle.onmouseover = () => mainTitle.style.color = '#e10600';
        mainTitle.onmouseout = () => mainTitle.style.color = '';
    }

    const saveBtn = document.getElementById('test-event-btn');
    if (saveBtn) {
        saveBtn.addEventListener('mousedown', trackManager);
        saveBtn.addEventListener('mouseup', trackManager);
    }

    const devBtn = document.getElementById('dev-btn');
    if (devBtn) {
        devBtn.addEventListener('click', function() {
            console.log("Обробник 1: Зафіксовано клік по кнопці розробника.");
        });
        devBtn.addEventListener('click', function() {
            console.log("Обробник 2: Відправка логів до бази даних...");
        });
    }
}

window.addEventListener('DOMContentLoaded', setupInitialEvents);

document.addEventListener('click', function(event) {
    let li = event.target.closest('.highlight-list li');
    if (!li) return; 
    
    li.parentElement.querySelectorAll('li').forEach(el => {
        el.classList.remove('selected-item');
        el.style.backgroundColor = 'white';
        el.style.color = 'black';
    });

    li.classList.add('selected-item');
    li.style.backgroundColor = '#e10600';
    li.style.color = 'white';
});

class MenuActions {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    camera() { alert('Перемикання трансляції на Onboard-камеру...'); }
    timing() { alert('Відкриття таблиці по-секторного часу та відривів...'); }
    radio() { alert('Підключення до радіоканалу гоночного інженера...'); }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuElem = document.getElementById('race-menu');
    if (menuElem) new MenuActions(menuElem);
});