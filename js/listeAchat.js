var dateAujourdhui = new Date();
var annee = dateAujourdhui.getFullYear();
var mois = dateAujourdhui.getMonth() + 1; // Les mois commencent à 0, donc on ajoute 1
var jour = dateAujourdhui.getDate();
let dateA=annee + "-" + mois + "-" + jour

let tbodyAchat=document.getElementById("tbodyL");
let listeAchat= localStorage.getItem('achats');
let dateVente=document.getElementById("dateV");
let tabDate=[];
let tabDes=[];
//afficher tous les achats
listeAchat = JSON.parse(listeAchat);
listeAchat.forEach((element,index) => {
    let tr=document.createElement("tr");
    let tdn=document.createElement("td")
    tdn.innerText=index+1
    let tddes=document.createElement("td")
    tddes.innerText=element.des
    let tdquant=document.createElement("td")
    tdquant.innerText=element.quan
    tr.append(tdn,tddes,tdquant)
    tbodyAchat.append(tr)
    tabDate.push(element.dateAchat)
    tabDes.push(element.des)
});
tabDate=new Set(tabDate);
tabDes=new Set(tabDes)
tabDate.forEach(date=>{
    let op=document.createElement("option");
    op.value=date
    op.text=date
    dateVente.append(op);
})


let listeRetour=document.getElementById("listeRetour")
tabDes.forEach((des,index)=>{
    let option =document.createElement("option")
    option.value=des
    option.text=des
    
    listeRetour.append(option)
})

let quantiteRetour=document.getElementById("quantiteRetour");
let tabRetours=[];
if(localStorage.getItem('retour')){
    tabRetours=localStorage.getItem('retour');
    tabRetours = JSON.parse(tabRetours);
}
// ajouter produit retour
quantiteRetour.addEventListener("change",()=>{
        let n=parseInt(quantiteRetour.value);
      
       for(let i=0; i<listeAchat.length;i++){
            if(listeAchat[i].des==listeRetour.value){
                    n=n-parseInt(listeAchat[i].quan);
                    
                    if(n<=0)
                    {
                        listeAchat[i].quan=Math.abs(n)
                        console.log(`produit: ${listeAchat[i].des} quantité: ${listeAchat[i].quan} la quantité de retour est: ${n}`)
                        break
                    }
                    else{
                        listeAchat[i].quan=0
                        console.log(`produit: ${listeAchat[i].des} quantité: ${listeAchat[i].quan} la quantité de retour est: ${n}`)
                    
                    }
                }
            }
        if(n<=0){
            let retour={
                des:listeRetour.value,
                quan:quantiteRetour.value,
                date:dateA
            }
            tabRetours.push(retour);
            localStorage.setItem('retour', JSON.stringify(tabRetours));
            localStorage.setItem('achats', JSON.stringify(listeAchat))
        }
        else{
            console.log("erreur")
            listeAchat= localStorage.getItem('achats');
            listeAchat = JSON.parse(listeAchat);
    }
})
//afficher les retours
let tbodyR=document.getElementById("tbodyR")
tabRetours=localStorage.getItem('retour')
tabRetours=JSON.parse(tabRetours)

tabRetours.forEach((element,index) => {
    let tr=document.createElement("tr");
    let tdn=document.createElement("td")
    tdn.innerText=index+1
    let tddes=document.createElement("td")
    tddes.innerText=element.des
    let tdquant=document.createElement("td")
    tdquant.innerText=element.quan
    tr.append(tdn,tddes,tdquant)
    tbodyR.append(tr)
});

//afficher les achats d'une date 
dateVente.addEventListener("change",()=>{
    tbodyAchat.innerHTML=""
    let i=1;
    listeAchat.forEach((element) => {
        if (element.dateAchat==dateVente.value){
            let tr=document.createElement("tr");
            let tdn=document.createElement("td")
            tdn.innerText=i;
            let tddes=document.createElement("td")
            tddes.innerText=element.des
            let tdquant=document.createElement("td")
            tdquant.innerText=element.quan
            tr.append(tdn,tddes,tdquant)
            tbodyAchat.append(tr)
            i++;
        }
    })
    i=1;
    tbodyR.innerHTML=""
    tabRetours.forEach(element=>{
        if (element.date==dateVente.value){
            let tr=document.createElement("tr");
            let tdn=document.createElement("td")
            tdn.innerText=i;
            let tddes=document.createElement("td")
            tddes.innerText=element.des
            let tdquant=document.createElement("td")
            tdquant.innerText=element.quan
            tr.append(tdn,tddes,tdquant)
            tbodyR.append(tr)
            i++;
        }
    })
})
let btnProduit=document.getElementById("btnProduit");
let divAjouterRetour=document.querySelectorAll(".dateVente")
btnProduit.addEventListener("click",()=>{
    divAjouterRetour[1].classList.toggle("classNone");
})