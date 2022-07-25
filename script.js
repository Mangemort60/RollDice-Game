var globalScores, roundScore, currentPlayer, gameIsPlaying;

init();


document.querySelector('#globalScore-0').textContent = 0;
document.querySelector('#globalScore-1').textContent = 0;
document.querySelector('#roundScore-0').textContent = 0;
document.querySelector('#roundScore-1').textContent = 0;

document.querySelector('#rollDice').addEventListener('click', function () {

        if (gameIsPlaying) {


            
            // crée un nombre aléatoire pour le resultat du lancé
            var diceResult = Math.floor(Math.random() * 6) + 1;
            console.log("lancé : " + diceResult);
            document.querySelector('#dice').style.display = "block"
            

            // récupère les images de dés
            var img1 = document.querySelector('#dice1');
            var img2 = document.querySelector('#dice2');
            var img3 = document.querySelector('#dice3');
            var img4 = document.querySelector('#dice4');
            var img5 = document.querySelector('#dice5');
            var img6 = document.querySelector('#dice6');

            var imgArr = [img1, img2, img3, img4, img5, img6];

            // affiche la bonne face du dés selon le resultat du lancé
            if (diceResult == 1) {
                imgArr[0].style.display = "block"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 2) {
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "block"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 3) {
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "block"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 4) {
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "block"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 5) {
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "block"
                imgArr[5].style.display = "none"
            } else {
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "block"


            }

            if (diceResult !== 1) {
                roundScore += diceResult;
                document.querySelector("#roundScore-" + currentPlayer).textContent = roundScore;


            } else {
                // next player 
                document.querySelector('#dice').style.display = 'none';


                nextPlayer();




            }

        }
    }

);

document.querySelector('#hold').addEventListener('click', function () {
    console.log("currentPlayer : " + currentPlayer)
    if (gameIsPlaying) {
        // ADD current score to global score 
        globalScores[currentPlayer] += roundScore;
        // update the UI
        document.querySelector('#globalScore-' + currentPlayer).textContent = globalScores[currentPlayer];
        document.querySelector('#roundScore-' + currentPlayer).textContent = 0;
        console.log("currentPlayer : " + currentPlayer)
//// !!! currentPlayer ne change pas. !!!!

        //check if player won the game 
        if (globalScores[currentPlayer] >= 100) {
            console.log("currentPlayer : " + currentPlayer)
            document.querySelector('#playerName-' + currentPlayer).textContent = " Winner!";
            document.querySelector('#playerName-' + currentPlayer).textContent = " Winner!";
            document.querySelector('#dice').style.display ='none';
            
            // document.querySelector('#playerName-' + currentPlayer + '-panel').classList.add('winner');
            // document.querySelector('#playerName-' + currentPlayer + '-panel').classList.remove('active');
        } else {
            nextPlayer();

        }


    }
});



function nextPlayer() {

    document.querySelector('#dice').style.display = 'none';
    console.log("currentPlayer : " + currentPlayer);
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;
    document.getElementById('roundScore-0').textContent = 0;
    document.getElementById('roundScore-1').textContent = 0;
    document.getElementById('playerName-0').classList.toggle('active')
    document.getElementById('playerName-1').classList.toggle('active')




}


document.querySelector('#newGameButton').addEventListener('click', init);

function init() {
    gameIsPlaying = true;
    globalScores = [0, 0];
    currentPlayer = 0;
    roundScore = 0;
    

    document.querySelector('#dice').style.display = "none"

    document.getElementById('globalScore-0').textContent = 0;
    document.getElementById('globalScore-1').textContent =  0;
    document.getElementById('roundScore-0').textContent = 0;
    document.getElementById('roundScore-1').textContent = 0;

    document.getElementById('playerName-0').textContent = 'Player 1';
    document.getElementById('playerName-1').textContent = 'Player 2';

    document.getElementById('playerName-0').classList.add('active')
    document.getElementById('playerName-1').classList.remove('active')


    
}
