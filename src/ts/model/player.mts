import { CssClasses } from "../constants/constants.mjs";

export class Player {
  #table: HTMLTableElement;
  #i: number;
  #j: number;

  constructor(table: HTMLTableElement, i: number, j: number) {
    this.#table = table;
    this.#i = i;
    this.#j = j;
    this.#showPlayer();
  }

  #showPlayer() {
    this.#table.rows[this.#i].cells[this.#j].classList.add(CssClasses.PLAYER);
  }
  #removePlayer(isFlip: boolean) {
    this.#table.rows[this.#i].cells[this.#j].classList.remove(CssClasses.PLAYER);
    if (isFlip) {
      this.#table.rows[this.#i].cells[this.#j].classList.remove(CssClasses.FLIP);
    }
  }

  #isFlip(): boolean {
    return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.FLIP);
  }
  #flipPlayer() {
    this.#table.rows[this.#i].cells[this.#j].classList.add(CssClasses.FLIP);
  }

  moveUp(): void {
    if (this.#canMoveToUp()) {
      this.#refreshPlayer(() => this.#i--);
    }
  }
  moveRight(): void {
    if (this.#canMoveToRight()) {
      this.#refreshPlayer(() => this.#j++);
    }
  }
  moveLeft(): void {
    if (this.#canMoveToLeft()) {
      this.#refreshPlayer(() => this.#j--);
    }
  }
  moveDown(): void {
    if (this.#canMoveToDown()) {
      this.#refreshPlayer(() => this.#i++);
    }
  }

  #canMoveToUp(): boolean {
    if (!this.#isInFirstRow()) {
      if (!this.#hasTopWall()) {
        if (!this.#hasAboveBottomWall()) {
          return true;
        }
      }
    }
    return false;
  }
  #canMoveToRight(): boolean {
    if (!this.#isInLastColumn()) {
      if (!this.#hasRightWall()) {
        if (!this.#hasNextLeftWall()) {
          return true;
        }
      }
    }
    return false;
  }
  #canMoveToDown(): boolean {
    if (!this.#isInLastRow()) {
      if (!this.#hasBottomWall()) {
        if (!this.#hasBelowTopWall()) {
          return true;
        }
      }
    }
    return false;
  }
  #canMoveToLeft(): boolean {
    if (!this.#isInFirstColumn()) {
      if (!this.#hasLeftWall()) {
        if (!this.#hasPreviousRightWall()) {
          return true;
        }
      }
    }
    return false;
  }

  #hasTopWall(): boolean {
    return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.TOP);
  }
  #hasRightWall(): boolean {
    return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.RIGHT);
  }
  #hasBottomWall(): boolean {
    return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.BOTTOM);
  }
  #hasLeftWall(): boolean {
    return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.LEFT);
  }

  #hasBelowTopWall(): boolean {
    return this.#table.rows[this.#i + 1].cells[this.#j].classList.contains(CssClasses.TOP);
  }
  #hasPreviousRightWall(): boolean {
    return this.#table.rows[this.#i].cells[this.#j - 1].classList.contains(CssClasses.RIGHT);
  }
  #hasAboveBottomWall(): boolean {
    return this.#table.rows[this.#i - 1].cells[this.#j].classList.contains(CssClasses.BOTTOM);
  }
  #hasNextLeftWall(): boolean {
    return this.#table.rows[this.#i].cells[this.#j + 1].classList.contains(CssClasses.LEFT);
  }

  #isInFirstRow(): boolean {
    return this.#i == 0;
  }
  #isInLastRow(): boolean {
    return this.#i == this.#table.rows.length - 1;
  }
  #isInFirstColumn(): boolean {
    return this.#j == 0;
  }
  #isInLastColumn(): boolean {
    return this.#j == this.#table.rows[this.#i].cells.length - 1;
  }

  #refreshPlayer(movement: Function): void {
    const isFlip: boolean = this.#isFlip();
    this.#removePlayer(isFlip);
    movement();
    const wasFlip: boolean = isFlip;
    if (!wasFlip) {
      this.#flipPlayer();
    }
    this.#showPlayer();
  }
}
