const startGameButton = document.getElementById('startGame');
let player1 = document.getElementById('player1').value;
let player2 = document.getElementById('player2').value;
const turnOf = document.getElementById('turnOf')
const playerName = document.getElementById('playerName');
let player1Cells = [];
let player2Cells = [];
let currentPlayer;
let cells;
let winCombination = '';
let green = '';

startGameButton.addEventListener('click', startGame)


function startGame(){ //

    startGameButton.innerText = 'Reiniciar';
    turnOf.innerText = "Vez de";
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    player1Cells = [];
    player2Cells = [];
    cells = 0;
    

   let winConditions = [
        [],
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        ['1','4','7'],
        ['2','5','8'],
        ['3','6','9'],
        ['1','5','9'],
        ['3','5','7']
    ]
    
    //testar um por um se fechar os 3 return

    function checkWin(){
        let verify = 0;
        cells++;
        if (winCombination === '') { 
            for (let i = 0; i < winConditions.length; i++) {
                verify = 0;
                for (let j = 0; j < winConditions[i].length; j++) {
                    if (currentPlayer == 'x' && player1Cells.includes(winConditions[i][j])) {   
                        verify++;
                        if(verify===3){
                            turnOf.innerText = "Vitória de";
                            player2 = player1;
                            playerName.innerText = player1;
                            winCombination = winConditions[i];
                            cells = 0;
                            }else if(cells === 9){
                                turnOf.innerText = "Empate";
                                playerName.innerText = "";
                            }else{
                                playerName.innerText = player2;
                            }
                        }   else if (currentPlayer == 'o' && player2Cells.includes(winConditions[i][j])) {   
                            verify++;
                            if(verify===3){
                            turnOf.innerText = "Vitória de";
                            player1 = player2;
                            playerName.innerText = player2;
                            winCombination = winConditions[i];
                            cells = 0;
                            }else if(cells === 9){
                                turnOf.innerText = "Empate";
                                playerName.innerText = "";
                            }else{
                                playerName.innerText = player1;
                            }
                        }  
                    }
                }
                if(winCombination!=''){
                    green = document.querySelectorAll('.cell')
                    for (let i = 0; i < winCombination.length; i++) {
                        green[winCombination[i]-1].style.color = 'chartreuse';
                    }
                    for (let i = 0; i < green.length; i++) {
                        green[i].classList.add('disabled')
                    }
                    
                }
            }
        }

    currentPlayer = 'x';
    playerName.innerText = player1;

    function swapPlayer() {
        if(currentPlayer === 'x'){
            currentPlayer = 'o';
        }else{
            currentPlayer = 'x';
        }
    }

    document.querySelectorAll('.cell').forEach(function(select){
        select.style.color = 'white';
        select.classList.remove('disabled')
        if (select.innerText != '') {
            select.innerText = '';
        }

        select.addEventListener('click', function vamo(ev){
            if(currentPlayer === 'x' && ev.target.innerText === ''){
                ev.target.innerText = 'x';
                player1Cells.push(ev.target.dataset.number)
                checkWin();
                swapPlayer();
            }else if(currentPlayer === 'o' && ev.target.innerText === ''){
                ev.target.innerText = 'o';
                player2Cells.push(ev.target.dataset.number);
                checkWin();
                swapPlayer();
            }
        } )

        // select.addEventListener('mouseover', function(ev){
        //     if(currentPlayer === 'x' && ev.target.innerText === ''){
        //         ev.target.innerText = 'x';
        //     }else if(currentPlayer === 'o' && ev.target.innerText === ''){
        //         ev.target.innerText = 'o';
        //     }
        // })

    })

    startGameButton.addEventListener('click', function restartGame(){
        green = '';
        winCombination = '';
        startGameButton.removeEventListener('click', restartGame)
        return;
    })
} //

