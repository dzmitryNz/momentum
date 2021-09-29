// import getHomeDatas from './homeDatas.js';
// import setChart from './chart2';
import { getQuote } from './getQuote.js';
import getHashrates from './getHashrates.js';
import { ru, en } from './dict.js';

const time = document.querySelector('.time'),
    next = document.querySelector('.next'),
    preference = document.querySelector('.preference'),
    btn = document.querySelector('.btn'),
    imgbtn = document.querySelector('.image-changer'),
    body = document.querySelector('body'),
    img = document.createElement('img'),
    greeting = document.querySelector('.greeting'),
    dateLine = document.querySelector('.date'),
    name = document.querySelector('.name'),
    prev = document.querySelector('.prev'),
    focus = document.querySelector('.focus'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    humidity = document.querySelector('.humidity'),
    wind = document.querySelector('.wind'),
    city = document.querySelector('.city'),
    url = './assets/images/';
    
    let bckgrndArr = [],
        language = en,
        defName = language.name,
        defFocus = language.focus,
        defCity = language.city,
        styleNew = 'color: lightgray; text-shadow: black 1px 1px 0, black -1px -1px 0, black -1px 1px 0, black 1px -1px 0',
        carusel = 0;

    function bckgrGrUpd() {
        let m = ['night/', 'morning/', 'day/', 'evening/'],
        verify = [],    
        arr = [];

        for (let x = 0; x < m.length; x++) {
            for (let n = 0; n < 6; n++) {
                let num = Math.floor(Math.random() * 10) + 1;
                if (arr.indexOf(num, 0) !== -1) { n = n - 1; continue }
                verify.push(num);
                arr.push(m[x] + num + '.jpg');
            }
        }
        return arr
    }
    
function bgrChng() {
    let tdy = new Date(),
        hours = tdy.getHours(),
        carusel = hours;

    if (bckgrndArr.length < 1) { bckgrndArr = bckgrGrUpd() }
    let src = url + bckgrndArr[hours];
    img.src = src;

    if (hours <= 23) { greeting.textContent = 'Good evening, '}
    if (hours < 18) { greeting.textContent = 'Good day, '} 
    if (hours < 12) { greeting.textContent = 'Good morning, '} 
    if (hours < 6) { greeting.textContent = 'Good night, '}
    img.onload = () => { body.style.backgroundImage = `url(${src})`};
}

function showTime() {
    let tdy = new Date(),
        hour = tdy.getHours(),
        minutes = tdy.getMinutes(),
        seconds = (localStorage.getItem('seconds') === 'true' ? '<span>:</span>' + tdy.getSeconds() : '');

    time.innerHTML = `${addZero(hour)}<span class="seconds">:</span>${addZero(minutes)}${addZero(seconds)}`;
    if (minutes === 0 && tdy.getSeconds() === 0) {showDate(); bgrChng(); }
    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function showDate() {
    const daysEn = language.weekdays;
    const monthsEn = language.months;
    let tdy = new Date(),
        day = daysEn[tdy.getDay()],
        date = tdy.getDate(),
        month = monthsEn[tdy.getMonth()],
        year = (localStorage.getItem('year') === 'true' ? tdy.getFullYear() : '');

    dateLine.innerHTML = `${day}<span> - </span>${date}<span> </span>${month}<span> </span>${year}`;
}

function getImageNext() {
    if (carusel < bckgrndArr.length - 1) { carusel++ } else { carusel = 0 }
    let src = url + bckgrndArr[carusel];
    // console.log(carusel)
    img.src = src;
    img.onload = () => { body.style.backgroundImage = `url(${src})`; };
}

function getImagePrev() {
    if (carusel > 0) { carusel-- } else { carusel = 23 }
    console.log(carusel)
    let src = url + bckgrndArr[carusel];
    img.src = src;
    img.onload = () => { body.style.backgroundImage = `url(${src})`; };
}

function setName(e) {
    if (e.type === 'click') { name.textContent = '' }
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
            getName();
        }
    } else { localStorage.setItem('name', e.target.innerText); }
    if (e.type === 'blur') {
        if (name.textContent !== '') {
            name.textContent = localStorage.getItem('name')
        } else {
            name.textContent = defName;
            localStorage.setItem('name', defName)
        }
    }
}

function setFocus(e) {
    if (e.type === 'click') { focus.textContent = '' }
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
            getFocus();
        }
    } else { localStorage.setItem('focus', e.target.innerText); }
    if (e.type === 'blur') {
        if (focus.textContent !== '') {
            focus.textContent = localStorage.getItem('focus')
        } else {
            focus.textContent = defFocus;
            localStorage.setItem('focus', defFocus)
        }
    }
}

function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
        name.textContent = defName;
    } else {
        name.textContent = localStorage.getItem('name')
        if (name.textContent !== null && name.textContent !== '') { defName = localStorage.getItem('name') }
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
        focus.textContent = defFocus;
    } else {
        focus.textContent = localStorage.getItem('focus');
        if (focus.textContent !== null && focus.textContent !== '') { defFocus = localStorage.getItem('focus') };
    }
}

function getCity() {
    if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
        city.textContent = defCity;
    } else {
        city.textContent = localStorage.getItem('city');
        if (city.textContent !== null && city.textContent !== '') { defCity = localStorage.getItem('city') };
    }
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${defCity}&lang=en&appid=351bef36095247499eb96265dfb607d2&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) {
        alert(`Ошибка ${data.cod} \n ${data.message}!`);
        weatherIcon.textContent = '';
        temperature.textContent = 'No Data';
        weatherDescription.textContent = '';
        humidity.textContent = 'No Data';
        wind.textContent = '';
        console.log(data)
        return
    }
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${language.humidity}: ${data.main.humidity}%`;
    wind.textContent = `${language.wind}: ${data.wind.speed}m/s`;

    setTimeout(getWeather, 6000000);
}

function setCity(e) {
    if (e.type === 'click') { city.textContent = '' }
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', e.target.innerText);
            city.blur();
            getCity();
            getWeather();
        }
    } else { localStorage.setItem('city', e.target.innerText); }
    if (e.type === 'blur') {
        if (city.textContent !== '') {
            city.textContent = localStorage.getItem('city')
        } else {
            city.textContent = defCity;
            localStorage.setItem('city', defCity)
        }
    }
}

// setChart(getHomeDatas(), "Confirmed");

btn.addEventListener('click', getQuote);

prev.addEventListener('click', getImagePrev);
next.addEventListener('click', getImageNext);

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

city.addEventListener('click', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

// imgbtn.addEventListener('click', getImageNext);

bgrChng();
showTime();
showDate();
getName();
getFocus();
getCity();
getWeather();
getHashrates();
getQuote();
// document.addEventListener('DOMContentLoaded', getQuote);
