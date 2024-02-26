
window.addEventListener("load", start )

//controller
function start(){
    console.log("javascript kører")
    makeBoardClickable();
    displayBoard();


}
function selectCell(row, col) {
    writeToCell(row,col,1);
    console.table(model);
    displayBoard();

}
// view
function makeBoardClickable() {
    document.getElementById("board").addEventListener("click", boardClicked)

}

function boardClicked(event) {
    console.log("Board clicked!")
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
   console.log(`Clicked on Row: ${row} col: ${col}`);
   selectCell(row, col);

}
function displayBoard(){
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            const value = readFromCell(row,col);
            console.log(value)
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = value;
        }
    }
}
// model

const model = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

function writeToCell(row, col, value){
    model[row][col] = value



}

function readFromCell(row, col){
    return  model[row][col]

}

