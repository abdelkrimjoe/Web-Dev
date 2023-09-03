let nombreProduitAfficher = 5;
let tabTopVent = [];
 let tabTopRetour = [];
let setNom = new Set();
listeAchat.forEach((element) => {
  setNom.add(element.des);
});

setNom.forEach((e1) => {
  let topVente = {
    produit: "",
    quantite: 0,
  };
  topVente.produit = e1;
  listeAchat.forEach((element) => {
    if (e1 == element.des) {
      topVente.quantite = parseInt(topVente.quantite) + parseInt(element.quan);
    }
  });

  tabTopVent.push(topVente);
});
tabTopVent.sort((a, b) => parseInt(b.quantite) - parseInt(a.quantite));
nbProduit = tabTopVent.length / nombreProduitAfficher;
let divpagination = document.querySelector(".pagination");
let tbodyTopVente = document.getElementById("tbodyTopVente");
let debut = 0;
let fin;
if (nombreProduitAfficher < tabTopVent.length) {
  fin = nombreProduitAfficher;
} else {
  fin = tabTopVent.length;
}
for (i = 0; i < nbProduit; i++) {
  let btn = document.createElement("button");
  btn.innerText = i + 1;
  divpagination.append(btn);
  btn.addEventListener("click", () => {
    tbodyTopVente.innerHTML=""
    debut = (parseInt(btn.innerText) - 1) * nombreProduitAfficher;
    if (
      tabTopVent.length < nombreProduitAfficher * (debut + 1)) {
      fin = tabTopVent.length;
    } else {
      fin = (parseInt(btn.innerText) * nombreProduitAfficher);
    }
    afficher(debut,fin, tabTopVent,"tbodyTopVente")

  });
}
afficher(debut,fin, tabTopVent,"tbodyTopVente")



let nomRetour = new Set();
listeRetour.forEach((element) => {
  nomRetour.add(element.des);
});

nomRetour.forEach((e1) => {
  let TopRetour = {
    produit: "",
    quantite: 0,
  };
  TopRetour.produit = e1;
  listeRetour.forEach((element) => {
    if (element.des == e1) {
      TopRetour.quantite =
        parseInt(TopRetour.quantite) + parseInt(element.quan);
    }
  });
  tabTopRetour.push(TopRetour);
});

tabTopRetour.sort((a, b) => parseInt(b.quantite) - parseInt(a.quantite));

let tbodyTopRetour = document.getElementById("tbodyTopRetour");

let debutR=0;
let finR;
if (nombreProduitAfficher < tabTopRetour.length) {
    finR = nombreProduitAfficher;
  } else {
    finR = tabTopRetour.length;
  }
  
  afficher(debutR,finR, tabTopRetour,"tbodyTopRetour")

let  divpaginationAll = document.querySelectorAll(".pagination");
let divpaginationRetour=divpaginationAll[1]
let nbProduitR=tabTopRetour.length/nombreProduitAfficher

for (let i = 0; i < nbProduitR; i++) {
    let btn = document.createElement("button");
    btn.innerText = i + 1;
    divpaginationRetour.append(btn);
    btn.addEventListener("click",()=>{
       
        debut = (parseInt(btn.innerText) - 1) * nombreProduitAfficher;
    if (
      tabTopRetour.length < nombreProduitAfficher * (debut + 1)) {
      fin = tabTopRetour.length;
    } else {
      fin = (parseInt(btn.innerText) * nombreProduitAfficher);
    }
    afficher(debutR,finR, tabTopRetour,"tbodyTopRetour")

    })
}
function afficher (debut,fin, tab,tbody){
    tbody=document.getElementById(tbody)
   tbody.innerText=""
    for (let i = debut; i < fin; i++) {
        let tr = document.createElement("tr");
        let tdNomVent = document.createElement("td");
        tdNomVent.innerText = tab[i].produit;
        let tdQuantiteVent = document.createElement("td");
        tdQuantiteVent.innerText = tab[i].quantite;
        tr.append(tdNomVent, tdQuantiteVent);
        tbody.appendChild(tr);
      }
}