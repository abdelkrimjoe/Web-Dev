//Initiation des données 
let designationProduit=document.getElementById("des");
let quantiteProduit=document.getElementById("quan");
let dateAchatProduit=document.getElementById("dateA");
let typeSelect=document.getElementById("type");
let prixAchat=document.getElementById("prixA");
let prixVente=document.getElementById("prixV")


//upload une image
let upload=document.getElementById("upload")
let image = document.getElementById("img");
let imageSelected=false
upload.onchange = function () {
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
      image.src = file.result;
      image.style.display = "block";
      imageSelected=true;
    };
  };

// remplir la liste des type
let type=["chargeur","kitman","cable"]
type.forEach(e=>{
    let option= document.createElement("option");
    option.value=e;
    option.text=e;
    typeSelect.appendChild(option);
})

//Enregistre les element
let produits=[]
let produit={}


let save=document.getElementById("enregistre");
let labelUpload=document.getElementById("labelUp");
let inputs=[designationProduit,quantiteProduit,dateAchatProduit,typeSelect,prixAchat,prixVente]
save.addEventListener("click",()=>{
    if (localStorage.getItem('produit')) {
        // Le tableau existe dans localStorage, récupérer les données
        let produitRecupere = localStorage.getItem('produit');
        produits = JSON.parse(produitRecupere);
      } 
    
    if(save.innerText==="Modifier"){
        const index = save.getAttribute("data-index");
        produits[index]={
            [designationProduit.name]:designationProduit.value,
            [quantiteProduit.name]:quantiteProduit.value,
            [dateAchatProduit.name]:dateAchatProduit.value,
            [typeSelect.name]:typeSelect.value,
            [prixAchat.name]:prixAchat.value,
            [prixVente.name]:prixVente.value,
            [image.name]:image.src,
        }
        
        localStorage.setItem('produit', JSON.stringify(produits));
        save.textContent = "Enregistrer";
        tableAffichage.innerHTML = "";
        afficherProduit(produits, tableAffichage);
    } 
    else{
    inputs.forEach(input => input.classList.remove("input-vide"));    
     labelUpload.style.color="white"; 
    let vide=false;    
        inputs.forEach(input=>{
            if(input.value.trim()===''){
                input.classList.add("input-vide");
                vide=true;
            }
        })
     if(vide===true){
        alert("Veuillez remplir tous les champs obligatoires.");
        return; // Arrêter le processus d'enregistrement
    }
    
    if(imageSelected===false){
        labelUpload.style.color="red";
        alert("Selectionne une image S.V.P");
        return;
    }
    
    
      

    produit={
    [designationProduit.name]:designationProduit.value,
    [quantiteProduit.name]:quantiteProduit.value,
    [dateAchatProduit.name]:dateAchatProduit.value,
    [typeSelect.name]:typeSelect.value,
    [prixAchat.name]:prixAchat.value,
    [prixVente.name]:prixVente.value,
    [image.name]:image.src,
    }
    let dernier=[];
    dernier.push(produit)
    produits.push(produit)
    localStorage.setItem('produit', JSON.stringify(produits));
    afficherProduit(dernier,tableAffichage)
    
   
  
}
 //réinitialistion des valeur
 designationProduit.value=""
 quantiteProduit.value=""
 dateAchatProduit.value=""
 typeSelect.value=""
 prixAchat.value=""
 prixVente.value=""
 image.style.display="none";
 image.src="";
 imageSelected=false;
}
)

let tableAffichage=document.getElementById("tbl");
let tbody=document.createElement("tbody")
if (localStorage.getItem('produit')) {
    // Le tableau existe dans localStorage, récupérer les données
    let produitRecupere = localStorage.getItem('produit');
    produits = JSON.parse(produitRecupere);
  } 


  if(produits.length>0){
    afficherProduit(produits,tableAffichage)
}


function afficherProduit(produits,tableAffichage){
    produits.forEach((produit, index)=>{
        let tr=document.createElement("tr")
        //ajouter les element de chaque produit aux tableaux
        for (let propriete in produit) {
            let td=document.createElement("td")
            if(propriete==="image"){
                imTd=document.createElement("img")
                imTd.src=produit[propriete];
                imTd.classList.add("image-cell")
                td.append(imTd)
            }
            else{
                td.innerText=produit[propriete];
            }
            tr.append(td);
        }
        //ajouter le button mise a jour et suprime aux tableau
        let td=document.createElement("td")
        let spanIconDelet=document.createElement("span");
        let spanIconUpdate=document.createElement("span")
        spanIconDelet.innerText="delete"
        spanIconUpdate.innerText="upgrade"
        spanIconDelet.classList.add("material-symbols-outlined")
        spanIconUpdate.classList.add("material-symbols-outlined")

        let btnUp=document.createElement("button")
        let btnDel=document.createElement("button")
        
        btnUp.addEventListener("click", () => {
            designationProduit.value = produit[ designationProduit.name];
            quantiteProduit.value = produit[quantiteProduit.name];
            dateAchatProduit.value = produit[dateAchatProduit.name];
            typeSelect.value=produit[typeSelect.name];
            prixAchat.value=produit[prixAchat.name];
            prixVente.value=produit[prixVente.name];
            image.src=produit[image.name];
            image.style.display="flex";
            // Modifier le bouton "Enregistrer" en "Modifier"
            save.textContent = "Modifier";
            // Stocker l'index du produit dans l'attribut personnalisé du bouton Enregistrer
            save.setAttribute("data-index", index);
        });

        btnDel.addEventListener("click",()=>{
            produits.splice(index,1);
            localStorage.setItem('produit', JSON.stringify(produits));
            tableAffichage.innerHTML = "";
            afficherProduit(produits, tableAffichage);
        })

        btnUp.append(spanIconUpdate)
        btnDel.append(spanIconDelet)
        divBtn=document.createElement("div");
        divBtn.append(btnUp)
        divBtn.append(btnDel)
        divBtn.classList.add("tdOperation")
        td.append(divBtn)
        tr.append(td)
        tableAffichage.append(tr);
    })
}