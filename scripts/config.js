//words game config
const listeMots = ["Cachalot", "Pétunia", "Serviette"];
const listePhrases = ["hey cava", "slt pote", "tres bien"];

//RPG game config











/******** Courses ***********/

/*
      //Classe : class Personne {...}  Une classe est une structure de base qui permet de créer des objets avec des propriétés et des méthodes.	
      // Classe constructeur :  méthode spéciale  pour initialiser les objets.
      // Constructeur dans une classe
      class Personne {
        // Le constructeur : Dans une classe, le constructeur est une méthode spéciale appelée constructor. C'est la première méthode appelée lors de la création d'une nouvelle instance de la classe avec new.
        constructor(nom, age) { 
            this.nom = nom; // Définit la propriété 'nom' de l'objet
            this.age = age; // Définit la propriété 'age' de l'objet
        }
        let personne1 = new Personne("Alice", 25);
        console.log(personne1.nom); // "Alice"
    
        /// Créer Une méthode de la classe // Fonction de Classe : 
        sePresenter() {
            console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
        }
      }
      // Création d'une nouvelle instance  (instanciation d'une nouvelle personne) : une instance est un objet créé à partir d'une classe (ou d'une fonction constructeur avant ES6). c'est une copie spécifique de cette classe avec ses propres propriétés et méthodes.
      let personne2 = new Personne("Carla", 28);
      personne2.sePresenter(); // Bonjour, je m'appelle Carla et j'ai 28 ans.


      // Héritage : création d'une classe enfant avec extends 
      class Etudiant extends Personne { // hérite de  Personne
          constructor(nom, age, cours) {
              super(nom, age); // Appel au constructeur parent avec super
              this.cours = cours;
          }

          /// Méthode supplémentaire pour l'étudiant
          suivreCours() {
              console.log(`${this.nom} suit le cours de ${this.cours}.`);
          }
      }

      // Instanciation d'un étudiant
      let etudiant3 = new Etudiant("Bob", 22, "Mathématiques");  // On crée une instance etudiant3 de la classe Etudiant, qui hérite de Personne.
      etudiant3.suivreCours(); // Bob suit le cours de Mathématiques.

      etudiant3.sePresenter(); // Bonjour, je m'appelle Bob et j'ai 22 ans. 


    //Fonction :  function Personne(nom, age) {...} Une fonction est un bloc de code qui peut être exécuté pour accomplir une tâche spécifique.
    // Fonction Constructeur	: Fonction spéciale utilisée pour initialiser les objets lors de la création d'une nouvelle instance avec new. Définit les propriétés de l'objet.	Usage : Création d'objets avec des propriétés spécifiques.
    // Consctructeur dans une fonction
    // Avant l'introduction des classes en ES6, les fonctions étaient utilisées pour créer des objets en tant que fonctions constructrices. Lorsque vous utilisez une fonction avec l'opérateur new, la fonction agit comme un constructeur. Par convention, ces fonctions sont généralement nommées avec une majuscule.
    function Personne(nom, age) {
        this.nom = nom;
        this.age = age;
    }
    let personne1 = new Personne("Alice", 25);
    console.log(personne1.nom); // "Alice"

    /// On peut Ajouter une méthode de fonction, sePresenter, au prototype de la fonction Constructeur Personne avec .prototype
    Personne.prototype.sePresenter = function() {
        console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
    };
    // Création d'une nouvelle instance
    let personne2 = new Personne("Carla", 28);
    personne2.sePresenter(); // Bonjour, je m'appelle Carla et j'ai 28 ans.
    

    // Héritage : création d'une fonction constructeur enfant (fct héritée) avec .call
    function Etudiant(nom, age, cours) {
        Personne.call(this, nom, age); // Appel au constructeur parent avec call
        this.cours = cours; //ajouter (la propriété?) cours avec ".".
    }
    // Configuration de l'héritage du prototype avec Object.create : création d'objet qui aura ce prototype / création d'objet a utiliser comme prototype
    Etudiant.prototype = Object.create(Personne.prototype);
    Etudiant.prototype.constructor = Etudiant;

    /// Ajout d'une méthode spécifique à Etudiant
    Etudiant.prototype.suivreCours = function() {
        console.log(`${this.nom} suit le cours de ${this.cours}.`);
    };

    // Instanciation d'un étudiant
    let etudiant3 = new Etudiant("Bob", 22, "Mathématiques");
    etudiant3.suivreCours(); // Bob suit le cours de Mathématiques.


    etudiant3.sePresenter(); // Bonjour, je m'appelle Bob et j'ai 22 ans.


    // Fonction générateur : Fonction qui peut être interrompue et reprise, retourne un itérateur avec la capacité de gérer les pauses dans l'exécution à l'aide de yield.	
    function* generateur() {
    yield 1;
    yield 2;
    yield 3;
    }
    let gen = generateur();
    gen.next(); // { value: 1, done: false }

    // Fonction de Classe (Méthode)	
    class Personne {
    constructor(nom, age) {
    this.nom = nom;
    this.age = age
    }
    sePresenter() {
    console.log(...)
    }
    }	
    // Fonction Récursive	: Fonction qui s'appelle elle-même jusqu'à ce qu'une condition d'arrêt soit remplie.
    function factorielle(n) {
    if (n === 0) return 1;
    return n * factorielle(n - 1);
    }
    factorielle(5); // 120<br></br>


    // Fonction Asynchrone	: Fonction qui permet d'exécuter du code de manière asynchrone, en utilisant async et await pour simplifier la gestion des promesses.	
    // Usage: Gérer des opérations asynchrones comme des requêtes réseau ou des opérations de base de données.

    async function obtenirDonnees() {
    let reponse = await fetch(url);
    let donnees = await reponse.json();
    return donnees;
    }

    // Fonction Anonyme	: Fonction sans nom, souvent utilisée comme callback ou dans des expressions fonctionnelles.	
    let somme = function(a, b) {
    return a + b;
    };
    somme(2, 3); // 5

    //Arrow fct : Fonction succincte avec une syntaxe réduite, surtout utile pour les expressions courtes et les callbacks (et opération de tableau)
    let somme = (a, b) => a + b;
    somme(2, 3); 



*/