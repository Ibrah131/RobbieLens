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
  
    if (!emailClient || emailClient.trim() === "") {
      alert("Veuillez renseigner un email valide.");
      return;
    }
  
    let total = 0;
    total += tarifs[formule];
    total += photographes * tarifs.photographeSupplementaire;
    selectedOptions.forEach(option => {
      total += tarifs[option];
    });
  
    const commande = {
      id: Date.now(),
      nom_client: nomClient,
      email_client: emailClient,
      formule: formule,
      photographes_supplementaires: photographes,
      options: selectedOptions,
      prix_total: total,
      date: new Date().toISOString().split("T")[0],
    };
  
    console.log("Sending POST request with body:", commande);
  
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
        }
        throw new Error("Failed to submit commande");
      })
      .then(data => {
        console.log("Commande submitted successfully:", data);
        alert(`Votre commande au numéro ${data.id} et au montant de ${commande.prix_total} € a bien été passée.`);
        afficherCommandes(); // Update display
      })
      .catch(error => {
        console.error("Error submitting commande:", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
      });
  });
  

function afficherCommandes() {
  // Combine localStorage and database data
  const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
  const listeCommandes = document.getElementById("listeCommandes");
  listeCommandes.innerHTML = "";

  // Add local commands
  commandes.forEach(commande => {
    const commandeElement = document.createElement("li");
    commandeElement.textContent = `Commande n°${commande.id} : ${commande.nom_client}, ${commande.formule}, Total : ${commande.prix_total} €`;
    listeCommandes.appendChild(commandeElement);
  });

  // Add database commands
  fetch("http://localhost:4000/commandes")
    .then(response => response.json())
    .then(databaseCommandes => {
      databaseCommandes.forEach(commande => {
        const commandeElement = document.createElement("li");
        commandeElement.textContent = `Commande n°${commande.id} : ${commande.nom_client}, ${commande.formule}, Total : ${commande.prix_total} €`;
        listeCommandes.appendChild(commandeElement);
      });
    })
    .catch(error => {
      console.error("Error fetching database commandes:", error);
    });
}

function supprimerCommandes() {
  // Clear localStorage
  localStorage.removeItem("commandes");

  const listeCommandes = document.getElementById("listeCommandes");
  listeCommandes.innerHTML = "";

  alert("L'historique des commandes a été supprimé.");
}

document.addEventListener("DOMContentLoaded", afficherCommandes);
document.getElementById("supprimerCommandes").addEventListener("click", supprimerCommandes);
app.post('/commandes', (req, res) => {
    console.log("Received POST request with body:", req.body);
    const { id, nom_client, email_client, formule, photographes_supplementaires, options, prix_total, date } = req.body;
  
    if (!email_client || email_client.trim() === "") {
      console.error("Email Client is missing in the request body.");
      res.status(400).json({ error: "L'email du client est requis." });
      return;
    }
  
    const query = "INSERT INTO commandes SET ?";
    const values = {
      id,
      nom_client,
      email_client,
      formule,
      photographes_supplementaires,
      options: JSON.stringify(options),
      prix_total,
      date,
    };
  
    console.log("Executing SQL query:", query, "with values:", values);
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("SQL query failed:", err);
        res.status(500).send("Database insertion error");
        return;
      }
      console.log("Row inserted successfully:", result);
      res.status(201).json({ message: "Commande added successfully", id });
    });
  });
  
