let choix = document.querySelectorAll('input[type="radio"]');
let selection = document.querySelector(".selection");
let labelStar = document.getElementById("start");
let sectionStar = document.getElementById("startS");
let labelEnd = document.getElementById("end");
let sectionEnd = document.getElementById("endS");

let listeAchat= localStorage.getItem('achats');
listeAchat=JSON.parse(listeAchat);
let listeRetour=localStorage.getItem('retour');
listeRetour=JSON.parse(listeRetour)

let tabJour=new Set();
let tabMois=new Set();
let tabAnne=new Set();
listeAchat.forEach(element=>{
    tabJour.add(element.dateAchat)
    let [year, month, day]=(element.dateAchat).split("-")
    tabMois.add(month)
   tabAnne .add(year)
})

tabJour=Array.from(tabJour)
tabMois=Array.from(tabMois)
tabAnne=Array.from(tabAnne)
choix.forEach((element) => {
  element.addEventListener("click", () => {
    selection.style.display = "flex";
    switch (element.value) {
      case "jour":
        labelStar.innerText = "jour";
        sectionStar.innerHTML=""
        tabJour.forEach(element=>{
            let option=document.createElement("option")
            option.value=element
            option.text=element;
            sectionStar.append(option)
        })
        labelEnd.style.display="none"
        sectionEnd.style.display="none"
        break;
      case "Mois":
        labelStar.innerText = "Mois";
        sectionStar.innerHTML=""
        tabMois.forEach(element=>{
            let option=document.createElement("option")
            option.value=element
            option.text=element;
            sectionStar.append(option)
        })

        labelEnd.style.display="none"
        sectionEnd.style.display="none"
        break;
      case "Année":
        labelStar.innerText = "Année";
        sectionStar.innerHTML=""
        tabAnne.forEach(element=>{
            let option=document.createElement("option")
            option.value=element
            option.text=element;
            sectionStar.append(option)
        })
        let option=document.createElement("option")
            option.value=" "
            sectionStar.append(option)
        labelEnd.style.display="none"
        sectionEnd.style.display="none"
        break;
      case "Intervale":
        sectionStar.innerHTML=""
        sectionEnd.innerHTML=""
        labelStar.innerText = "Debut";
        labelEnd.innerText="fin"
       for(let i=0;i<tabJour.length-1; i++){
            let option=document.createElement("option")
            option.value=tabJour[i]
            option.text=tabJour[i];
            sectionStar.append(option)
        }
        sectionStar.addEventListener("change",()=>{
           sectionEnd.innerText=""
            let index=(tabJour.indexOf(sectionStar.value))+1
           for(let i=index;i<tabJour.length;i++){
            let option=document.createElement("option")
            option.value=tabJour[i]
            option.text=tabJour[i];
            sectionEnd.append(option)
            
           }
        })
        labelEnd.style.display="flex"
        sectionEnd.style.display="flex"
        break;
    }
  });
});

// faire les statistique
let totalR,total

let sectionChifre=document.querySelector(".chiffre")
let titreTableau=document.getElementById("titreTableau");
let tbodystate=document.getElementById("tbodystate");
    sectionStar.addEventListener("change",()=>{
        titreTableau.innerHTML=""
        tbodystate.innerHTML=""
        if(labelStar.innerText=="jour"){
            let total=0;
            for(let i=0; i<listeAchat.length; i++){
                if(sectionStar.value==listeAchat[i].dateAchat){
                    total=total+parseInt(listeAchat[i].quan)
                }
                else{continue}
            }
            let totalR=0
            for(let i=0; i<listeRetour.length; i++){
                if(sectionStar.value==listeRetour[i].date){
                    totalR=totalR+parseInt(listeRetour[i].quan)
                }
                else{continue}
            }
            
            titreTableau.innerText=`les States du journée: ${sectionStar.value}`
            let tr=document.createElement("tr")
            let tdV=document.createElement("td")
            tdV.innerText=total
            let tdR=document.createElement("td")
            tdR.innerText=totalR
            tr.append(tdV,tdR)
            tbodystate.append(tr)
            
           
        }
        if (labelStar.innerText=="Mois"){
            let totalM=0
            let totalR=0
            for(let i=0; i<listeAchat.length;i++){
                let [, month]=(listeAchat[i].dateAchat).split("-")
                if(sectionStar.value==month){
                   totalM=totalM+parseInt(listeAchat[i].quan);
                }
                else{continue}
            }
            for(let i=0; i<listeRetour.length;i++){
                let [, month]=(listeRetour[i].date).split("-")
                if(sectionStar.value==month){
                   totalR=totalR+parseInt(listeRetour[i].quan);
                }
                else{continue}
            }
            titreTableau.innerText=`les States du mois: ${sectionStar.value}`
            let tr=document.createElement("tr")
            let tdV=document.createElement("td")
            tdV.innerText=totalM
            let tdR=document.createElement("td")
            tdR.innerText=totalR
            tr.append(tdV,tdR)
            tbodystate.append(tr)
        }

        if (labelStar.innerText=="Année"){
            let totalA=0
            let totalRa=0
            for(let i=0; i<listeAchat.length;i++){
                let [anne]=(listeAchat[i].dateAchat).split("-")
                if(sectionStar.value==anne){
                   totalA=totalA+parseInt(listeAchat[i].quan);
                }
                else{continue}
            }
            for(let i=0; i<listeRetour.length;i++){
                let [anne]=(listeRetour[i].date).split("-")
                if(sectionStar.value==anne){
                   totalRa=totalRa+parseInt(listeRetour[i].quan);
                }
                else{continue}
            }
            titreTableau.innerText=`les States d'années: ${sectionStar.value}`
            let tr=document.createElement("tr")
            let tdV=document.createElement("td")
            tdV.innerText=totalA
            let tdR=document.createElement("td")
            tdR.innerText=totalRa
            tr.append(tdV,tdR)
            tbodystate.append(tr)
        }
    })
    sectionEnd.addEventListener("change",()=>{
        titreTableau.innerHTML=""
        tbodystate.innerHTML=""
        let i=0;
        let debut=0
        let fin=0
        let totalA=0
        while(i<listeAchat.length&& listeAchat[i].dateAchat<=sectionEnd.value){
            if(listeAchat[i].dateAchat==sectionStar.value){
                debut=i;
                break
            }
            i++
        }
        
        while(i<listeAchat.length&& listeAchat[i].dateAchat<=sectionEnd.value){
            fin=i;
            i++
        }
        for(i=debut;i<=fin;i++){
            totalA=totalA+parseInt (listeAchat[i].quan)
        }
        console.log(` Vente: debut: ${listeAchat[debut].dateAchat} fin:${listeAchat[fin].dateAchat} quantite: ${totalA}`)
        i=0;
        let debutR=0
        let finR=0
        let totalR=0
        while(i<listeRetour.length&& listeRetour[i].date<=sectionEnd.value){
            if(listeRetour[i].date==sectionStar.value){
                debutR=i;
            }
            finR=i;
            ++i
        }
        for(i=debutR;i<=finR;i++){
            totalR=totalR+parseInt (listeRetour[i].quan)
        }
        console.log(` Retour: debut: ${listeRetour[debutR].date} fin:${listeRetour[finR].date} quantité: ${totalR}`)
        titreTableau.innerText=`les States du: ${sectionStar.value} à ${sectionEnd.value}`
            let tr=document.createElement("tr")
            let tdV=document.createElement("td")
            tdV.innerText=totalA
            let tdR=document.createElement("td")
            tdR.innerText=totalR
            tr.append(tdV,tdR)
            tbodystate.append(tr)

    })
