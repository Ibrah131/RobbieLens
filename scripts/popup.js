/////////////// Share score réalisé Pop up:
function fctgererpopup() {
        //////regex fcts pour tester la validité des champs, lancer les exception en cas d'invalidité : !!!! corriger et rajouter si champ vide dans le regex!!
        function fctvaliderNom (){ // avec Regex et les try throw catch
            let regexnom = new RegExp("^[a-zA-Z]+$"); //test regex de nom, il return true ou false

            if ((document.querySelector(".popup .nom").value) === "") {
                throw new Error(`Le champ Nom est vide`)
            }

            if(!regexnom.test(document.querySelector(".popup .nom").value)){  // si test nom revient false
                console.log(regexnom.test(document.querySelector(".popup .nom").value)); // Affichera en console log false.
                throw new Error ("Nom invalide (regex)")
            }

            (regexnom.test(document.querySelector(".popup .nom").value)); // Affichera true.
        
        }


        /*
        function fctvaliderNom (){ //avec Regex et les if affiche true
            let regexnom = new RegExp("^[a-zA-Z]+$"); //test regex de nom

            regexnom.test(document.querySelector(".popup .nom").value);


            if (regexnom.test(document.querySelector(".popup .nom").value)){ //if true
            console.log(regexnom.test(document.querySelector(".popup .nom").value)); // Affichera true.
            console.log("Le nom est : "+document.querySelector(".popup .nom").value); //affiche email
            }else{
            console.log(regexnom.test(document.querySelector(".popup .nom").value)); // Affichera false.
            console.log(`Le nom "${document.querySelector(".popup .nom").value}" est invalide`); //affiche email

            }
        }
        */



        function fctvaliderEmail() { //avec Regex et if
            let regexemail = new RegExp("^[a-zA-Z]{1,10}[0-9]{0,8}[.-_]{0,4}[a-zA-Z]{0,10}@[a-zA-Z]+\.[a-zA-Z]{2,5}$"); //test regex de nom

            if (document.querySelector(".popup .email").value === "") { //si champ email vide
                throw new Error(`Le champ email est vide`)
            
            }

            if (!regexemail.test(document.querySelector(".popup .email").value)){ //if le teste regex sur la valeur de champ email est false
                console.log(regexemail.test(document.querySelector(".popup .email").value)); // Affichera en console log false.
                throw new Error("L'email est invalide.")

            }
            console.log(regexemail.test(document.querySelector(".popup .email").value)); // Affichera true.
    
        }


        ///////////Envoyer l'email après tests reussis
        /**
         * Cette fonction construit et affiche l'email. 
         * @param {string} nom : le nom du joueur
         * @param {string} email : l'email de la personne avec qui il veut partager son score
         * @param {string} scoreFinal : le score. 
         */
        
        function fctafficherEmail() {
            let [scoreFinal, total] = fctmainwords(listeMots, listePhrases) //prendre le score pour l'utiliser dans le popup
            scoreEmail= `${scoreFinal} / ${total}`
            let nom = document.getElementById("nom").value
            let email = document.getElementById("email").value

            let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${scoreEmail} sur le site d'Azertype !`
            location.href = mailto
        }

            
    //////// Gérer le formulaire partager, essayer/tester si champs return vrai, sinon capturer les erreurs/exceptions des champs dans le catch (qui sont lancées par les throws)
    function fctgererFormulaire (){ //fct qui fait le test des champs (nom, email) du form et, s'ils sont true, envoyer l'email au click
        // Désactiver le bouton par défaut (avec une classe CSS au lieu de disabled)
        document.querySelector(".popup .cta").classList.add("disabled");



        document.querySelector(".popup form").addEventListener("change", () => { //essayer/tester les champs au changement
            try {
                fctvaliderNom ()
        
                fctvaliderEmail ()

                document.querySelector(".popup .cta").classList.remove("disabled"); //si réussi (re)active le btn submit (on pt mettre un css) et sort de l'evenement
                document.querySelector(".errorMsg").innerHTML = ``

            } catch (erreur) { //si l'un des tests des champs return false (echoue), le catch prend relais/capture les exceptions
                document.querySelector(".popup .cta").classList.add("disabled"); //redesactive ou laisse desactiver si test au changement echoue
                document.querySelector(".errorMsg").innerHTML = `/!\\ Une erreur est survenue : ${erreur.message}`
            }
        });
        

        document.querySelector(".popup .cta").addEventListener("click", (event) => {
            if (document.querySelector(".popup .cta").classList.contains("disabled")) { //si on click directe sans que le btn ne soit activé x)
                event.preventDefault(); // Empêche toute action du submit (envoi formulaire, rafraichir la page...)
                document.querySelector(".errorMsg").innerHTML = `/!\\ Impossible d'envoyer, les champs ne sont pas remplis correctement.`


            } else { //apres test réussi et btn activer ecouter l'envoi et envoyé l'email
                document.querySelector(".popup .cta").classList.remove("disabled");
                document.querySelector(".errorMsg").innerHTML = ``
                fctafficherEmail(); 
            }
        });


    }


    /////afficher popup car btn deja cliqué
    document.querySelector(".contpopup").classList.add('visible'); // Adds this css class to make it visible with a transition  

    //fermer popup
    document.querySelector(".closingX").addEventListener("click", () => { //Ecoute le click sur le btn X
        document.querySelector(".contpopup").classList.remove('visible');  //cacher (enlever la class avec visibility: visible;)
    });
    document.addEventListener("click", (event) => { //ajouter un déclencheur d'évenement au document pour y écouter le "click" dessus, suivant une condition/fonction au parametre (event) (ici les elements html a pas clicker)  et met l'action (ici cacher popup)
        if (!document.querySelector(".zoneShare .cta").contains(event.target) && !document.querySelector(".contpopup").contains(event.target) && !document.querySelector(".contpopup .cta").contains(event.target)) { //le declencheur de l'évenement cible tt le documente i.e meme le btn partager donc il est rajouter aux conditions // If you click anywhere outside the popup and not on the or the Partager btn, or Envoyer btn, or the popup :
        document.querySelector(".contpopup").classList.remove('visible'); //cacher 
        }
    });

    ////////////// Envoi email
    fctgererFormulaire ();

/*
    ^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z]+\.[a-zA-Z]{2,5}$

    ^[a-zA-Z](?=[a-zA-Z0-9._-]{0,18}$)(?=[^0-9]*[0-9]{0,9}[^0-9]*$)(?=[^.\\-_]*[.-_]{0,5}[^.\\-_]*$)[a-zA-Z0-9._-]*@[a-zA-Z]+\.[a-zA-Z]{2,5}$
*/
    


}
