document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    solveButton.addEventListener('click', solveSudoku);

    const sudokuGrid = document.getElementById("sudoku-grid");
    // Criar o grid do sudoku e as celulas
    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }
});


async function solveSudoku() {
    const gridSize = 9;
    const sudokuArray = [];

    // Preencher o sudokuArray com o input dos valores do grid
    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }


    // Identificar user-input das celulas e marca-las
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            }
        }
    }

    // Resolver o sudoku e mostrar a solução

    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                // Preecher os valores resolvidos e jogar na animação
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(20); // Adicionando delay pra animação
                }
            }
        }
    } else {
        alert("Não existe solução para esse puzzle do sudoku.");
    }
}


function solveSudokuHelper(board) {
    const gridSize = 9;

    for (let row = 0; row < gridSize; row++) {
        for(let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num ++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;

                        // Tentativa recursiva para resolver o sudoku
                        if (solveSudokuHelper(board)) {
                            return true;
                        }

                        board[row][col] = 0; 
                    }
                }
                return false; // Nenhum numero valido achado
            }
        }
    }
    
    return true; // Todas as celulas preenchidas
}

function isValidMove(board, row, col, num) {
    const gridSize = 9;

    // Checar se há conflitos entre as columnas e as linhas
    for(let i = 0; i< gridSize; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false; // Conflito achado
        }
    }

    // Checar se há conflitos no 3*3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for( let i =startRow; i < startRow + 3; i++ ) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

function sleep(ms) {
    return new Promise (resolve => setTimeout(resolve, ms));
}