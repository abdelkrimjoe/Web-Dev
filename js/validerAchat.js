var dateAujourdhui = new Date();
var annee = dateAujourdhui.getFullYear();
var mois = dateAujourdhui.getMonth() + 1; // Les mois commencent à 0, donc on ajoute 1
var jour = dateAujourdhui.getDate();
let dateA=annee + "-" + mois + "-" + jour


let ok=document.getElementById("ok")
let achats;
let achatTemp;
let produitsT=localStorage.getItem('produit') 
 produitsT=JSON.parse(produitsT);

if (localStorage.getItem('achats')){
    achats=localStorage.getItem('achats')
    achats=JSON.parse(achats)
}else{achats=[]}
ok.addEventListener("click",()=>{
    achatTemp=[]
    let linges=tbodyList.querySelectorAll("tr");
linges.forEach(li => {
    colo=li.querySelectorAll("td");
    
    let achat={
    des:colo[0].innerText,
     quan:colo[1].innerText,
     prixU:colo[2].innerText,
     prixV:colo[3].innerText,
     dateAchat:dateA
        }
        achats.push(achat)
        achatTemp.push(achat)
});
localStorage.setItem('achats', JSON.stringify(achats));
    listDesachat.classList.toggle("displayNone")
    document.querySelector(".container").classList.toggle("OpacityClass")
    nombreAchat.innerText="0";
    tbodyList.innerHTML=""
    totaArticle.innerText="0"
    prixTotal.innerText="0"
let allInput=document.querySelectorAll(".inputAjouter");
allInput.forEach(input=>{
    input.value="";
    input.placeholder=" la quantité voulu"
})
miseAjour(produitsT,achatTemp)
localStorage.setItem('produit',JSON.stringify(produitsT))
})

function miseAjour(produits,achats){
    produits.forEach(produit=>{
        let nb=0
        achats.forEach(achat=>{
            if(produit.des===achat.des){
                nb=nb+parseInt(achat.quan)
            }
        })
        produit.quan=produit.quan-nb
    })
}