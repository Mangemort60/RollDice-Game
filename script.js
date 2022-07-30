
// Variable contenant les scores globaux
var globalScores; 
// Variable contenant les scores courant
var roundScore; 
// Variable contenant le joueur en cours
var currentPlayer;
// Variable contenant l'état de la partie
var gameIsPlaying;

// Appel de la fonction servant à initialiser la partie
init();

// Mise à zéro des scores courant, et globaux
document.querySelector('#globalScore-0').textContent = 0;
document.querySelector('#globalScore-1').textContent = 0;
document.querySelector('#roundScore-0').textContent = 0;
document.querySelector('#roundScore-1').textContent = 0;

// Son du lancé de dés
function diceSound() {
    let sound = new Audio('Audio/throwDice.mp3');
    sound.play();
}

// Son pour retenir le score courant
function holdSound() {
    let sound = new Audio('Audio/holdScore.mp3');
    sound.play()
}

// Son quand un joueur a gagné
function victorySound() {
    let sound = new Audio('Audio/victory.mp3');
    sound.play();
}

// Son quand un joueur sort le 1
function wrong() {
    let sound = new Audio('Audio/wrong.mp3');
    sound.play();
}





// Création d'un Event click sur le bouton rollDice
document.querySelector('#rollDice').addEventListener('click', function () {
    
    if (gameIsPlaying) { // Si la partie à bien commencée , donc que la variable gameIsPlaying = true

            
            
        

            document.querySelector('#dice').classList.add('shake'); // ajout d'une animation au dés lancé
            setTimeout("document.querySelector('#dice').classList.remove('shake')",500) // supprime au bout de 0.5s l'animation , afin que l'on puisse l'ajouter au prochain click.

            // Créer un nombre aléatoire pour le resultat du lancé
            var diceResult = Math.floor(Math.random() * 6) + 1;
            // Affichage de l'élément du DOM contenant les images de dés
            document.querySelector('#dice').style.display = "block"



            // Récupère les images de dés
            var img1 = document.querySelector('#dice1');
            var img2 = document.querySelector('#dice2');
            var img3 = document.querySelector('#dice3');
            var img4 = document.querySelector('#dice4');
            var img5 = document.querySelector('#dice5');
            var img6 = document.querySelector('#dice6');
            
            // Array contenant les images
            var imgArr = [img1, img2, img3, img4, img5, img6];


            // affiche la bonne face du dés selon le resultat du lancé
            if (diceResult == 1) {
                wrong()
                imgArr[0].style.display = "block"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 2) {
                diceSound();
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "block"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 3) {
                diceSound()                
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "block"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 4) {
                diceSound()                
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "block"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "none"
            } else if (diceResult == 5) {
                diceSound()                
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "block"
                imgArr[5].style.display = "none"
            } else {
                diceSound()
                imgArr[0].style.display = "none"
                imgArr[1].style.display = "none"
                imgArr[2].style.display = "none"
                imgArr[3].style.display = "none"
                imgArr[4].style.display = "none"
                imgArr[5].style.display = "block"


            }


            if (diceResult !== 1) {             // Si le resultat du lancé est compris entre 2 et 6 inclus
                roundScore += diceResult;       // On ajout le resultat du lancé au score courant
                document.querySelector("#roundScore-" + currentPlayer).textContent = roundScore; // On affiche le score courant sur le joueur actif
            } else {                            // Si le résultat du lancé est autre , donc 1                 
                document.querySelector('#dice').style.display = 'none'; // alors on fait disparaître les dés
                nextPlayer(); // et on passe au joueur suivant via cette fonction nextPlayer
            }

        }
    }

); // Fin de l'Event click pour lancer le dés


// Création d'un Event click sur le bouton hold
document.querySelector('#hold').addEventListener('click', function () {
    if (gameIsPlaying) { // Si la partie à bien commencée , donc que la variable gameIsPlaying = true
        globalScores[currentPlayer] += roundScore;  // On ajoute le score courant au score global du joueur actif
        document.querySelector('#globalScore-' + currentPlayer).textContent = globalScores[currentPlayer]; // Et on l'affiche
        document.querySelector('#roundScore-' + currentPlayer).textContent = 0; // On remet à zéro le score courant du joueur actif
        holdSound()

        if (globalScores[currentPlayer] >= 15) { // On vérifie si le joueur actif a gagné en atteighant un score global de 100   
            document.querySelector('#playerName-' + currentPlayer).textContent = " Winner!"; // Si c'est le cas on affiche le message de victoire à la place de son nom
            document.querySelector('#dice').style.display ='none'; // on fait disparaître le dés
            victorySound()
            document.querySelector('#playerName-'+currentPlayer).classList.add('winner');
            document.querySelector('#playerName-'+currentPlayer).classList.remove('active');
        } else { // Si le joueur actif n'a pas gagné on passe au joueur suivant
            nextPlayer();

        }


    }
});



function nextPlayer() { // Fonction pour passer au tour du joueur suivant

    document.querySelector('#dice').style.display = 'none';         // On fait disparaître le dés
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;    // Fonction ternaire pour changer de joueur actif
    roundScore = 0;
    // On remet à zéro les scores courant des joueurs
    document.getElementById('roundScore-0').textContent = 0;
    document.getElementById('roundScore-1').textContent = 0;

    document.querySelector('#playerName-0').classList.toggle('active');
    document.querySelector('#playerName-1').classList.toggle('active');

}


// Création d'un Event click pour réinitialiser une nouvelle partie
document.querySelector('#newGameButton').addEventListener('click', init);

function init() {
    gameIsPlaying = true;   // état de la partie 
    globalScores = [0, 0];  // scores globaux initialisé à zéro
    currentPlayer = 0;      // joueur 1 et le joueur actif par défaut  
    roundScore = 0;         // scores courant initialisé à zéro
    

    document.querySelector('#dice').style.display = "none" // On fait disparaître le dés

    // affiche les scores courant et globaux réinitialisés à zéro
    document.getElementById('globalScore-0').textContent = 0;
    document.getElementById('globalScore-1').textContent =  0;
    document.getElementById('roundScore-0').textContent = 0;
    document.getElementById('roundScore-1').textContent = 0;

    // affiche les noms des joueurs
    document.getElementById('playerName-0').textContent = 'Player 1';
    document.getElementById('playerName-1').textContent = 'Player 2';

    document.querySelector('#playerName-0').classList.remove('winner');
    document.querySelector('#playerName-1').classList.remove('winner');
    document.querySelector('#playerName-0').classList.remove('active');
    document.querySelector('#playerName-1').classList.remove('active');
    document.querySelector('#playerName-0').classList.add('active'); 


    // // // Mise en surbrillance du joueur 1 qui est le joueur actif par défaut
    // document.getElementById('playerName-0').classList.add('active')
    // document.getElementById('playerName-1').classList.remove('active')


    
}
