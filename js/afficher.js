let afficherProduit = document.querySelector(".afficherProduit");
let produitRecupere = localStorage.getItem("produit");
let produits = JSON.parse(produitRecupere);

let nombreProduitAfficher = 8;
let fin = nombreProduitAfficher;
let listDesachat = document.querySelector(".listDesachat");

if (produits.length < nombreProduitAfficher) {
  fin = produits.length;
}
let nombreAchat = document.getElementById("nombreAchat");
let tbodyList = document.getElementById("tbodyList");
let totaArticle = document.getElementById("totaArticle");
let prixTotal = document.getElementById("prixTotal");
creeElements(0, fin);

nombrePage = produits.length / nombreProduitAfficher;
let sommaire = document.querySelector(".sommaire");
for (let i = 0; i < nombrePage; i++) {
  let nb = document.createElement("div");
  nb.classList.add("nbSommaire");
  nb.innerText = i + 1;
  sommaire.append(nb);
  nb.addEventListener("click", () => {
    let nbT = document.querySelectorAll(".nbSommaire");
    afficherProduit.innerHTML = "";
    nbT.forEach((element) => {
      element.style.background = "azure";
    });
    nb.style.background = "red";

    let debut = parseInt(nb.innerText);
    let fin = debut * nombreProduitAfficher;

    debut = debut * nombreProduitAfficher - nombreProduitAfficher;
    if (fin > produits.length) {
      fin = produits.length - debut + debut;
    }
    creeElements(debut, fin);
  });
}

function creeElements(debut, fin) {
  for (let i = debut; i < fin; i++) {
    let item = document.createElement("div");
    item.classList.add("item");

    let image = document.createElement("img");
    image.src = produits[i].image;

    let nomProduit = document.createElement("p");
    nomProduit.classList.add("nomProduit");
    nomProduit.innerText = produits[i].des;

    let prixProduit = document.createElement("p");
    prixProduit.classList.add("prixProduit");
    prixProduit.innerText = `Prix: ${produits[i].prixV}DA`;

    let quntiteProduit = document.createElement("input");
    quntiteProduit.classList.add("inputAjouter");
    quntiteProduit.type = "number";
    quntiteProduit.placeholder = " la quantité voulu";
    
    quntiteProduit.addEventListener("change", () => {
      
        if(parseInt(quntiteProduit.value)>parseInt(produits[i].quan))
      {
        alert(`Quantité voulu plus quand stock!!! la quantité restante est: ${produits[i].quan}`)
        quntiteProduit.value=""
        quntiteProduit.focus();
      }
      else
      {
      nombreAchat.innerText =parseInt(nombreAchat.innerText) + parseInt(quntiteProduit.value);
      let trBody = document.createElement("tr");
      let tdDes = document.createElement("td");
      tdDes.innerText = produits[i].des;
      let tdQuan = document.createElement("td");
      tdQuan.innerText = quntiteProduit.value;
      let tdPu = document.createElement("td");
      tdPu.innerText = produits[i].prixV;
      let tdPt = document.createElement("td");
      tdPt.innerText = parseInt(tdPu.innerText) * parseInt(tdQuan.innerText);
      trBody.append(tdDes, tdQuan, tdPu, tdPt);
      tbodyList.append(trBody);
      totaArticle.innerText = nombreAchat.innerText;
      prixTotal.innerText =
        parseInt(prixTotal.innerText) + parseInt(tdPt.innerText);
      }
    });

    item.append(image, nomProduit, prixProduit, quntiteProduit);
    afficherProduit.append(item);
  }
}
let spanS = document.getElementById("symbole");
spanS.addEventListener("click", () => {
  listDesachat.classList.toggle("displayNone");
  document.querySelector(".container").classList.toggle("OpacityClass");
});
