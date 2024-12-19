const form = document.getElementById("commandeForm");
const prixTotalElement = document.getElementById("prixTotal");

const formules = document.querySelectorAll('input[name="formule"]');
const photographesInput = document.getElementById("photographes");
const options = document.querySelectorAll('input[name="options"]');

// Tarifs des formules et options
const tarifs = {
  "Formule Basique": 500,
  "Formule Premium": 800,
  "Formule Mariage Complet": 1200,
  photographeSupplementaire: 200,
  "Projections sur TV": 50,
  "Utilisation du drone": 100,
};

// Fonction pour calculer le prix total
function calculerPrix() {
  let total = 0;

  // Ajouter le coût de la formule sélectionnée
  formules.forEach(formule => {
    if (formule.checked) {
      total += tarifs[formule.value];
    }
  });

  // Ajouter le coût des photographes supplémentaires
  total += photographesInput.value * tarifs.photographeSupplementaire;

  // Ajouter le coût des options supplémentaires
  options.forEach(option => {
    if (option.checked) {
      total += tarifs[option.value];
    }
  });

  // Mettre à jour l'affichage du prix total
  prixTotalElement.textContent = `Prix total : ${total} €`;
}

// Calculer le prix total à chaque modification
form.addEventListener("change", calculerPrix);



////////////////////////////////////////////
// Envoi de la commande
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Récupérer les valeurs du formulaire
  const nomClient = document.getElementById("nom_client").value;
  const emailClient = document.getElementById("email_client").value;
  const formule = document.querySelector('input[name="formule"]:checked').value;
  const photographes = parseInt(photographesInput.value);
  const selectedOptions = Array.from(options).filter(option => option.checked).map(option => option.value);

  // Calculer le prix total une dernière fois
  let total = 0;
  total += tarifs[formule];
  total += photographes * tarifs.photographeSupplementaire;
  selectedOptions.forEach(option => {
    total += tarifs[option];
  });

  // Créer l'objet commande
  const commande = {
    id: Date.now(),
    nom_client: nomClient,
    email: emailClient,
    formule: formule,
    photographes_supplementaires: photographes,
    options: selectedOptions,
    prix_total: total,
    date: new Date().toISOString().split("T")[0],
  };

  // Envoyer la commande au backend
  fetch("http://localhost:4000/commandes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commande),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de l'envoi de la commande.");
      }
    })
    .then(data => {
      console.log("Commande enregistrée :", data);
      alert("Votre commande a été enregistrée avec succès !");
    })
    .catch(error => {
      console.error("Erreur :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    });
});


  
  /////////////////////////////////////////
  // Fonction pour récupérer et afficher les commandes
function afficherCommandes() {
    fetch("http://localhost:4000/commandes")
      .then(response => response.json())
      .then(commandes => {
        const listeCommandes = document.getElementById("listeCommandes");
        listeCommandes.innerHTML = ""; // Vider la liste actuelle
        commandes.forEach(commande => {
          const commandeElement = document.createElement("li");
          commandeElement.textContent = `Commande n°${commande.id} : ${commande.nom_client}, ${commande.formule}, Total : ${commande.prix_total} €`;
          listeCommandes.appendChild(commandeElement);
        });
      })
      .catch(error => {
        console.error("Erreur :", error);
      });
  }
  
  // Charger les commandes au chargement de la page
  document.addEventListener("DOMContentLoaded", afficherCommandes);
  