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

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'
    });

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const message = document.createElement('p');
    message.textContent = 'Заказ принят!';
    modal.appendChild(message);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.classList.add('close');
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
});