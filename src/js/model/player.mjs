import { CssClasses } from "../constants/constants.mjs";
export class Player {
    #table;
    #i;
    #j;
    constructor(table, i, j) {
        this.#table = table;
        this.#i = i;
        this.#j = j;
        this.#showPlayer();
    }
    #showPlayer() {
        this.#table.rows[this.#i].cells[this.#j].classList.add(CssClasses.PLAYER);
    }
    #removePlayer(isFlip) {
        this.#table.rows[this.#i].cells[this.#j].classList.remove(CssClasses.PLAYER);
        if (isFlip) {
            this.#table.rows[this.#i].cells[this.#j].classList.remove(CssClasses.FLIP);
        }
    }
    #isFlip() {
        return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.FLIP);
    }
    #flipPlayer() {
        this.#table.rows[this.#i].cells[this.#j].classList.add(CssClasses.FLIP);
    }
    moveUp() {
        if (this.#canMoveToUp()) {
            this.#refreshPlayer(() => this.#i--);
        }
    }
    moveRight() {
        if (this.#canMoveToRight()) {
            this.#refreshPlayer(() => this.#j++);
        }
    }
    moveLeft() {
        if (this.#canMoveToLeft()) {
            this.#refreshPlayer(() => this.#j--);
        }
    }
    moveDown() {
        if (this.#canMoveToDown()) {
            this.#refreshPlayer(() => this.#i++);
        }
    }
    #canMoveToUp() {
        if (!this.#isInFirstRow()) {
            if (!this.#hasTopWall()) {
                if (!this.#hasAboveBottomWall()) {
                    return true;
                }
            }
        }
        return false;
    }
    #canMoveToRight() {
        if (!this.#isInLastColumn()) {
            if (!this.#hasRightWall()) {
                if (!this.#hasNextLeftWall()) {
                    return true;
                }
            }
        }
        return false;
    }
    #canMoveToDown() {
        if (!this.#isInLastRow()) {
            if (!this.#hasBottomWall()) {
                if (!this.#hasBelowTopWall()) {
                    return true;
                }
            }
        }
        return false;
    }
    #canMoveToLeft() {
        if (!this.#isInFirstColumn()) {
            if (!this.#hasLeftWall()) {
                if (!this.#hasPreviousRightWall()) {
                    return true;
                }
            }
        }
        return false;
    }
    #hasTopWall() {
        return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.TOP);
    }
    #hasRightWall() {
        return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.RIGHT);
    }
    #hasBottomWall() {
        return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.BOTTOM);
    }
    #hasLeftWall() {
        return this.#table.rows[this.#i].cells[this.#j].classList.contains(CssClasses.LEFT);
    }
    #hasBelowTopWall() {
        return this.#table.rows[this.#i + 1].cells[this.#j].classList.contains(CssClasses.TOP);
    }
    #hasPreviousRightWall() {
        return this.#table.rows[this.#i].cells[this.#j - 1].classList.contains(CssClasses.RIGHT);
    }
    #hasAboveBottomWall() {
        return this.#table.rows[this.#i - 1].cells[this.#j].classList.contains(CssClasses.BOTTOM);
    }
    #hasNextLeftWall() {
        return this.#table.rows[this.#i].cells[this.#j + 1].classList.contains(CssClasses.LEFT);
    }
    #isInFirstRow() {
        return this.#i == 0;
    }
    #isInLastRow() {
        return this.#i == this.#table.rows.length - 1;
    }
    #isInFirstColumn() {
        return this.#j == 0;
    }
    #isInLastColumn() {
        return this.#j == this.#table.rows[this.#i].cells.length - 1;
    }
    #refreshPlayer(movement) {
        const isFlip = this.#isFlip();
        this.#removePlayer(isFlip);
        movement();
        const wasFlip = isFlip;
        if (!wasFlip) {
            this.#flipPlayer();
        }
        this.#showPlayer();
    }
}
