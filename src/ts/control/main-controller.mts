import { CssClasses, EventKeys } from "../constants/constants.mjs";
import { Player } from "../model/player.mjs";
import { RandomUtils } from "../utils/random-utils.mjs";
import { Utils } from "../utils/utils.mjs";

export class MainController {
  static readonly #ROWS = 16;
  static readonly #COLUMNS = 24;

  static readonly #BORDERS = [CssClasses.TOP, CssClasses.RIGHT, CssClasses.BOTTOM, CssClasses.LEFT];

  readonly #randomUtils: RandomUtils = new RandomUtils();
  readonly #utils: Utils = new Utils();

  #player: Player | null = null;

  start(): void {
    const table = document.createElement("table");
    for (let i = 0; i < MainController.#ROWS; i++) {
      const row = table.insertRow(i);
      for (let j = 0; j < MainController.#COLUMNS; j++) {
        const cell = row.insertCell(j);
        if (this.#isFirstRow(i)) {
          cell.classList.add(CssClasses.TOP);
        } else if (this.#isLastRow(i)) {
          cell.classList.add(CssClasses.BOTTOM);
        }
        if (!this.#isFirstRow(i) && this.#isFirstColumn(j)) {
          cell.classList.add(CssClasses.LEFT);
        } else if (!this.#isLastRow(i) && this.#isLastColumn(j)) {
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

        if (this.#utils.containsAll(cell.classList, MainController.#BORDERS)) {
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
    table.rows[MainController.#ROWS - 1].cells[MainController.#COLUMNS - 1].classList.add(CssClasses.NO_RIGHT);
    const lab = document.getElementById("lab");
    if (lab) {
      lab.innerText = "";
      lab.appendChild(table);
    }
    this.#player = new Player(table, 0, 0);
    this.#addListenners();
  }

  #addListenners(): void {
    window.addEventListener("keydown", (event) => this.#eventKeyDown(event));
  }

  #eventKeyDown(event: KeyboardEvent) {
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

  #isFirstCell(i: number, j: number): boolean {
    return this.#isFirstRow(i) && this.#isFirstColumn(j);
  }
  #isLastCell(i: number, j: number): boolean {
    return this.#isLastRow(i) && this.#isLastColumn(j);
  }

  #isFirstRow(i: number): boolean {
    return i == 0;
  }
  #isLastRow(i: number): boolean {
    return i == MainController.#ROWS - 1;
  }

  #isFirstColumn(j: number): boolean {
    return j == 0;
  }
  #isLastColumn(j: number): boolean {
    return j == MainController.#COLUMNS - 1;
  }

  #rand(): boolean {
    return this.#randomUtils.randBetween(1, 4) == 1;
  }
}
