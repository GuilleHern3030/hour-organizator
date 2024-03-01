export const LUNES = 1;
export const MARTES = 2;
export const MIERCOLES = 3;
export const JUEVES = 4;
export const VIERNES = 5;
export const SABADO = 6;
export const DOMINGO = 7;

const CLASSITEM_COLUMNID = 2;
const CLASSITEM_NAMEID = 0;

/* ID_FORMAT = ${dayName}${hour}_f${row_fragment}_c${column} */
const MAX_FRAGMENTATION = 4;
const CLASSLIST_ELEMENTO_COLOREADO = "cell-colored";
const CLASSLIST_REFERENCIA_COLOREADA = "reference-colored";

// Nombre del día (se utiliza como ID)
const dayName = day => {
    let dayName = "?";
    if(day == LUNES) dayName = "lu";
    else if(day == MARTES) dayName = "ma";
    else if(day == MIERCOLES) dayName = "mi";
    else if(day == JUEVES) dayName = "ju";
    else if(day == VIERNES) dayName = "vi";
    else if(day == SABADO) dayName = "sa";
    else if(day == DOMINGO) dayName = "do";
    return dayName;
}

// Tamaño de la primera fila de horas(grid-template-rows)
const hGridTemplateRows = rows => {
    let hourDiv = 20;
    if(rows == 14) hourDiv = 19;
    else if(rows == 15) hourDiv = 17;
    else if(rows == 16) hourDiv = 17;
    else if(rows == 17) hourDiv = 17;
    else if(rows == 18) hourDiv = 17;
    else if(rows == 19) hourDiv = 17;
    else if(rows == 20) hourDiv = 16;
    else if(rows == 21) hourDiv = 15;
    else if(rows == 22) hourDiv = 14;
    else if(rows == 23) hourDiv = 14;
    else if(rows == 24) hourDiv = 13;
    return hourDiv;
}

// Tamaño de letra de las horas (font-size)
const hFontSize = rows => {
    let hourSize = 23;
    if(rows == 14) hourSize = 22;
    else if(rows == 15) hourSize = 22;
    else if(rows == 16) hourSize = 21;
    else if(rows == 17) hourSize = 21;
    else if(rows == 18) hourSize = 20;
    else if(rows == 19) hourSize = 19;
    else if(rows == 20) hourSize = 18;
    else if(rows == 21) hourSize = 18;
    else if(rows == 22) hourSize = 18;
    else if(rows == 23) hourSize = 18;
    else if(rows == 24) hourSize = 18;
    return hourSize;
}

// Tamaño de cada fila en píxeles (grid-auto-rows)
const hRowHeight = rows => {
    let rowHeight = 34;
    if(rows == 14) rowHeight = 33;
    else if(rows == 15) rowHeight = 32;
    else if(rows == 16) rowHeight = 31;
    else if(rows == 17) rowHeight = 30;
    else if(rows == 18) rowHeight = 29;
    else if(rows == 22) rowHeight = 25;
    else if(rows == 19) rowHeight = 28;
    else if(rows == 20) rowHeight = 27;
    else if(rows == 21) rowHeight = 26;
    else if(rows == 23) rowHeight = 25;
    else if(rows == 24) rowHeight = 24;
    return rowHeight;
}

// Obtener horas con formato (se utiliza para el ID)
const selectHours = (minHour,maxHour, fraction) => {
    let hours = [];// ${hour}_f${row_fragment}
    if(fraction <= 1) { 
        minHour = Math.floor(minHour); maxHour = Math.ceil(maxHour);
        for(let h = minHour; h < maxHour; h++) hours.push(`${h}_f0`);
    }
    else if(fraction == 2) {
        if((minHour-Math.floor(minHour)) < 0.5)
            hours.push(`${Math.floor(minHour)}_f0`);
            hours.push(`${Math.floor(minHour)}_f1`);
        if(maxHour-Math.floor(maxHour) > 0.5)
            hours.push(`${Math.floor(maxHour)}_f1`);
        if(maxHour-Math.floor(maxHour) >= 0.01)
            hours.push(`${Math.floor(maxHour)}_f0`);
        for(let h = Math.floor(minHour)+1; h < Math.floor(maxHour); h++) {
            hours.push(`${h}_f0`);
            hours.push(`${h}_f1`);
        }
    }
    else if(fraction == 3) {
        if((minHour-Math.floor(minHour)) < 0.33) hours.push(`${Math.floor(minHour)}_f0`);
        if((minHour-Math.floor(minHour)) < 0.66) hours.push(`${Math.floor(minHour)}_f1`);
        hours.push(`${Math.floor(minHour)}_f2`);
        if(maxHour-Math.floor(maxHour) > 0.66) hours.push(`${Math.floor(maxHour)}_f2`);
        if(maxHour-Math.floor(maxHour) > 0.33) hours.push(`${Math.floor(maxHour)}_f1`);
        if(maxHour-Math.floor(maxHour) >= 0.01) hours.push(`${Math.floor(maxHour)}_f0`);
        for(let h = Math.floor(minHour)+1; h < Math.floor(maxHour); h++) {
            hours.push(`${h}_f0`);
            hours.push(`${h}_f1`);
            hours.push(`${h}_f2`);
        }
    }
    else if(fraction == 4) {
        if((minHour-Math.floor(minHour)) < 0.25) hours.push(`${Math.floor(minHour)}_f0`);
        if((minHour-Math.floor(minHour)) < 0.50) hours.push(`${Math.floor(minHour)}_f1`);
        if((minHour-Math.floor(minHour)) < 0.75) hours.push(`${Math.floor(minHour)}_f2`);
        hours.push(`${Math.floor(minHour)}_f3`);
        if(maxHour-Math.floor(maxHour) > 0.75) hours.push(`${Math.floor(maxHour)}_f3`);
        if(maxHour-Math.floor(maxHour) > 0.50) hours.push(`${Math.floor(maxHour)}_f2`);
        if(maxHour-Math.floor(maxHour) > 0.25) hours.push(`${Math.floor(maxHour)}_f1`);
        if(maxHour-Math.floor(maxHour) >= 0.01) hours.push(`${Math.floor(maxHour)}_f0`);
        for(let h = Math.floor(minHour)+1; h < Math.floor(maxHour); h++) {
            hours.push(`${h}_f0`);
            hours.push(`${h}_f1`);
            hours.push(`${h}_f2`);
            hours.push(`${h}_f3`);
        }
    }
    return hours.sort();
}

// Obtiene el ID de una celda o columna de una celda
const cellID = (dayID, hourFormat, columnID) => {
    if(columnID != undefined) return `${dayName(dayID)}${hourFormat}_c${columnID}`;
    else return `${dayName(dayID)}${hourFormat}`;
}

// Devuelve TRUE si la celda existe
const isCellExists = (dayID, hourFormat, columnID) => {
    try {
        const id = cellID(dayID, hourFormat, columnID);
        const cell = document.getElementById(id);
        return cell !== null;
    } catch(error) { }
    return false;
}

// Devuelve un Array con las celdas (HTML) que componen una columna
const getHTMLColumn = (dayID, hoursFormat, columnID) => {
    let cells = [];
    if(columnID !== false) try {
        for(let hourFormat of hoursFormat) {
            let id = cellID(dayID, hourFormat, columnID);
            cells.push(document.getElementById(id));
        }
    } catch(error) { cells = []; }
    return cells;
}

// Devuelve TRUE si la celda está vacía o no existe
const isCellEmpty = (dayID, hourFormat, columnID) => {
    try {
        const id = cellID(dayID, hourFormat, columnID);
        const cell = document.getElementById(id);
        return cell.classList.contains(CLASSLIST_ELEMENTO_COLOREADO) == false;
    } catch(error) { }// html not exists
    return true;
}

// Devuelve TRUE si la columna está vacía, FALSE si hubo un error, un Array si no está vacía
const isColumnEmpty = (dayID, hoursFormat, columnID) => {
    if(hoursFormat.length > 0) try {
        for(let hourFormat of hoursFormat)
            if(isCellEmpty(dayID, hourFormat, columnID) === false) 
                return [dayID, hourFormat, columnID];
    } catch(error) { return false; }
    return true;
}

// Obtiene el ID de columna vacío más cercano a 0
const getEmptyColumnID = (dayID, hoursFormat) => {
    try {
        let column = -1, i = 0;
        while(column == -1) {
            if(isColumnEmpty(dayID, hoursFormat, i) === true)
                column = i;
            i++;
        }
        return column;
    } catch(error) { console.error(error); }
    return false;
}

// Obtiene el ID de columna coloreada sin usar más cercano a 0
const emptyColoredID = ()=> {
    try {
        let i = 0;
        while(true) {
            const columnExists = document.querySelector(`.${CLASSLIST_ELEMENTO_COLOREADO}-${i}`);
            if(columnExists == null) return i;
            i++;
        }
    } catch(error) {
        console.error(error);
    }
}

// Crea un FlexItem dentro de una celda, fragmento de una columna coloreada
const createHTMLItemInCell = (dayID, hourFormat, columnID) => {
    let i = 0;
    while(columnID == undefined) {
        if(!isCellExists(dayID, hourFormat, i)) columnID = i;
        i++;
    }
    if(columnID > 0 && !isCellExists(dayID, hourFormat, columnID-1)) 
        createHTMLItemInCell(dayID, hourFormat, columnID-1, true);
    if(!isCellExists(dayID, hourFormat, columnID)) {
        const HTMLCell = document.getElementById(cellID(dayID, hourFormat, undefined));
        const flexItem = document.createElement("CELLCOLUMN");
        const cellId = `${dayName(dayID)}${hourFormat}_c${columnID}`;
        flexItem.setAttribute("id", cellId);
        flexItem.style.height = "103%";
        flexItem.style.width = "100%";
        HTMLCell.appendChild(flexItem);
    }
}

// Crea una columna coloreada de un ID de columna
const createHTMLColumn = (dayID, hoursFormat, columnID) => {
    for(let hourFormat of hoursFormat) createHTMLItemInCell(dayID, hourFormat, columnID);
}

// Elimina un fragmento de columna coloreada
const deleteCell = (dayID, hourFormat, columnID) => {
    try {
        cellID(dayID, hourFormat, columnID).outerHTML = "";
    } catch(error) { }
}

// Cambia el ID de columna de una columna coloreada
const moveColumnTo = (dayID, hoursFormat, columnID, columnDestinity) => {
    try {
        for(let hourFormat of hoursFormat) {
            const cell = document.getElementById(cellID(dayID, hourFormat, columnID));
            const newCell = document.getElementById(cellID(dayID, hourFormat, columnDestinity));
            newCell.style.backgroundColor = cell.style.backgroundColor;
            newCell.classList.add(CLASSLIST_ELEMENTO_COLOREADO);
            newCell.classList.add(cell.classList.item(CLASSITEM_COLUMNID));
            deleteCell(dayID, hourFormat, columnID);
        }
    } catch(error) { }
}

// Obtiene todos los elementos HTML de una columna ocupada en un Array
const getHTMLOccupiedColumn = (HTMLlement) => {
    let cells = [];// hourformat: ${hour}_f${row}
    try {
        const nodes = document.querySelectorAll(`.${HTMLlement.classList.item(CLASSITEM_COLUMNID)}`);
        nodes.forEach(node => {cells.push(node)});
    } catch(error) { }
    return cells;
}

// Obtiene el ID de columna vacío más lejano a 0
const getLastEmptyColumnID = (dayID, hoursFormat, lastColumnID) => {
    try {
        let column = lastColumnID;
        while(isColumnEmpty(dayID, hoursFormat, column) !== true && column >= 0) 
            column--;
        if(column != lastColumnID) column++;
        return column;
    } catch(error) { console.error(error); }
    return false;
}

// Corrige el ancho de las columnas coloreadas
const fixWidth = (dayID, hoursFormat) => {
    const MAX_COLUMN_ID = getEmptyColumnID(dayID, hoursFormat);
    if(MAX_COLUMN_ID > -1) {
        if(hoursFormat === undefined) hoursFormat = selectHours(0, 24, MAX_FRAGMENTATION);
        for(let hourFormat of hoursFormat) {
            try {
                let columns = getLastEmptyColumnID(dayID, [hourFormat], MAX_COLUMN_ID);
                while(columns != MAX_COLUMN_ID) {
                    createHTMLItemInCell(dayID, hourFormat);
                    columns++;
                }
            } catch(error) { }
        }
    }
}

// Devuelve TRUE si es un caracter válido para CSS class
const isValidCSSChar = char => {
    if(char.length == 1) switch(char.toUpperCase()) {
        case "A": return true;
        case "B": return true;
        case "C": return true;
        case "D": return true;
        case "E": return true;
        case "F": return true;
        case "G": return true;
        case "H": return true;
        case "I": return true;
        case "J": return true;
        case "K": return true;
        case "L": return true;
        case "M": return true;
        case "N": return true;
        case "O": return true;
        case "P": return true;
        case "Q": return true;
        case "R": return true;
        case "S": return true;
        case "T": return true;
        case "U": return true;
        case "V": return true;
        case "W": return true;
        case "X": return true;
        case "Y": return true;
        case "Z": return true;
        case "_": return true;
        case "-": return true;
        default: return false;
    }
    return false;
}

// Elimina un carater de un texto y lo reemplaza por otro (opcional)
const delChar = (text, char, replaceWith) => {
    try {
        if(replaceWith == undefined) replaceWith = "";
        return (text.split(char)).join(replaceWith);
    } catch(error) { console.error(error); }
    return text;
}

// Elimina los caracteres no permitidos en un nombre de class
const className = name => {
    try {
        let nombre = delChar(`_${name.trim()}`.padStart(3,"_"), " ", "_");
        for(let l = 0; l < nombre.length; l++) 
            if(!isValidCSSChar(nombre.substring(l,l+1))) 
                nombre = delChar(nombre,nombre.substring(l,l+1),"-");
        return nombre;
    } catch(error) { console.error(error); }
    return name;
}

export class Tabla {
    #elements = [];
    #firstDay;
    #lastDay;
    #firstHour;
    #lastHour;

    constructor(firstHour, lastHour, firstDay, lastDay) {
        
        if(firstDay < LUNES) firstDay = LUNES;
        else if(firstDay > DOMINGO) firstDay = DOMINGO;
        else firstDay = Math.floor(firstDay);
        this.#firstDay = firstDay;

        if(lastDay > DOMINGO) lastDay = DOMINGO;
        else if(lastDay < LUNES) lastDay = LUNES;
        else lastDay = Math.ceil(lastDay);
        if(lastDay < firstDay) {
            let tmp = firstDay;
            firstDay = lastDay;
            lastDay = tmp;
        }
        this.#lastDay = lastDay;

        firstHour = Math.floor(firstHour);
        if(firstHour < 0) firstHour = 0;
        else if(firstHour > 22) firstHour = 22;
        this.#firstHour = firstHour;
        
        lastHour = Math.ceil(lastHour);
        if(lastHour < 1) lastHour = 1;
        else if(lastHour > 23) lastHour = 24;
        this.#lastHour = lastHour;
    }

    firstDay = () => this.#firstDay; 
    lastDay = () => this.#lastDay; 
    firstHour = () => this.#firstHour; 
    lastHour = () => this.#lastHour; 

    /**
     * @param {HTMLDivElement} HTMLGridContainerElement - Contenedor donde se creará la tabla
     * @param {color} colorFondo 
     * @param {color} colorBordes 
     */
    show(HTMLGridContainerElement, colorFondo, colorBordes) {
        if(colorFondo == undefined) colorFondo = "#fff";
        if(colorBordes == undefined) colorBordes = "#000";
        try {
            const firstHour = this.#firstHour;
            const lastHour = this.#lastHour;
            const firstDay = this.#firstDay;
            const lastDay = this.#lastDay;
            const fractionsHour = MAX_FRAGMENTATION;
            const filas = lastHour - firstHour;
            const fragment = document.createDocumentFragment();

            // Primera fila de la tabla
            const grid_empty_day = document.createElement("DIV");
            grid_empty_day.style.borderRight = `3px solid ${colorBordes}`;
            grid_empty_day.style.borderBottom = `3px solid ${colorBordes}`;
            grid_empty_day.style.borderTop = `1px solid ${colorBordes}`;
            grid_empty_day.style.borderLeft = `1px solid ${colorBordes}`;
            fragment.appendChild(grid_empty_day);

            for(let d = firstDay; d <= lastDay; d++) {

                const separador_izquierdo = document.createElement("DIV");
                separador_izquierdo.style.borderLeft = `1px solid ${colorBordes}`;
                separador_izquierdo.style.borderTop = `1px solid ${colorBordes}`;
                separador_izquierdo.style.borderBottom = `3px solid ${colorBordes}`;
                fragment.appendChild(separador_izquierdo);

                const dia_de_la_semana = document.createElement("P");
                dia_de_la_semana.style.textAlign = "center";
                dia_de_la_semana.style.fontSize = "24px";
                dia_de_la_semana.style.padding = "3px";
                dia_de_la_semana.style.borderBottom = `3px solid ${colorBordes}`;
                dia_de_la_semana.style.borderTop = `1px solid ${colorBordes}`;
                dia_de_la_semana.innerHTML = dayName(d).toUpperCase();
                fragment.appendChild(dia_de_la_semana);

                const separador_derecho = document.createElement("DIV");
                separador_derecho.style.borderRight = `1px solid ${colorBordes}`;
                separador_derecho.style.borderTop = `1px solid ${colorBordes}`;
                separador_derecho.style.borderBottom = `3px solid ${colorBordes}`;
                fragment.appendChild(separador_derecho);
            }
            
            // Columna de horarios
            const grilla_columna_de_horarios = document.createElement("DIV");
            grilla_columna_de_horarios.style.gridRow = `2 / ${((filas*fractionsHour)+2)}`;
            grilla_columna_de_horarios.style.display = "grid";
            grilla_columna_de_horarios.style.gridTemplateRows = `${hGridTemplateRows(filas)}px`;
            grilla_columna_de_horarios.style.gridAutoRows = `${hRowHeight(filas)}px`;
            grilla_columna_de_horarios.style.borderRight = `3px solid ${colorBordes}`;
            grilla_columna_de_horarios.style.borderLeft = `1px solid ${colorBordes}`;
            grilla_columna_de_horarios.style.borderBottom = `1px solid ${colorBordes}`;
            fragment.appendChild(grilla_columna_de_horarios);

            grilla_columna_de_horarios.appendChild(document.createElement("DIV"));
            for(let i = (firstHour+1); i < lastHour; i++) {
                const paragraph = document.createElement("P");
                paragraph.style.backgroundColor = "transparent";
                paragraph.style.fontSize = `${hFontSize(filas)}px`;
                paragraph.style.height = "100%";
                paragraph.style.textAlign = "right";
                paragraph.style.paddingRight = "6px";
                paragraph.style.paddingLeft = "8px";
                paragraph.innerText = `${i}hs`;
                if(i < 10) paragraph.setAttribute("id", `h0${i}`);
                else paragraph.setAttribute("id", `h${i}`);
                grilla_columna_de_horarios.appendChild(paragraph);
            }

            // Creación de celdas
            for(let h = firstHour; h < lastHour; h++) {
                let fraction = 0;
                do {
                    for(let d = firstDay; d <= lastDay; d++) {
                        // Separador izquierdo
                        const lsep = document.createElement("DIV");
                        lsep.style.borderLeft = "1px solid ${colorBordes}";
                        if(fractionsHour <= 1 || fraction >= fractionsHour-1) lsep.style.borderBottom = `1px solid #000`;
                        fragment.appendChild(lsep);
                        // Celda
                        const cell = document.createElement("CELL");
                        cell.classList.add(`${dayName(d)}${h}`);
                        cell.style.display = "flex";
                        cell.setAttribute("id", `${dayName(d)}${h}_f${fraction}`);
                        if(fractionsHour <= 1 || fraction >= fractionsHour-1) cell.style.borderBottom = `1px solid #000`;
                        fragment.appendChild(cell);
                        // Separador derecho
                        const rsep = document.createElement("DIV");
                        rsep.style.borderRight = `1px solid ${colorBordes}`;
                        if(fractionsHour <= 1 || fraction >= fractionsHour-1) rsep.style.borderBottom = `1px solid #000`;
                        fragment.appendChild(rsep);
                    }
                    fraction++;
                } while(fraction < fractionsHour);
            }

            // Aplicación de cambios en el HTML
            HTMLGridContainerElement.style.gridAutoRows = `${(hRowHeight(filas) / fractionsHour)}px`;
            HTMLGridContainerElement.style.gridTemplateRows = `min-content`;
            HTMLGridContainerElement.style.backgroundColor = `${colorFondo}`;
            HTMLGridContainerElement.style.display = `grid`;
            HTMLGridContainerElement.style.gridTemplateColumns = 
            `minmax(min-content, max-content) [column-h] repeat(${lastDay}, 0.2fr minmax(max-content, 10fr) 0.2fr)`;
            HTMLGridContainerElement.innerHTML = "";
            HTMLGridContainerElement.appendChild(fragment);
        } catch(error) { console.error(error); }
    }


    /**
     * @param {HTMLDivElement} HTMLGridContainerElement - Contenedor donde se creará la tabla
     * @param {HTMLDivElement} HTMLContainerElement - Contenedor donde se agregará la referencia
     */
    destroy(HTMLGridContainerElement, HTMLContainerElement) {
        HTMLGridContainerElement.innerHTML = "";
        HTMLContainerElement.innerHTML = "";
    }

    /**
     * @param {string} name - nombre del elemento / asignatura
     * @return {id} - id del elemento creado
     */
    createElement(name, color) {
        const element = {
            "name" : name,
            "classname" : className(name),
            "color" : color
        };
        this.#elements.push(element);
        return this.#elements.length - 1;
    }

    /**
     * @param {number} id
     * @param {number} day - día de la semana, empezando en lunes
     * @param {number} minHour - hora de inicio del coloreo (empezando en 0)
     * @param {number} maxHour - hora de fin del coloreo (terminando en 23)
     */
    assignCells(id, day, minHour, maxHour) {
        if(day >= this.#firstDay && day <= this.#lastDay) {
            if(minHour != maxHour) {
                let element;
                try {
                    if(id < this.#elements.length) element = this.#elements[id];
                    if(minHour < this.#firstHour) minHour = this.#firstHour;
                    if(maxHour > this.#lastHour) maxHour = this.#lastHour;

                    const hours = selectHours(minHour, maxHour, MAX_FRAGMENTATION);
                    const columnID = getEmptyColumnID(day, hours);
                    createHTMLColumn(day, hours, columnID);
                    const cells = getHTMLColumn(day, hours, columnID);
                    if(cells.length > 0) {
                        for(let cell of cells) {
                            cell.style.backgroundColor = element.color;
                            cell.classList.add(element.classname);
                            cell.classList.add(CLASSLIST_ELEMENTO_COLOREADO);
                            cell.setAttribute("title", element.name);
                        }
                        fixWidth(day, hours);
                        return cells;
                    }
                } catch(error) { console.error(error); }
            } else console.error("minHour or maxHour is invalid.");
        } else console.error("Invalid day.");
        return false;
    }

    /**
     * @param {HTMLDivElement} HTMLContainerElement - Contenedor donde se agregará la referencia
     * @param {string} text - Nombre de referencia 
     * @param {number} id
     */
    addReference(HTMLContainerElement, text, id) {
        try {
                const element = this.#elements[id];
                const fragment = document.createDocumentFragment();
                const container = document.createElement("REFCONTAINER");
                container.style.display = "block";
                container.style.marginBottom = "5px";
                container.classList.add(CLASSLIST_REFERENCIA_COLOREADA);
                container.classList.add(element.classname);
                container.setAttribute("title", element.name);
                const colorBox = document.createElement("DIV");
                colorBox.style.display = "inline-block";
                colorBox.style.backgroundColor = element.color;
                colorBox.style.border = "1px solid #000"
                colorBox.style.padding = "6px"
                colorBox.style.marginRight = "15px";
                container.appendChild(colorBox);
                const paragraph = document.createElement("P");
                paragraph.style.display = "inline-block";
                paragraph.innerHTML = text;
                container.appendChild(paragraph);
                fragment.appendChild(container);
                HTMLContainerElement.appendChild(fragment);
            //}
        } catch(error) { console.error(error); }
    }

    /**
     * @param {HTMLDivElement} HTMLDivElement - Contenedor donde se agregará la referencia
     * @param {string} text - Nombre de referencia 
     * @param {number} id
     */
    eliminarReferencia(id) {
    }
}
