import { Tabla as TableHours } from "./HourTable.js";
import { Task } from "./Task.js";

import { LUNES as FIRST_WEEK_DAY } from "./HourTable.js";

const daysWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const tasks = [];

const parseHourToDecimal = (inputTimeValue) => {
    const [hours, minutes] = inputTimeValue.split(':').map(Number);
    return (hours * 60 + minutes) / 60;
}

const restartHourContainer = () => {
    document.querySelector(".hours").innerHTML = `
        <label class="hours-0">Horario</label>
        <input class="hour-in hours-0" type="time">
        <input class="hour-out hours-0" type="time">
        <select class="week-day hours-0">
            <option>Lunes</option>
            <option>Martes</option>
            <option>Miércoles</option>
            <option>Jueves</option>
            <option>Viernes</option>
            <option>Sábado</option>
            <option>Domingo</option>
        </select>
        <div class="hours-0"><button id="add-hour">+</button></div>
    `;
    document.getElementById("add-hour").addEventListener("click", addHour);
}

window.onload = () => {

    restartHourContainer();

    const tableDiv = document.getElementById("table");
    const references = document.getElementById("references");

    const createButton = document.getElementById("submit");
    createButton.addEventListener("click", () => {
        const taskName = document.getElementById("nombre-task")
        const taskColor = document.getElementById("color-task")
        const taskDescription = document.getElementById("description-task") != null ? document.getElementById("description-task") : document.getElementById("nombre-task") 
        const inputHourIn = document.querySelectorAll(".hour-in")
        const inputHourOut = document.querySelectorAll(".hour-out")
        const inputDayWeek = document.querySelectorAll(".week-day")
        const task = new Task(taskName.value, taskColor.value, taskDescription.value);
        inputHourIn.forEach((_, i) => {
            console.log(inputHourIn[i].value)
            console.log(inputHourOut[i].value)
            const hIn = parseHourToDecimal(inputHourIn[i].value);
            const hOut = parseHourToDecimal(inputHourOut[i].value);
            const wDay = (daysWeek.indexOf(inputDayWeek[i].value) + FIRST_WEEK_DAY);
            if (!isNaN(hIn) && !isNaN(hOut) && taskName.value.length > 0 && taskDescription.value.length > 0) 
                task.push(wDay, hIn, hOut);
        });
        if (task.length() > 0) {
            document.querySelector(".warning").classList.toggle("hide", true);
            tasks.push(task);
            showTable(tableDiv, references, tasks);
            restartHourContainer();
            taskName.value = "";
            taskDescription.value = "";
        } else document.querySelector(".warning").classList.remove("hide");
    });

    showTable(tableDiv, references, tasks);
}

const deleteHour = id => {
    const hours = document.querySelectorAll(`.hours-${id}`)
    hours.forEach(hour => { hour.outerHTML = "" } );
}

const addHour = () => {
    const hoursAmount = document.querySelectorAll(".week-day").length;
    const container = document.querySelector(".hours")
    const fragment = document.createDocumentFragment();
    const inHour = document.createElement("INPUT");
    const outHour = document.createElement("INPUT");
    const dayWeek = document.createElement("SELECT");
    const div = document.createElement("DIV");
    div.className = `hours-${hoursAmount}`
    inHour.className = `hour-in hours-${hoursAmount}`
    inHour.type = "time"
    outHour.className = `hour-out hours-${hoursAmount}`
    outHour.type = "time"
    dayWeek.className = `week-day hours-${hoursAmount}`
    for (let i = 0; i < daysWeek.length; i++) {
        const option = document.createElement('option');
        option.value = daysWeek[i];
        option.textContent = daysWeek[i];
        dayWeek.appendChild(option);
    }
    const bDeleteContainer = document.createElement("DIV");
    bDeleteContainer.className = `hours-${hoursAmount}`
    const bDelete = document.createElement("BUTTON");
    bDelete.id = "add-hour";
    bDelete.textContent = "-"
    bDelete.addEventListener("click", () => deleteHour(hoursAmount));
    bDeleteContainer.appendChild(bDelete);
    fragment.appendChild(div);
    fragment.appendChild(inHour);
    fragment.appendChild(outHour);
    fragment.appendChild(dayWeek);
    fragment.appendChild(bDeleteContainer);
    container.appendChild(fragment);
}

const showTable = (tableDiv, referencesDiv, tasks) => {
    let maxDay = 5;
    let minDay = 0;
    let minHour = 8;
    let maxHour = 20;
    tasks.forEach(task => {
        if (task.firstWeekDay() < minDay) minDay = task.firstWeekDay();
        if (task.lastWeekDay() > maxDay) maxDay = task.lastWeekDay();
        if (task.firstHour() < minHour) minHour = task.firstHour();
        if (task.lastHour() > maxHour) maxHour = task.lastHour();
    });

    /*console.log("Min day: " + maxDay + " | Max day: " + minDay);
    console.log("Min hour: " + maxHour + " | Max hour: " + minHour);
    console.log(tasks);*/

    const table = new TableHours(minHour, maxHour, minDay, maxDay);
    table.destroy(tableDiv, referencesDiv);
    table.show(tableDiv);

    tasks.forEach(task => {
        const taskName = task.name();
        const taskColor = task.color();
        const taskTable = table.createElement(taskName, taskColor);
        for (let t = 0; t < task.length(); t++)
            table.assignCells(taskTable, task.getDayWeek(t), task.getInitialHour(t), task.getLastHour(t));
        table.addReference(referencesDiv, task.description(), taskTable);
    });
}