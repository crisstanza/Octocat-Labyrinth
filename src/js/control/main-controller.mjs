var _a;
import { CssClasses, EventKeys } from "../constants/constants.mjs";
import { Player } from "../model/player.mjs";
import { RandomUtils } from "../utils/random-utils.mjs";
import { Utils } from "../utils/utils.mjs";
export class MainController {
    static #ROWS = 16;
    static #COLUMNS = 24;
    static #BORDERS = [CssClasses.TOP, CssClasses.RIGHT, CssClasses.BOTTOM, CssClasses.LEFT];
    #randomUtils = new RandomUtils();
    #utils = new Utils();
    #player = null;
    start() {
        const table = document.createElement("table");
        for (let i = 0; i < _a.#ROWS; i++) {
            const row = table.insertRow(i);
            for (let j = 0; j < _a.#COLUMNS; j++) {
                const cell = row.insertCell(j);
                if (this.#isFirstRow(i)) {
                    cell.classList.add(CssClasses.TOP);
                }
                else if (this.#isLastRow(i)) {
                    cell.classList.add(CssClasses.BOTTOM);
                }
                if (!this.#isFirstRow(i) && this.#isFirstColumn(j)) {
                    cell.classList.add(CssClasses.LEFT);
                }
                else if (!this.#isLastRow(i) && this.#isLastColumn(j)) {
                    cell.classList.add(CssClasses.RIGHT);
                }
                if (this.#rand()) {
                    cell.classList.add(CssClasses.TOP);
                }
                if (this.#rand()) {
                    cell.classList.add(CssClasses.BOTTOM);
                }
                if (this.#rand() && !(this.#isFirstRow(i) && this.#isFirstColumn(j))) {
                    cell.classList.add(CssClasses.LEFT);
                }
                if (this.#rand() && !(this.#isLastRow(i) && this.#isLastColumn(j))) {
                    cell.classList.add(CssClasses.RIGHT);
                }
                if (this.#utils.containsAll(cell.classList, _a.#BORDERS)) {
                    if (this.#rand()) {
                        cell.classList.remove(CssClasses.TOP);
                    }
                    if (this.#rand()) {
                        cell.classList.remove(CssClasses.RIGHT);
                    }
                    if (this.#rand()) {
                        cell.classList.remove(CssClasses.BOTTOM);
                    }
                    if (this.#rand()) {
                        cell.classList.remove(CssClasses.LEFT);
                    }
                }
            }
        }
        table.rows[0].cells[0].classList.add(CssClasses.NO_LEFT);
        table.rows[_a.#ROWS - 1].cells[_a.#COLUMNS - 1].classList.add(CssClasses.NO_RIGHT);
        const lab = document.getElementById("lab");
        if (lab) {
            lab.innerText = "";
            lab.appendChild(table);
        }
        this.#player = new Player(table, 0, 0);
        this.#addListenners();
    }
    #addListenners() {
        window.addEventListener("keydown", (event) => this.#eventKeyDown(event));
    }
    #eventKeyDown(event) {
        if (this.#player) {
            switch (event.key) {
                case EventKeys.ArrowUp:
                    event.preventDefault();
                    this.#player.moveUp();
                    break;
                case EventKeys.ArrowRight:
                    event.preventDefault();
                    this.#player.moveRight();
                    break;
                case EventKeys.ArrowDown:
                    event.preventDefault();
                    this.#player.moveDown();
                    break;
                case EventKeys.ArrowLeft:
                    event.preventDefault();
                    this.#player.moveLeft();
                    break;
                default:
                    return;
            }
        }
    }
    #isFirstCell(i, j) {
        return this.#isFirstRow(i) && this.#isFirstColumn(j);
    }
    #isLastCell(i, j) {
        return this.#isLastRow(i) && this.#isLastColumn(j);
    }
    #isFirstRow(i) {
        return i == 0;
    }
    #isLastRow(i) {
        return i == _a.#ROWS - 1;
    }
    #isFirstColumn(j) {
        return j == 0;
    }
    #isLastColumn(j) {
        return j == _a.#COLUMNS - 1;
    }
    #rand() {
        return this.#randomUtils.randBetween(1, 4) == 1;
    }
}
_a = MainController;
