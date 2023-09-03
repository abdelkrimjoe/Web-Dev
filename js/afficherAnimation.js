let menu=document.querySelector(".menu")
let iconAdd=document.getElementById("iconAdd")



iconAdd.addEventListener('click',()=>{

   if(menu.classList.contains("menufill")){
    menu.classList.remove("menufill")
    menu.classList.add("menuUnfill");
    iconAdd.style.transform="translateX(0)"
   }
   else{
    menu.classList.add("menufill")
    menu.classList.remove("menuUnfill");
    iconAdd.style.transform="translateX(100px)"
   } 
})
let liste=document.querySelector(".liste")
let iconListe=document.getElementById("iconListe")
iconListe.addEventListener("click",()=>{
    if(liste.classList.contains("menufill")){
        liste.classList.remove("menufill")
        liste.classList.add("menuUnfill");
        iconListe.style.transform="translateX(0)"
       }
       else{
        liste.classList.add("menufill")
        liste.classList.remove("menuUnfill");
        iconListe.style.transform="translateX(100px)"
       } 
})

let stats=document.querySelector(".stats")
let iconState=document.getElementById("iconState")
iconState.addEventListener("click",()=>{
    if(stats.classList.contains("menufill")){
        stats.classList.remove("menufill")
        stats.classList.add("menuUnfill");
        iconState.style.transform="translateX(0)"
       }
       else{
        stats.classList.add("menufill")
        stats.classList.remove("menuUnfill");
        iconState.style.transform="translateX(100px)"
       } 
})