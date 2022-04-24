const menu = document.querySelector('.toggle');
const navListItems = document.querySelectorAll('.nav-list');
const currentDateTime = new Date();
const currentDate = currentDateTime.toLocaleDateString('en-US');
const displayDate = document.querySelector('.display-date');
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');
const updateBtn = document.querySelector('.update-btn');
const deleteBtns = document.querySelectorAll('.delete-btn');
const noDeleteMessage = document.querySelector('.message');

const funClock = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    const hours = now.getHours();
    const hoursDegrees =((hours / 12) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

updateBtn.addEventListener('click', _ => {
    fetch('/addfloz', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            babyAte: '0',
            timeBabyAte: 'is relative'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
    .then(response => {
        if (response === 'No entry to delete') {
            noDeleteMessage.textContent = 'No entry to delete'
        } else {
            window.location.reload()
        }
    })
})

deleteBtns.forEach(x => x.addEventListener('click', _ => {
    fetch('/addfloz', {
        method: 'delete',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            babyAte: '0'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No entry to delete') {
            noDeleteMessage.textContent = 'No entry to delete'
        } else {
            window.location.reload()
        }
    })
}))

setInterval(funClock, 1000);

displayDate.textContent = currentDate;

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    navListItems.forEach((x) => {
        x.classList.toggle('hidden');
        // x.classList.toggle('nav-transform');
    })
})
