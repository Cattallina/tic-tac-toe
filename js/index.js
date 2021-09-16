let game = document.querySelector('#game'),
    field = game.querySelector('.field'),
    rowsNum = 3,
    colsNum = 3,
    gamers = ['gamer1', 'bot'],
    gamerNum = 0,
    count = 0;

let rows = createField(field, rowsNum, colsNum),
    cols = getColumns(rows),
    diag1 = getFirstDiags(rows),
    diag2 = getSecondDiags(rows),
    lines = rows.concat(cols, diag1, diag2);

function createField(field, rowsNum, colsNum) {
    let rows = [];

    for (let i = 0; i < rowsNum; i++) { // passes through the rows
        let tr = document.createElement('tr'); // create the necessary amount tr
        rows[i] = []; // create arr for each line

        for (let j = 0; j < colsNum; j++) { // passes through the columns
            let td = document.createElement('td'); // create the necessary amount td
            tr.appendChild(td); // push td in tr

            td.addEventListener('click', cellClackHandler);
            rows[i][j] = td; // push to arr columns
        }
        field.appendChild(tr); // push tr in table
    }
    return rows;
}

function cellClackHandler() {
    this.classList.add(gamers[gamerNum]);
    this.removeEventListener('click', cellClackHandler);

    isWin(gamers, lines);

    gamerNum++;
    count++;
    if (gamerNum === gamers.length) {
        gamerNum = 0;
    }
}

function getColumns(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) { // number arr elems - 3
        for (let j = 0; j < arr[i].length; j++) { // number in arr arrs elems - 3 = 9
            if (result[j] === undefined) {
                result[j] = [];
            }
            result[j][i] = arr[i][j];
        }
    }

    return result;
    /*
        i = [ [], [], [] ] - 3 массива
        j = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] - элементы выбраного массива - 1, 4, 7 ...
        [
            [1, 4, 9],
            [2, 5, 8],
            [3, 6, 9]
        ]
    */
}

function getFirstDiags(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (result[i + j] === undefined) {
                result[i + j] = [];
            }
            result[i + j].push(arr[i][j]);
        }
    }
    /*
        0 + 0 = 0[1];
        0 + 1 = 1[4];
        0 + 2 = 2[7];

        1 + 0 = 1[2];
        1 + 1 = 2[5];
        1 + 2 = 3[8];

        2 + 0 = 2[3];
        2 + 1 = 3[6];
        2 + 2 = 4[9];

        [
            [1],
            [4, 2],
            [7, 5, 3],
            [8, 6],
            [9]
        ]
    */

    return result
}

function getSecondDiags(arr) {
    return getFirstDiags(reverseSubArrs(arr))
}

function reverseSubArrs(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = arr[i].length - 1; j >= 0; j--) {
            if (result[i] === undefined) {
                result[i] = [];
            }
            result[i].push(arr[i][j]);
        }
    }
    return result
}

function checkWin(gamer, lines) {

    for (let i = 0; i < lines.length; i++) {
        for (let j = 2; j < lines[i].length; j++) {
            if (lines[i][j - 2].classList.contains(gamer) &&
                lines[i][j - 1].classList.contains(gamer) &&
                lines[i][j].classList.contains(gamer)) {
                return true;
            }
        }
    }
    return false;
}

function isWin(gamers, lines) {
    if (count >= 8) {
        let quest = confirm('Try again?');
        if (quest === true) {
            clearField();
        } else {
            return true
        }
    }
    for (let i = 0; i < gamers.length; i++) {
        if (checkWin(gamers[i], lines)) {
            for (let i = 0; i < lines.length; i++) {
                for (let j = 0; j < lines[i].length; j++) {
                    if (lines[i][j].classList.contains(gamers[gamerNum])) {
                        lines[i][j].classList.add('winner');
                    }
                }
            }
            endGame(gamers[i]);
            break;
        }
    }
}

function endGame(gamer) {
    setTimeout(() => alert(gamer), 500);
    freezeField();
    clearField();
}

function freezeField() {
    let cells = game.querySelectorAll('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', cellClackHandler);
    }
}

function clearField() {
    setTimeout(() => location.reload(), 1000)
}