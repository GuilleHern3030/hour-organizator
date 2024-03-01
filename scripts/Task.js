const DAY_WEEK = "DAY_WEEK";
const INITIAL_HOUR = "INITIAL_HOUR";
const LAST_HOUR = "LAST_HOUR";

const min = (a, b) => a < b ? a : b;
const max = (a, b) => a > b ? a : b;

export class Task {

    #name;
    #color;
    #description;
    #firstDay;
    #lastDay;
    #firstHour;
    #lastHour;
    #hours = [];

    constructor(name, color, description) {
        this.#name = name;
        this.#color = color;
        this.#description = description;
        this.#firstDay = 9;
        this.#lastDay = 0;
        this.#firstHour = 24;
        this.#lastHour = 0;
    }

    firstWeekDay = () => this.#firstDay;
    lastWeekDay = () => this.#lastDay;
    firstHour = () => this.#firstHour;
    lastHour = () => this.#lastHour;

    name = () => this.#name;
    color = () => this.#color;
    description = () => this.#description;

    push(dayWeek, initialHour, lastHour) {
        if (dayWeek < this.#firstDay) this.#firstDay = dayWeek;
        if (dayWeek > this.#lastDay) this.#lastDay = dayWeek;
        if (initialHour < this.#firstHour) this.#firstHour = initialHour;
        if (lastHour > this.#lastHour) this.#lastHour = lastHour;
        this.#hours.push({
            DAY_WEEK: dayWeek,
            INITIAL_HOUR: min(initialHour, lastHour),
            LAST_HOUR: max(initialHour, lastHour)
        });
    }

    length = () => this.#hours.length;
    getDayWeek = i => this.#hours[i][DAY_WEEK];
    getInitialHour = i => this.#hours[i][INITIAL_HOUR];
    getLastHour = i => this.#hours[i][LAST_HOUR];
}