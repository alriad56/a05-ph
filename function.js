
const emergencyServices = [
    { name: "National Emergency", nameEn: "Emergency", number: "999", iconSrc: "./assets/emergency.png", category: "All", categoryColor: "bg-red-500" },
    { name: "Police Helpline", nameEn: "Police", number: "999", iconSrc: "/assets/police.png", category: "Police", categoryColor: "bg-blue-500" },
    { name: "Fire Service", nameEn: "Fire", number: "999", iconSrc: "/assets/fire-service.png", category: "Fire", categoryColor: "bg-orange-500" },
    { name: "Ambulance Service", nameEn: "Health", number: "1994-999999", iconSrc: "/assets/ambulance.png", category: "Health", categoryColor: "bg-green-500" },
    { name: "Women & Child Helpline", nameEn: "Help", number: "109", iconSrc: "/assets/brac.png", category: "Help", categoryColor: "bg-pink-500" },
    { name: "Anti-Corruption Helpline", nameEn: "Govt.", number: "106", iconSrc: "/assets/police.png", category: "Govt.", categoryColor: "bg-purple-500" },
    { name: "Electricity Helpline", nameEn: "Electricity", number: "16216", iconSrc: "/assets/emergency.png", category: "Electricity", categoryColor: "bg-yellow-500" },
    { name: "Bangladesh Railway", nameEn: "Travel", number: "163", iconSrc: "/assets/Bangladesh-Railway.png", category: "Travel", categoryColor: "bg-indigo-500" }
];



let heartCount = 0, coinCount = 100, copyCount = 0, callHistory = [];


const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const emergencyCardsEl = document.getElementById('emergencyCards');
const callHistoryEl = document.getElementById('callHistory');
const clearHistoryBtn = document.getElementById('clearHistory');


function init() {
    renderEmergencyCards();
    renderCallHistory();
    clearHistoryBtn.addEventListener('click', clearCallHistory);
}


function renderEmergencyCards() {
    emergencyCardsEl.innerHTML = '';
    emergencyServices.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'card bg-white shadow-lg hover:shadow-xl transition-shadow';

        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body p-6';

       
        const topDiv = document.createElement('div');
        topDiv.className = 'flex justify-between items-start mb-4';

        const serviceInfo = document.createElement('div');
        serviceInfo.className = 'flex items-center';
        
       
        const iconEl = document.createElement('img');
    iconEl.src = service.iconSrc;
    iconEl.alt = service.name;
    iconEl.className = 'w-12 h-12 mr-3'; // size and spacing
    serviceInfo.appendChild(iconEl);

        const nameDiv = document.createElement('div');
        nameDiv.innerHTML = `<h3 class="font-bold text-lg">${service.name}</h3><p class="text-gray-600">${service.nameEn}</p>`;
        serviceInfo.appendChild(nameDiv);

        topDiv.appendChild(serviceInfo);

        const heartBtn = document.createElement('button');
        heartBtn.className = 'heart-btn btn btn-ghost btn-sm';
        heartBtn.dataset.index = index;
        const heartIcon = document.createElement('i');
        heartIcon.className = 'fas fa-heart text-pink-500';
        heartBtn.appendChild(heartIcon);
        topDiv.appendChild(heartBtn);

        cardBody.appendChild(topDiv);

     
        const numberDiv = document.createElement('div');
        numberDiv.className = 'mb-4';
        const numberEl = document.createElement('p');
        numberEl.className = 'text-2xl font-bold text-blue-600';
        numberEl.textContent = service.number;
        const badgeEl = document.createElement('span');
        badgeEl.className = `badge ${service.categoryColor} text-white mt-2`;
        badgeEl.textContent = service.category;
        numberDiv.appendChild(numberEl);
        numberDiv.appendChild(badgeEl);
        cardBody.appendChild(numberDiv);

       
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'card-actions justify-between';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn btn btn-outline btn-sm flex-1 mr-2';
        copyBtn.dataset.index = index;
        copyBtn.innerHTML = `<i class="fas fa-copy mr-1"></i>Copy`;

        const callBtn = document.createElement('button');
        callBtn.className = 'call-btn btn btn-primary btn-sm flex-1';
        callBtn.dataset.index = index;
        callBtn.innerHTML = `<i class="fas fa-phone mr-1"></i>Call`;

        actionsDiv.appendChild(copyBtn);
        actionsDiv.appendChild(callBtn);
        cardBody.appendChild(actionsDiv);

        card.appendChild(cardBody);
        emergencyCardsEl.appendChild(card);

   
        heartBtn.addEventListener('click', handleHeartClick);
        copyBtn.addEventListener('click', () => handleCopyClick(service));
        callBtn.addEventListener('click', () => handleCallClick(service));
    });
}


function handleHeartClick() {
    heartCount++;
    heartCountEl.textContent = heartCount;
}


function handleCopyClick(service) {
    navigator.clipboard.writeText(service.number).then(() => {
        copyCount++;
        copyCountEl.textContent = copyCount;
        alert(`${service.name} number ${service.number} copied to clipboard!`);
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = service.number;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copyCount++;
        copyCountEl.textContent = copyCount;
        alert(`${service.name} number ${service.number} copied to clipboard!`);
    });
}


function handleCallClick(service) {
    if (coinCount < 20) {
        alert('Insufficient coins! You need at least 20 coins to make a call.');
        return;
    }
    coinCount -= 20;
    coinCountEl.textContent = coinCount;
    alert(`Calling ${service.name} at ${service.number}`);
    const currentTime = new Date();
    callHistory.unshift({ name: service.name, number: service.number, time: currentTime.toLocaleTimeString() });
    renderCallHistory();
}


function renderCallHistory() {
    if (callHistory.length === 0) {
        callHistoryEl.innerHTML = '<p class="text-gray-500 text-center">No calls made yet</p>';
        return;
    }
    callHistoryEl.innerHTML = '';
    callHistory.forEach(call => {
        const historyItem = document.createElement('div');
        historyItem.className = 'bg-gray-50 p-3 rounded-lg border';
        historyItem.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-semibold text-sm">${call.name}</p>
                    <p class="text-blue-600 font-medium">${call.number}</p>
                </div>
                <div class="text-xs text-gray-500">${call.time}</div>
            </div>
        `;
        callHistoryEl.appendChild(historyItem);
    });
}


function clearCallHistory() {
    callHistory = [];
    renderCallHistory();
}


document.addEventListener('DOMContentLoaded', init);
