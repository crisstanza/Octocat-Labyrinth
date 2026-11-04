import { CssClasses, EventKeys } from "../constants/constants.mjs";
import { Player } from "../model/player.mjs";
import { RandomUtils } from "../utils/random-utils.mjs";

export class MainController {
  static readonly #ROWS = 24;
  static readonly #COLUMNS = 32;

  static readonly #BORDERS = [CssClasses.TOP, CssClasses.RIGHT, CssClasses.BOTTOM, CssClasses.LEFT];

  readonly #randomUtils: RandomUtils = new RandomUtils();

  #player: Player | null = null;

  start(): void {
    const table = document.createElement("table");
    for (let i = 0; i < MainController.#ROWS; i++) {
      const row = table.insertRow(i);
      for (let j = 0; j < MainController.#COLUMNS; j++) {
        const cell = row.insertCell(j);
        cell.classList.add(...MainController.#BORDERS);
      }
    }
    this.#ensureAllCellsReachable(table);
    this.#addAlternativePaths(table);
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

  #ensureAllCellsReachable(table: HTMLTableElement): void {
    const visited = new Set<number>();
    const visit = (row: number, column: number): void => {
      visited.add(row * MainController.#COLUMNS + column);
      const neighbors = [
        { row: row - 1, column },
        { row, column: column + 1 },
        { row: row + 1, column },
        { row, column: column - 1 },
      ].filter((neighbor) => neighbor.row >= 0 && neighbor.row < MainController.#ROWS && neighbor.column >= 0 && neighbor.column < MainController.#COLUMNS && !visited.has(neighbor.row * MainController.#COLUMNS + neighbor.column));

      while (neighbors.length > 0) {
        const index = this.#randomUtils.randBetween(0, neighbors.length - 1);
        const [neighbor] = neighbors.splice(index, 1);
        if (visited.has(neighbor.row * MainController.#COLUMNS + neighbor.column)) {
          continue;
        }
        this.#removeWallsBetween(table, row, column, neighbor.row, neighbor.column);
        visit(neighbor.row, neighbor.column);
      }
    };

    visit(0, 0);
  }

  #addAlternativePaths(table: HTMLTableElement): void {
    for (let row = 0; row < MainController.#ROWS; row++) {
      for (let column = 0; column < MainController.#COLUMNS; column++) {
        const cell = table.rows[row].cells[column];
        if (column < MainController.#COLUMNS - 1 && cell.classList.contains(CssClasses.RIGHT) && this.#hasMultiplePassages(table, row, column) && this.#hasMultiplePassages(table, row, column + 1) && this.#randomUtils.randBetween(1, 5) === 1) {
          this.#removeWallsBetween(table, row, column, row, column + 1);
        }

        if (row < MainController.#ROWS - 1 && cell.classList.contains(CssClasses.BOTTOM) && this.#hasMultiplePassages(table, row, column) && this.#hasMultiplePassages(table, row + 1, column) && this.#randomUtils.randBetween(1, 5) === 1) {
          this.#removeWallsBetween(table, row, column, row + 1, column);
        }
      }
    }
  }

  #hasMultiplePassages(table: HTMLTableElement, row: number, column: number): boolean {
    const cell = table.rows[row].cells[column];
    let passages = 0;
    if (row > 0 && !cell.classList.contains(CssClasses.TOP)) {
      passages++;
    }
    if (column < MainController.#COLUMNS - 1 && !cell.classList.contains(CssClasses.RIGHT)) {
      passages++;
    }
    if (row < MainController.#ROWS - 1 && !cell.classList.contains(CssClasses.BOTTOM)) {
      passages++;
    }
    if (column > 0 && !cell.classList.contains(CssClasses.LEFT)) {
      passages++;
    }
    return passages > 1;
  }

  #removeWallsBetween(table: HTMLTableElement, row: number, column: number, nextRow: number, nextColumn: number): void {
    const cell = table.rows[row].cells[column];
    const nextCell = table.rows[nextRow].cells[nextColumn];
    if (nextRow < row) {
      cell.classList.remove(CssClasses.TOP);
      nextCell.classList.remove(CssClasses.BOTTOM);
    } else if (nextRow > row) {
      cell.classList.remove(CssClasses.BOTTOM);
      nextCell.classList.remove(CssClasses.TOP);
    } else if (nextColumn < column) {
      cell.classList.remove(CssClasses.LEFT);
      nextCell.classList.remove(CssClasses.RIGHT);
    } else {
      cell.classList.remove(CssClasses.RIGHT);
      nextCell.classList.remove(CssClasses.LEFT);
    }
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
}
