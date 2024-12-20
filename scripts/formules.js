const form = document.getElementById("commandeForm");
const prixTotalElement = document.getElementById("prixTotal");

const formules = document.querySelectorAll('input[name="formule"]');
const photographesInput = document.getElementById("photographes");
const options = document.querySelectorAll('input[name="options"]');

const tarifs = {
  "Formule Basique": 500,
  "Formule Premium": 800,
  "Formule Mariage Complet": 1200,
  photographeSupplementaire: 200,
  "Projections sur TV": 50,
  "Utilisation du drone": 100,
};

function calculerPrix() {
  let total = 0;

  formules.forEach(formule => {
    if (formule.checked) {
      total += tarifs[formule.value];
    }
  });

  total += photographesInput.value * tarifs.photographeSupplementaire;

  options.forEach(option => {
    if (option.checked) {
      total += tarifs[option.value];
    }
  });

  prixTotalElement.textContent = `Prix total : ${total} €`;
}

form.addEventListener("change", calculerPrix);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nomClient = document.getElementById("nom_client").value;
  const emailClient = document.getElementById("email_client").value;
  const formule = document.querySelector('input[name="formule"]:checked').value;
  const photographes = parseInt(photographesInput.value);
  const selectedOptions = Array.from(options)
    .filter(option => option.checked)
    .map(option => option.value);

  let total = 0;
  total += tarifs[formule];
  total += photographes * tarifs.photographeSupplementaire;
  selectedOptions.forEach(option => {
    total += tarifs[option];
  });

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

  let commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  commandes.push(commande);
  localStorage.setItem("commandes", JSON.stringify(commandes));

  afficherCommandes();

  alert(`Votre commande au numéro ${commande.id} et au montant de ${commande.prix_total} € a bien été passée.`);
});

function afficherCommandes() {
  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  const listeCommandes = document.getElementById("listeCommandes");
  listeCommandes.innerHTML = "";

  commandes.forEach(commande => {
    const commandeElement = document.createElement("li");
    commandeElement.textContent = `Commande n°${commande.id} : ${commande.nom_client}, ${commande.formule}, Total : ${commande.prix_total} €`;
    listeCommandes.appendChild(commandeElement);
  });
}

function supprimerCommandes() {
  localStorage.removeItem("commandes");

  const listeCommandes = document.getElementById("listeCommandes");
  listeCommandes.innerHTML = "";

  alert("L'historique des commandes a été supprimé.");
}

document.addEventListener("DOMContentLoaded", afficherCommandes);
document.getElementById("supprimerCommandes").addEventListener("click", supprimerCommandes);
