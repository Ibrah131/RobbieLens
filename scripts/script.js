/*********** Game words ***********/


//////////////////////Fct n-1 launch mini game mots/phrases,  to check answer, calculate score, display current score with a msg
    function fctlaunchminigame (liste, choix){ //ex fctlancerBoucleDeJeu
        document.querySelector(".zoneInstruction").innerHTML =  `<b> Ecrivez le texte que vous voyez au-dessus ci-dessous : </b>`;
        document.querySelector(".zoneDebutpartie").innerHTML = `<b>===== Début de la partie "<b>${choix}</b>" =====</b>`; 

        //Compteur :
            /**function updateCounter() { // Function to update the counter display
                let seconds = 0;
                seconds++; // Increment the counter every second
                dcument.querySelector('.counter').innerHTML = `Compteur: ${seconds}`; // Update the displayed counter
            }
            setInterval(updateCounter, 1000);         // Start the fct and update th result every second - 1000 milliseconds = 1 second 
            **/

        let Score = 0; // initialiser le score à zéro pour chaque session de jeu pour commencer a rajouter le score apres
        let i = 0; //pour lancer le 1er mot (apres choix) et avant click "Envoyer"
        document.getElementById("zoneProposition").innerHTML = liste[0]; //proposer le premier mot de la liste

        document.querySelector(".zonegrdform .cta").addEventListener("click", () => { //répéter l'intérieur a chaque fois qu'il clique sur Envoyer!
            //console.log("yes cliqué");

      


            for (let j = 0; j < document.querySelectorAll(".zoneChoix input").length; j++) { //Disable the radio btns after 1st turn/Envoyé!
                document.querySelectorAll(".zoneChoix input")[j].disabled = true;
            }

            if (i < liste.length -1){  // Avant le dernier tour/mot
                motUtilisateur = document.querySelector(".zoneinputtxt").value;  //Ramene la valeur écrite dans l'élement input avec cette classe (le mot Envoyé)
                //console.log(motUtilisateur);

                if (motUtilisateur === "no") { 
                    Score = fctTestscoremsgt(motUtilisateur, liste, i, Score); //fct Tester le mot entré calcule score et afficher msg a t
                    document.querySelector(".zonegrdform .cta").disabled = true; //btn off
                    document.querySelector(".zoneFinpartie").innerHTML = `<b>===== Fin de la partie "<b>${choix}</b>" =====</b>`; 
                    fctafficherResultatf(liste, Score);
                    console.log('fin no');
                    //Rejouer:
                        document.querySelector(".zonegrdform .cta").disabled = false; //Reactive btn
                        document.querySelector(".zonegrdform .cta").innerHTML = `Rejouer !`;
                        document.querySelector(".zonegrdform .cta").onclick = function() { //Refresh page on click only!
                            location.reload();
                        };
                }
                else { // Tant que le joueur n'a pas choisi "no"
                    Score = fctTestscoremsgt(motUtilisateur, liste, i, Score); //fct Tester mot entré calcule score et afficher msg a t
                    i +=1;
                    document.querySelector(".zoneinputtxt").value = ''; // remettre le champ d'input/d'écrire vide x)
                    document.getElementById("zoneProposition").innerHTML = liste[i];
                }
                

            }
            else if (i === liste.length -1){ // Au dernier tour/mot, pour arrété la partie après : 
                motUtilisateur = document.querySelector(".zoneinputtxt").value;  //Ramene la derniere valeur écrite dans l'élement input avec cette classe (le mot Envoyé)
                //console.log(motUtilisateur);
                Score = fctTestscoremsgt(motUtilisateur, liste, i, Score); //fct Tester le mot entré calcule score et afficher msg a t

                document.querySelector(".zonegrdform .cta").disabled = true; // disactive le btn au dernier click apres avoir envoyé le score du dernier mot entré
                document.getElementById("zoneProposition").innerHTML = '- Partie terminée! -';

                document.querySelector(".zoneFinpartie").innerHTML = `<b>===== Fin de la partie "<b>${choix}</b>" =====</b>`; 
                fctafficherResultatf(liste, Score);

                  //Rejouer:
                  document.querySelector(".zonegrdform .cta").disabled = false; //Reactive btn
                  document.querySelector(".zonegrdform .cta").innerHTML = `Rejouer !`;
                  document.querySelector(".zonegrdform .cta").onclick = function() {
                      location.reload();
                  };

            }
        });

        return [Score, liste.length -1]; //exit fct returning the final value to use it to print final msg


    }

        // Function n-2
        function fctTestscoremsgt (motUtilisateur, liste, i, Scoret){ 
    
            switch (true) {  //compare le mot Envoyé, maj le score, ecrire le msg(t). 
                    case motUtilisateur === liste[i]  :
                        Scoret += 1;
                        document.querySelector(".zoneScore").innerHTML = `Votre score est de ${Scoret} / <b> ${liste.length} </b>`
                        fctMsgt(liste.length, Scoret);  // write in html the msg t here with the score t / total qsts
                        return Scoret; // exit switch

                    default:
                        switch (true) {
                            case motUtilisateur.toLowerCase() === "no":
                                document.querySelector(".zoneScore").innerHTML = `Votre score est de ${Scoret} / <b> ${liste.length} </b>`
                                document.querySelector(".zoneMsg").innerHTML=`Vous avez choisi de quitter la partie.`; 
                                return Scoret;  // Exit fct and Return the current score to be used elsewhere // can it return as return [Scoret, motUtilisateur]; ?
                    
                            case motUtilisateur === "Gredin":
                            case motUtilisateur === "Mécréant":
                                document.querySelector(".zoneScore").innerHTML = `Votre score est de ${Scoret} / <b> ${liste.length} </b>`
                                document.querySelector(".zoneMsg").innerHTML = "Restez correct !";
                                return Scoret; 
                    
                            case motUtilisateur === "Vilain":
                                document.querySelector(".zoneScore").innerHTML = `Votre score est de ${Scoret} / <b> ${liste.length} </b>`
                                document.querySelector(".zoneMsg").innerHTML = "Soyez gentil !";
                                return Scoret;
                    
                            default: //n'imp quel autre mot entré/faute de frappe
                                document.querySelector(".zoneScore").innerHTML = `Votre score est de ${Scoret} / <b> ${liste.length} </b>`
                                document.querySelector(".zoneMsg").innerHTML = "Vous avez fait une erreur de frappe." ;
                                return Scoret;
                        }
            }
        }

            // Function n-3 to Display current score after each correct answer (scoreloc>0)
            function fctMsgt(liste_length, scoreloc) {
                switch (true) {
                    case scoreloc === liste_length:
                        document.querySelector(".zoneMsg").innerHTML = `<span class="JSspanParfait"><b>Parfait !</b></span> Super score. C'était le dernier tour.`; 
                        break;
                
                    case scoreloc > liste_length / 2:
                        document.querySelector(".zoneMsg").innerHTML=`<span class="JSspanBien"><b>Bien.</b></span> Bon score.`;
                        break;
                
                    case scoreloc > 0:
                        document.querySelector(".zoneMsg").innerHTML=`<span class="JSspanPM">Pas mal.</span> Score moyen.`;
                        break;
                }
                return;
            }



    // Function n-1 to display the final result (! 2add : case sth like && motUtilisateur ="no" display the msg "vous avez quitté..." the others are && motUtilisateur !="no")
    function fctafficherResultatf(liste, Scoref) {
        let totalQuestions = liste.length; //just totalQuestions = liste.length; is a global variable but meh
        switch (true) {
            case Scoref === totalQuestions: // [0] cuz it returned as array the score and potentially the "no"
                document.querySelector(".zoneMsgfinal").innerHTML = `<span class="JSspanParfait"><b>Parfait ! Félécitation. Votre resultat final est de: <b>${Scoref}</b> / <b>${totalQuestions}</b>.</b></span>`; 
                break;
        
            case Scoref > totalQuestions / 2:
                document.querySelector(".zoneMsgfinal").innerHTML = `<span class="JSspanBien"><b>Bien. Votre resultat final est de: <b>${Scoref}</b> / <b>${totalQuestions}</b>.</b></span>`; 
                break;
        
            case Scoref > 0:
                document.querySelector(".zoneMsgfinal").innerHTML = `<span class="JSspanPM">Pas mal.Votre resultat final est de: <b>${Scoref}</b> / <b>${totalQuestions}</b>.</span>`; 
                break;

            case Scoref === 0:
                document.querySelector(".zoneMsgfinal").innerHTML = `Merci d'avoir jouer, à bientot!`; //2add : case `Vous avez décider de quitté la partie, à bientot!`
                break;
        
            default: // impossible choice ... ((((case Scoref === "no" comes here x) cuz the returned value for Scoref=fctlancerBoucleDeJeu was motUtilisateur ==="no" case but can't display his last score x) ))))
                document.querySelector(".zoneMsgfinal").innerHTML = `Eeh à bientot! Votre resultat final était de : <b>${Scoref}</b> / <b>${totalQuestions}</b>.`;
                break;
            }
    }

/////////////////// Function n Main words

function fctmainwords(listeMots, listePhrases) {


    let Radiolist = document.querySelectorAll(".zoneChoix input");     // Get all radios input elements within .zoneChoix

    for (let i = 0; i < Radiolist.length; i++) {     // attach addeventlistener to each radio input element (Loop through all the input elements to Add event listeners )
        Radiolist[i].addEventListener("change", function() { //wait for the "change", continue only if true (radio checked)
            console.log(`you cheked element j=${i}  ${Radiolist[i].value} `);
            let applyStyle = false;

            switch (Radiolist[i].value) {  //check which radio, by testing the value of the checked input if it's mots or phrases
                case 'mots': //  If the value of the selected input is 'mots', assign the array listeMots to the variable liste.
                    
                    choix = 'Mots';
                    fctlaunchminigame(listeMots, choix);

                    break;
                case 'phrases':
                    
                    choix = 'Phrases';
                    fctlaunchminigame(listePhrases, choix);
                    break;
                case 'RPG':
                    applyStyle = true;
                    choix='RPG';
                    fctlaunchRPG()
                    break;
            }

             // Apply styles if applyStyle is true
             if (applyStyle) {
                fctsetstyle(applyStyle);  // Call fctsetstyle with the applyStyle boolean
            }

            /*if (liste) { //if (liste = true), checks whether the 'liste' variable is truthy (exist(!) = succeded the previous if > launches the game otherwise no). (means liste is not equal to : null, undefined, 0, "" (empty string), NaN, and false. cuz in this case it would return false)
                fctlaunchminigame(liste, choix); // Launch the game with the selected list
            }*/
        });
    }
}





    /*********************************************/
    /*********************************************/
    /***************** Game RPG *****************/
    /*********************************************/
    /*********************************************/

    /*

    // Global variable
    let playerHealth = 100;

            /////// Function n-3 : Switch Function
            function switchFunction(action) {
                let result; // Local variable
                switch (action) {
                    case 'attack':
                        result = "You attack the enemy!";
                        playerHealth -= 10; // Modify global variable
                        break;
                    case 'defend':
                        result = "You defend yourself!";
                        playerHealth += 5; // Modify global variable
                        break;
                    case 'run':
                        result = "You try to run away!";
                        break;

                    case 'exit':
                        result = "You exited game!";
                        break; // Exit the loop if play chooses 

                    default:
                        result = "Invalid action.";
                }
                return result; // Return value to the calling function
            }

        ////// Function n-2 : Loop Function
        function loopFunction() {
            let action = '';
            while (playerHealth != 0 ) { // Local variable 'i'
                action = document.getElementById("zoneProposition").innerHTML = ("Choose your action: attack, defend, run, exit"); // Simple user interaction

                let result = switchFunction(action); // Call switchFunction
                document.querySelector(".zoneinputtxt").value = ''; // remettre le champ d'input/d'écrire vide x)
                document.getElementById("zoneProposition").innerHTML = ("Choose your action: attack, defend, run, exit") ;

                document.querySelector(".zoneScore").innerHTML = playerHealth; 
                document.querySelector(".zoneMsg").innerHTML = result; 


                if (playerHealth <= 0) {
                    console.log("Game Over!");
                    break; // Exit the loop if player health is 0 or less
                }

                if (action === 'exit') {
                    console.log("Game Over!");
                    break; // Exit the loop if play chooses 
                }
            }
        }
    */


    // fct n-1 set style
    function fctsetstyle(applyStyle){
        //document.querySelector(".contjeu").style.backgroundColor = 'rgb(57, 159, 199)';
        //document.querySelector(".zonegrdform .cta").style.color = 'rgb(57, 159, 199)';
        //document.querySelector(".zoneShare .cta").style.color = 'rgb(57, 159, 199)';
        //document.getElementById("RPG").classList.add('custom-accent');
        //document.querySelector(".zonegrdform .cta").classList.add('');
           const styleId = 'dynamic-styles'; // Unique ID for the style element
    let existingStyle = document.getElementById(styleId);

    // Define the style content
    const styleContent = `
        .contjeu {
            background: rgb(57, 159, 199);
        }
        .zonegrdform .cta {
            color: rgb(57, 159, 199);
        }
        .zoneShare .cta {
            color: rgb(57, 159, 199);
        }
        #RPG {
            accent-color: rgb(57, 159, 199);
        }
        .gamesection h1, .gamesection h2, .gamesection h3 { 
            color: rgb(57, 159, 199); 
        }
        .contjeu .cta:hover {
            color: rgb(255, 255, 255) !important;
            background: rgb(57, 159, 199);
        }
        .copyright div {
            color: rgb(255, 255, 255);
            background: rgb(57, 159, 199);
        }
    `;

    if (applyStyle) {
        if (!existingStyle) {
            // Create and append the style element if it does not exist
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = styleContent;
            document.head.appendChild(style);
        }
    } else {
        if (existingStyle) {
            // Remove the style element if it exists
            document.head.removeChild(existingStyle);
        }
    }
}

    /////////// Function n-1 launch RPG
    function fctlaunchRPG() {
        document.querySelector(".zoneDebutpartie").innerHTML = `<b>===== Début de la partie "<b>${choix}</b>" =====</b>`; 
        document.getElementById("zoneProposition").innerHTML =  `<b> Ecrivez: start ou exit(Soon!) </b>`;
        /////Styles - add custom colors, change later to a theme changer :
        ///**fctsetstyle ();**///
        ////////////////////

        document.querySelector(".zonegrdform .cta").addEventListener("click", () => {
            
            for (let j = 0; j < document.querySelectorAll(".zoneChoix input").length; j++) { //Disable the radio btns after 1st turn/Envoyé!
                document.querySelectorAll(".zoneChoix input")[j].disabled = true;
            }


            let gameChoice = document.querySelector(".zoneinputtxt").value;  //Ramene la valeur écrite dans l'élement input avec cette classe (le mot Envoyé)

            switch (gameChoice) {
                case 'start':
                    console.log("Game Started");



                    loopFunction(); // Start the game loop
                    break;
                case 'exit':
                    console.log("Game Exited");



                    return; // Exit the program
                default:
                    console.log("Invalid choice.");
                    fctlaunchRPG(); // Retry the main switch function
            }



            // let gameChoice = prompt("Choose your game: 1 - Start Game, 2 - Exit");
    
        });

    }




    /*

            
            Score = fctTestscoremsgt(motUtilisateur, liste, i, Score); //fct Tester mot entré calcule score et afficher msg a t
            i +=1;

    */


///////////////// bckup /////////////////////////

/********* 
 


 
 
*********/
