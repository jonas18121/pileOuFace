'use strict';

///////////////// variable

let pseudo, meilleurScore;
let score = 0;

///////////////// fonction

/**
 * retourne un nombre aléatoire comprit entre les nombres entrer
 * en paramettre min et max 
 * 
 * @author L.Jonathan 
 * @param {number} min nombre minimun
 * @param {number} max nombre maximun
 * 
 * @returns {number} result
 */
function rand2(min, max) {
    let result = Math.round(Math.random() * (max - min)) + min;
    return result;
}

/**
 * demander le pseudonyme à l'utilisateur
 * 
 * @author L.Jonathan 
 * @returns string
 */
function demandePseudo() {
    return prompt('Entrez votre pseudo : ');
}

/**
 * compte le nombre de voyelle compris dans le mot
 * 
 * @author L.Jonathan 
 * @param {string} word le mot qui sera compter
 * @returns {number} voyelle - le nombre de voyelle compris dans le mot
 */
function compteVoyelles(word) {
    let voyelle = word.replace(/[^aeiouy]/ig, '').length;
    return voyelle;
}

console.log(compteVoyelles('a ll'));

/**
 *  renvoie 1 en cas de pile et 0 en cas de face
 * 
 * @author L.Jonathan 
 * @returns {number} 0 = face ou 1 = pile
 */
function pileOuFace() {
    let rand = rand2(0,1)
    return rand;
}

/**
 * Demande au joueur de choisir 1 (pile) ou 0 (face)
 * Teste que la saisie du joueur soit bien égal à 0 ou 1
 * Lance aléatoirement une pièce
 * Renvoie vrai si le joueur a correctement deviné, faux sinon
 * 
 * @author L.Jonathan 
 * @returns {boolean} true|false
 */
function lancerPileOuFace() {
    let choixUser = parseInt(prompt(' choisissez entre 1 (pile) ou 0 (face) : '));

    while (isNaN(choixUser)) {
        choixUser = parseInt(prompt('Entrez un chiffre entre 1 (pile) ou 0 (face) : '));
    }
    
    let ordi = pileOuFace();
    console.log('Moi : ' + choixUser + ' VS ' + ordi + ' Ordi');

    if (choixUser === ordi) 
    {
        return true;
    }
    else{
        return false;
    }
}

/**
 * Le joueur démarre avec 3 chances
 * Le joueur démarre avec un score à 0
 * Tant que le joueur possède des chances, il peut retenter un lancer
 * Si le joueur gagne un lancer, son score augmente, sinon ses chances baissent
 * 
 * @author L.Jonathan 
 * @param {string} pseudo le nom du joeur
 * 
 * @returns {boolean} true|false
 */
function jeuPileOuFace(pseudo, score) {
    let chances = 3, /** score = 0, **/ win = false, loser = false;

    chances = compteVoyelles(pseudo);
    alert('Selon le nombre de voyelles que vous avez dans vous nom, vous avez ' + chances + ' chances');

    

    while (!win || !loser) 
    {
        let PileOuFace = lancerPileOuFace();
        
        if (PileOuFace === true) 
        {
            //score++;
            score = scoreUser(score);
            console.log(pseudo + ' voici votre score : ' + score);
        }
        else if (PileOuFace === false) 
        {
            //chances--;
            chances = chanceUser(chances);
            console.log(pseudo + ' voici vos chances restant : ' + chances);
            
            if (chances <= 0 && score >= 2) 
            {
                console.log('Vous avez gagné ' + pseudo + ' ! ');
                console.log(pseudo + ' voici votre score : ' + score);
                win = true;
                break;
            }
            else if (chances <= 0 && score < 2) 
            {
                console.log(pseudo + ' vous avez perdu ' + pseudo + ' ! ');
                console.log(pseudo + ' voici votre score : ' + score);
                loser = true;
                break;
            }
        } 
    }
    meilleurScore = meilleurScor(score); 
    console.log(meilleurScore); 
}

function scoreUser(score){
    return ++score;
}

function chanceUser(chances) {
    return --chances;
}

function meilleurScor(score)
{
    if(score > meilleurScore )
    {
        meilleurScore = score;
        console.log('voici votre nouveau meilleure score : ' + meilleurScore);
        return 'voici votre nouveau meilleure score : ' + meilleurScore;
    }
    else
    {
        console.log('votre meilleure score ' + meilleurScore);
        return 'votre meilleure score ' + meilleurScore;
    }
}

/**
 * langer le jeu
 * 
 * @author L.Jonathan 
 * @param {strin} pseudo nom du joueur
 * @returns true|false
 */
function go (pseudo) 
{
    let confirme;
    
    if(pseudo != null){
        confirme = confirm('voulez vous commencez le jeu ' + pseudo  +' ?');
    }
    else{
        confirme  = confirm('voulez vous commencez le jeu ?');
    }
    
    if(confirme === true)
    {
        
        let jeu = jeuPileOuFace(pseudo, score);

        if (jeu) {
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return '';
    }
}

/**
 * la fonction lancée par votre code et appellera toutes les autres
 * 
 * @author L.Jonathan 
 * @returns true|false
 */
function main() {
    pseudo = demandePseudo();
    meilleurScore = 0;
    return go(pseudo); 
}

///////////////// programme


main();