const clockContainer = document.querySelector('.clock-container')
const alarmListSection = document.querySelector('.alarm-list-section')
const displayHour = document.querySelector('.hour');
const displayMinute = document.querySelector('.minute');
const displaySecond = document.querySelector('.second');
const displayAmPm = document.querySelector('.am-pm');
const displayMonth = document.querySelector('.month');
const displayDay = document.querySelector('.day');
const displayDate = document.querySelector('.date');
const localTimeToggle = document.querySelector('.local-time-toggle-button');
const themeToggle = document.querySelector('.theme-image');
const body = document.getElementsByTagName('body')[0];
const displayTheme = document.querySelector('.display-theme');
const addAlarm = document.querySelector('.add-img');
const addAlarmDisplay = document.querySelector('.display-add-alarm');
const setAlarm = document.querySelector('.set-alarm');
const setAmPm = document.getElementById('set-am-pm')
const setAlarmButton = document.querySelector('.set-alarm-button');
const cancelAlarmbutton = document.querySelector('.cancel-alarm-button')
const alarmList = document.getElementById('alarm-list');
const deleteButton = document.getElementById('delete');
const alarmRingning = document.getElementById('alarm-ringing');
const circle = document.getElementsByTagName('circle');
const snoozeWave = document.querySelector('.wave');
const snoozeText = document.querySelector('.snooze-text');

alarmRingtone = new Audio("./ringtone/alarm_ringtone.mp3");
let alarmListArr = [];
let localTime = false;


//  local storage

let retrieveAlarm = JSON.parse(localStorage.getItem('LocalStorage'));

if (retrieveAlarm !== null) {
    alarmListArr = [...retrieveAlarm];
    renderList();
}


// time formate

function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    }
    return time;
}


// fetch the month

function getMonth(monthNumber) {
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthsArr[monthNumber];

}


// fetch the day

function getDay(dayNumber) {
    const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    return daysArr[dayNumber];
}

// Update time

function updateTime() {
    const date = new Date();
    const hour = formatTime(date.getHours());
    const minute = formatTime(date.getMinutes());
    const min = date.getMinutes();
    const second = formatTime(date.getSeconds());
    const sec = date.getSeconds();
    const month = getMonth(date.getMonth());
    const day = getDay(date.getDay());
    const currentDate = formatTime(date.getDate());
    const ampm = hour >= 12 ? 'PM' : 'AM';
    let calculatedHour;


    if (hour > 12) {
        console.log("in1");
        calculatedHour = hour - 12;
        // console.log(calculatedHour);
        if (calculatedHour < 10) {
            displayHour.innerHTML = '0' + calculatedHour;
            playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
            // console.log(calculatedHour, minute, second, ampm);
        } else {
            displayHour.innerHTML = calculatedHour;
            playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
            // console.log(calculatedHour, minute, second, ampm);
            // console.log(ampm);

        }
    } else if (hour == 0 && ampm == 'AM') {
        console.log("in2");
        calculatedHour = 12;
        displayHour.innerHTML = calculatedHour;
        playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
        // console.log(calculatedHour, minute, second, ampm);
    } else if (hour == 12 && ampm == 'PM') {
        console.log("in3");
        calculatedHour = 12;
        displayHour.innerHTML = calculatedHour;
        playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
        // console.log(calculatedHour, minute, second, ampm);
    }
    else {
        console.log("in4");
        if (hour < 9) {
            calculatedHour = Number(hour);
            displayHour.innerHTML = "0" + calculatedHour;
            playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
            // console.log(calculatedHour, minute, second, ampm);
        } else {
            calculatedHour = Number(hour);
            displayHour.innerHTML = calculatedHour;
            playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
            // console.log(calculatedHour, minute, second, ampm);
        }
    }
    // display clock
    displayMinute.innerHTML = minute;
    displaySecond.innerHTML = second;
    displayAmPm.innerHTML = ampm;
    displayMonth.innerHTML = month;
    displayDay.innerHTML = day;
    displayDate.innerHTML = currentDate;
}
setInterval(updateTime, 1000);


// play alarm function

function playAlarm(calculatedHour, hour, minute, min, second, sec, ampm) {
    for (let i = 0; i < alarmListArr.length; i++) {
        if ((alarmListArr[i].hourInput == calculatedHour || alarmListArr[i].hourInput == hour) &&
            (alarmListArr[i].minuteInput == minute || alarmListArr[i].minuteInput == min) &&
            (alarmListArr[i].secInput == second || alarmListArr[i].secInput == sec) &&
            alarmListArr[i].ampmInput == ampm) {
            setTimeout(() => {
                alarmRingtone.pause();
                alarmRingning.style.display = 'none';
            }, 300000);
            alarmRingtone.play()
                .catch((error) => {
                    console.log("Brwoser doesn't play audio without user interaction after page load");
                    showWarning("Warning: User interaction is required!");
                });
            alarmRingtone.loop = true;
            alarmRingning.style.display = 'block';
            clockContainer.style.display = "none";
            alarmListSection.style.display = "none";
            snooze.style.display = 'block';
            snoozeText.style.display = 'block';
            pushNotification();
        }
    }
}

// am-pm selector section

var ampmInput = 'AM';
setAmPm.onclick = function () {
    const setAm = document.getElementById('set-am');
    const setPm = document.getElementById('set-pm');
    setAmPm.classList.toggle('unactive');
    if (body.classList.contains('active')) {
        if (setAmPm.classList.contains('unactive')) {
            setPm.style.color = "red";
            setPm.style.fontWeight = "600";
            setAm.style.fontWeight = "500";
            setAm.style.color = 'black';
            ampmInput = "PM";

        } else {
            ampmInput = "AM";
            setAm.style.color = "red";
            setAm.style.fontWeight = "600";
            setPm.style.fontWeight = "500";
            setPm.style.color = "black"
        }
    } else {
        if (setAmPm.classList.contains('unactive')) {
            ampmInput = "PM";
            setPm.style.color = "red";
            setPm.style.fontWeight = "600";
            setAm.style.fontWeight = "500";
            setAm.style.color = 'white';
        } else {
            ampmInput = "AM";
            setAm.style.color = "red";
            setAm.style.fontWeight = "600";
            setPm.style.fontWeight = "500";
            setPm.style.color = "white"
        }
    }
}


// getting data for alarm

var hourInput = document.getElementById('set-hour');
var minuteInput = document.getElementById('set-minute');
var secInput = document.getElementById('set-sec');

setAlarmButton.onclick = function () {
    console.log('set alarm button click');


    if (hourInput.value == "" || minuteInput.value == "" || secInput.value == "") {
        showWarning("Warning: Please Enter All Fields!")
    } else if (hourInput.value > 23 || minuteInput.value > 60 || secInput.value > 60 || hourInput.value < 0 || minuteInput.value < 0 || secInput.value < 0) {
        showWarning("Warning: Please Enter Valid Time!")
    } else {
        showNotification('Sucessfull: Alarm has been Set!');
        alarmTime = {
            hourInput: hourInput.value,
            minuteInput: minuteInput.value,
            secInput: secInput.value,
            ampmInput: ampmInput,
            id: Date.now()
        };

        alarmListArr.push(alarmTime);
        console.log(alarmTime);
        renderList();

        hourInput.value = "";
        minuteInput.value = "";
        secInput.value = "";
    }
}

// alarm list section

function addAlarmList(alarmTime) {
    const li = document.createElement("list");
    li.innerHTML = `
        <div class="alarm-list-container">
            <div class="list">
                <div class = "alarm-info">
                <span class = list-hour-info>
                    ${alarmTime.hourInput}
                </span>
                <span class = "list-colon">:</span>
                <span class = list-minute-info>
                    ${alarmTime.minuteInput}
                </span>
                <span class = "list-colon">:</span>
                <span class = list-second-info>
                    ${alarmTime.secInput}
                </span>
                <span class = list-am-pm-info>
                    ${alarmTime.ampmInput}
                </span>
                </div>
            </div>
            <div class="delete-img" ${alarmTime.id}>
                <img src="https://cdn-icons-png.flaticon.com/512/3299/3299935.png" class="delete" id="delete" data-id="${alarmTime.id}"/>
            </div>
        </div>
        `;
    alarmList.append(li);
}

// stop alarm

const stopAlarm = document.getElementsByTagName('text')[0];

stopAlarm.addEventListener('click', function () {
    console.log('stop alarm button clicked');
    alarmRingtone.pause();
    showNotification("Sucessfull: Alarm has been Stopped!");
    alarmListSection.style.display = "block";
    clockContainer.style.display = "block";
    alarmRingning.style.display = "none";
});


// snooze alarm

const snooze = document.getElementById('snooze');

snooze.addEventListener('click', function () {
    console.log('snooze button clicked');
    alarmRingtone.pause();
    alarmListSection.style.display = "block";
    clockContainer.style.display = "block";
    alarmRingning.style.display = "none";
    showNotification("Sucessfull: Alarm has been Snoozed!");
    var snoozeCounter = 0;
    function snoozeFunction() {
        snoozeCounter++;
        if (snoozeCounter == 2) {
            snooze.style.display = "none";
            snoozeText.style.display = "none";
            clearInterval(id)
        }
        setTimeout(() => {
            alarmRingtone.pause();
            alarmRingning.style.display = "none";
        }, 120000);
        alarmRingtone.play();
        alarmRingning.style.display = "block";
    }
    var id = setInterval(snoozeFunction, 300000);
});

// delete alarm button

function deletebutton(dataid) {
    console.log("Alarm Deleted!");
    let newAlarmList = alarmListArr.filter(function (alarmTime) {
        // console.log(alarmTime.id)
        return alarmTime.id !== Number(dataid);
    });
    alarmListArr = newAlarmList;
    renderList();
    showNotification("Sucessfull: Alarm has been Deleted!");
}

document.addEventListener('click', function (e) {
    // console.log(e.target);
    if (e.target.id == 'delete') {
        let dataid = e.target.dataset.id;
        console.log(dataid);
        deletebutton(dataid);
    }
});


// render alarm list

function renderList() {
    console.log('Item Rendered!');
    localStorage.setItem('LocalStorage', JSON.stringify(alarmListArr));
    alarmList.innerHTML = '';
    for (let element of alarmListArr) {
        addAlarmList(element);
    }
}

// notification

const notification = document.querySelector('.show-notification');
const notificationMsg = document.getElementById('notification-msg');

function showNotification(msg) {
    notification.style.display = "block";
    notification.classList.remove('remove');
    notification.classList.add('active');
    notificationMsg.textContent = msg;
    setTimeout(() => {
        removeNotification();
        notification.style.display = "none";
    }, 2500);
}

function removeNotification() {
    notification.classList.add('remove');
}


// warning

const warning = document.querySelector('.show-warning');
const warningMsg = document.getElementById('warning-msg');

function showWarning(msg) {
    warning.style.display = "block";
    warning.classList.remove('remove');
    warning.classList.add('active');
    warningMsg.textContent = msg;
    setTimeout(() => {
        removeWarning();
        warning.style.display = "none";
    }, 2500);
}

function removeWarning() {
    warning.classList.add('remove');
}


// popup notification section

function pushNotification() {
    console.log('push notification');
    Push.create("Alarm!!!", {
        body: "Your alarm is ringing'?",
        icon: 'https://em-content.zobj.net/source/microsoft-teams/337/alarm-clock_23f0.png',
        timeout: 4000,
        onClick: function () {
            window.focus();
            this.close();
        }
    });
}