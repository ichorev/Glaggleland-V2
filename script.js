class ThemePark {
    constructor() {
        this.money = 10000;  // Starting money
        this.attractions = [];
        this.ticketPrice = 50;  // Default ticket price
        this.visitors = 0;
        this.happiness = 100;  // Starts at 100%
        this.day = 1;
    }

    addAttraction(name, cost, income, maintenance) {
        if (this.money >= cost) {
            this.attractions.push({ name, cost, income, maintenance });
            this.money -= cost;
            alert(`Added ${name} attraction.`);
        } else {
            alert("Not enough money to add this attraction.");
        }
    }

    setTicketPrice(price) {
        this.ticketPrice = price;
        alert(`Ticket price set to ${this.ticketPrice}`);
    }

    calculateVisitors() {
        this.visitors = Math.floor(1000 / (this.ticketPrice / 10));  // Simplified visitor calculation
        this.happiness = Math.max(0, 100 - (this.ticketPrice - 50) * 2);
    }

    calculateIncome() {
        let income = this.visitors * this.ticketPrice;
        this.attractions.forEach(attraction => {
            income += this.visitors * attraction.income;
        });
        return income;
    }

    calculateExpenses() {
        let expenses = 0;
        this.attractions.forEach(attraction => {
            expenses += attraction.maintenance;
        });
        return expenses;
    }

    runDay() {
        this.calculateVisitors();
        let income = this.calculateIncome();
        let expenses = this.calculateExpenses();
        this.money += income - expenses;
        this.day++;
        alert(`Day ${this.day - 1} Summary: Visitors: ${this.visitors}, Income: ${income}, Expenses: ${expenses}, Money: ${this.money.toFixed(2)}, Happiness: ${this.happiness}%`);
        this.generateVisitors();
    }

    showStatus() {
        let status = `
            <strong>Day:</strong> ${this.day}<br>
            <strong>Money:</strong> $${this.money.toFixed(2)}<br>
            <strong>Attractions:</strong> ${this.attractions.map(a => `${a.name} ($${a.cost}, $${a.income}/visitor, $${a.maintenance}/day)`).join('<br>')}<br>
            <strong>Ticket Price:</strong> $${this.ticketPrice}<br>
            <strong>Visitors:</strong> ${this.visitors}<br>
            <strong>Happiness:</strong> ${this.happiness}%<br>
        `;
        document.getElementById('gameStatus').innerHTML = status;
    }

    generateVisitors() {
        const themePark = document.getElementById('themePark');
        themePark.innerHTML = '';  // Clear existing visitors

        for (let i = 0; i < this.visitors; i++) {
            const person = document.createElement('div');
            person.className = 'person';
            person.style.top = `${Math.random() * 280}px`;
            person.style.left = `${Math.random() * 280}px`;
            themePark.appendChild(person);

            setInterval(() => {
                this.movePerson(person);
            }, 500);
        }
    }

    movePerson(person) {
        const direction = Math.floor(Math.random() * 4);
        const currentTop = parseInt(person.style.top);
        const currentLeft = parseInt(person.style.left);

        switch (direction) {
            case 0:
                person.style.top = Math.max(0, currentTop - 10) + 'px';
                break;
            case 1:
                person.style.top = Math.min(280, currentTop + 10) + 'px';
                break;
            case 2:
                person.style.left = Math.max(0, currentLeft - 10) + 'px';
                break;
            case 3:
                person.style.left = Math.min(280, currentLeft + 10) + 'px';
                break;
        }
    }
}

const park = new ThemePark();

function showAddAttractionModal() {
    document.getElementById('addAttractionModal').style.display = 'block';
}

function showSetTicketPriceModal() {
    document.getElementById('setTicketPriceModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function addAttraction() {
    const form = document.getElementById('addAttractionForm');
    const name = form.attractionName.value;
    const cost = parseInt(form.attractionCost.value);
    const income = parseInt(form.attractionIncome.value);
    const maintenance = parseInt(form.attractionMaintenance.value);
    park.addAttraction(name, cost, income, maintenance);
    closeModal('addAttractionModal');
    form.reset();
}

function setTicketPrice() {
    const form = document.getElementById('setTicketPriceForm');
    const price = parseInt(form.ticketPrice.value);
    park.setTicketPrice(price);
    closeModal('setTicketPriceModal');
    form.reset();
}

function runDay() {
    park.runDay();
}

function showStatus() {
    park.showStatus();
}
