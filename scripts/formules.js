const form = document.getElementById('commandeForm');
const formules = document.querySelectorAll('input[name="formule"]');
const photographes = document.getElementById('photographes');
const options = document.querySelectorAll('input[name="options"]');
const prixTotal = document.getElementById('prixTotal');

// Tarifs de base
const tarifs = {
  basique: 500,
  premium: 800,
  mariage: 1200,
  photographeSupplementaire: 200,
  tv: 50,
  drone: 100
};

// Permettre de cocher une seule formule à la fois
formules.forEach(formule => {
  formule.addEventListener('change', () => {
    formules.forEach(f => {
      if (f !== formule) f.checked = false;
    });
    calculerPrix();
  });
});

// Calcul du prix total
form.addEventListener('change', () => {
  calculerPrix();
});

function calculerPrix() {
  let total = 0;

  // Ajouter le coût de la formule sélectionnée
  formules.forEach(formule => {
    if (formule.checked) {
      total += tarifs[formule.value];
    }
  });

  // Ajouter le coût des photographes supplémentaires
  total += photographes.value * tarifs.photographeSupplementaire;

  // Ajouter le coût des options supplémentaires
  options.forEach(option => {
    if (option.checked) {
      total += tarifs[option.value];
    }
  });

  // Mettre à jour l'affichage du prix total
  prixTotal.textContent = `Prix total : ${total} €`;
}
