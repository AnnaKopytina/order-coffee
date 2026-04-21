let beverageCount = 1;

const firstBeverage = document.querySelector('.beverage');
addRemoveButton(firstBeverage);
refreshNumbers();

document.querySelector('.add-button').addEventListener('click', () => {
    const beverages = document.querySelectorAll('.beverage');
    const lastBeverage = beverages[beverages.length - 1];
    const newBeverage = lastBeverage.cloneNode(true);

    beverageCount++;

    const radioButtons = newBeverage.querySelectorAll('input[type="radio"]');
    for (const radio of radioButtons) {
        radio.name = `milk-${beverageCount}`;
    }

    const inputs = newBeverage.querySelectorAll('input[type="checkbox"]');
    for (const input of inputs) {
        input.checked = false;
    }

    const selects = newBeverage.querySelectorAll('select');
    for (const select of selects) {
        select.selectedIndex = 1;
    }

    const removeBtn = newBeverage.querySelector('.remove-beverage');
    removeBtn.addEventListener('click', () => {
        newBeverage.remove();
        refreshNumbers();
    });

    lastBeverage.after(newBeverage);
    refreshNumbers();
});

function addRemoveButton(container) {
    container.style.position = 'relative';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('remove-beverage');
    removeBtn.textContent = '✕';

    Object.assign(removeBtn.style, {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        color: '#999'
    });

    removeBtn.addEventListener('click', () => {
        container.remove();
        refreshNumbers();
    });

    container.appendChild(removeBtn);
}

function refreshNumbers() {
    const beverages = document.querySelectorAll('.beverage');
    const isOnlyOne = beverages.length === 1;
    let i = 1;

    for (const bev of beverages) {
        const title = bev.querySelector('.beverage-count');
        title.textContent = `Напиток №${i}`;

        const btn = bev.querySelector('.remove-beverage');
        if (btn) {
            btn.style.display = isOnlyOne ? 'none' : 'block';
        }

        const radios = bev.querySelectorAll('input[type="radio"]');
        for (const r of radios) {
            r.name = `milk-${i}`;
        }
        i++;
    }
    beverageCount = beverages.length;
}

function getBeverageWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'напитков';
    if (lastDigit === 1) return 'напиток';
    if (lastDigit >= 2 && lastDigit <= 4) return 'напитка';
    return 'напитков';
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.classList.add('close');
    closeBtn.onclick = () => overlay.remove();

    const statusMessage = document.createElement('p');
    statusMessage.textContent = 'Заказ принят!';
    statusMessage.style.fontWeight = 'bold';

    const countMessage = document.createElement('p');
    const word = getBeverageWord(beverageCount);
    countMessage.textContent = `Вы заказали ${beverageCount} ${word}`;

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.marginTop = '20px';
    table.style.borderCollapse = 'collapse';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    ['Напиток', 'Молоко', 'Дополнительно'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        th.style.border = '1px solid #ddd';
        th.style.padding = '8px';
        th.style.backgroundColor = '#f9f9f9';
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const beverages = document.querySelectorAll('.beverage');

    beverages.forEach(bev => {
        const row = document.createElement('tr');

        const drinkCell = document.createElement('td');
        const select = bev.querySelector('select');
        drinkCell.textContent = select.options[select.selectedIndex].textContent;

        const milkCell = document.createElement('td');
        const checkedMilk = bev.querySelector('input[type="radio"]:checked');
        milkCell.textContent = checkedMilk.parentElement.querySelector('span').textContent;

        const extrasCell = document.createElement('td');
        const checkedExtras = Array.from(bev.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.parentElement.querySelector('span').textContent);
        extrasCell.textContent = checkedExtras.join(', ') || 'нет';

        [drinkCell, milkCell, extrasCell].forEach(cell => {
            cell.style.border = '1px solid #ddd';
            cell.style.padding = '8px';
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    modal.appendChild(closeBtn);
    modal.appendChild(statusMessage);
    modal.appendChild(countMessage);
    modal.appendChild(table);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
});