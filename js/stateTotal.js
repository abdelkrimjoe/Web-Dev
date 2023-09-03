let stateTotal=document.querySelector(".stateTotal")
let plusDetaille=document.querySelector(".plusDetaille")
let titreDetaille=document.getElementById("titreDetaille")
let setNom = new Set();

listeAchat.forEach((element) => {
  setNom.add(element.des);
});

let setRetourNom=new Set()
listeRetour.forEach((element) => {
    setRetourNom.add(element.des);
  });
  console.log(setRetourNom)
let tbodylistV=document.getElementById("tbodylistV")
let tbodylistR= document.getElementById("tbodylistR")
plusDetaille.addEventListener("click",()=>{
    titreDetaille.innerText=`les detaile du ${labelStar.innerText}: ${sectionStar.value}`;
    
    afficherDetaille(setNom,listeAchat,"tbodylistV",labelStar.innerText)
    afficherDetaille(setRetourNom,listeRetour,"tbodylistR",labelStar.innerText)
    
   

})
//fonction d'affichage détaille 
function afficherDetaille(setNom,listeAchat,tbody,day){
    tbody=document.getElementById(tbody)
    tbody.innerHTML=""
    setNom.forEach(nom => {
        let pr={
        des:nom,
        quantite:0
       }
       switch(day){
        case("jour"):
        listeAchat.forEach(element=>{
            if((pr.des==element.des && element.dateAchat==sectionStar.value)||(pr.des==element.des && element.date==sectionStar.value)){
                    pr.quantite=parseInt(pr.quantite)+parseInt(element.quan)
            }
        })
            break
        case("Mois"):  
        listeAchat.forEach(element=>{
            let [, month]=((element.dateAchat||element.date).split("-"))
            if(pr.des==element.des && month==sectionStar.value){
                pr.quantite=parseInt(pr.quantite)+parseInt(element.quan)
            }
       })
            break  
            case("Année"):  
            listeAchat.forEach(element=>{
                let [year]=((element.dateAchat||element.date).split("-"))
                if(pr.des==element.des && year==sectionStar.value){
                    pr.quantite=parseInt(pr.quantite)+parseInt(element.quan)
                }
           })
                break  
                case("Debut"):
                let debut=0;
                let fin=0;
                for(let i=0; i<listeAchat.length;i++) {
                    if((listeAchat[i].date||listeAchat[i].dateAchat)==sectionStar.value){
                        debut=i;
                        break
                    }
                }
                let i=debut
                while((i<listeAchat.length && listeAchat[i].dateAchat<=sectionEnd.value)||(i<listeAchat.length && listeAchat[i].date<=sectionEnd.value)){
                    fin=i;
                    i++;
                }
                  
               for(let i=debut; i<=fin;i++){
                    if(listeAchat[i].des==pr.des ){
                        pr.quantite=parseInt(pr.quantite)+parseInt(listeAchat[i].quan)
                    }
               }
                    break      
        }    
        
        if(pr.quantite>0){
            let tr=document.createElement("tr")
            let tddes=document.createElement("td")
            tddes.innerText=pr.des
            let tdquant=document.createElement("td")
            tdquant.innerText=pr.quantite;
            tr.append(tddes,tdquant)
            tbody.append(tr)
        }
    
    });
}