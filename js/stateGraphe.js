let ctx = document.getElementById("myChart");

let states = [
    "Vendus", "Retours"
  ];

  let donnes = [];
  let tabdata = donnes;
  
  
      let chartt = new Chart(ctx, {
        type: "bar",
        data: {
          labels: states,
          datasets: [
            {
              
              backgroundColor:['green','red'],
              borderColor: "black",
              data: tabdata,
              borderWidth: 1,
            },
          ],
        },
        options: {
            maintainAspectRatio:false,
          plugins: {
            legend: {
                display: false,
            }
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      sectionStar.addEventListener("change",()=>{
         if(labelStar.innerText!="Debut"){
            console.log("from Tbody")
         
          donnes[0]=tbodystate.children[0].children[0].innerText;
          donnes[1]=tbodystate.children[0].children[1].innerText
          chartt.data.datasets[0].data=donnes;
          chartt.update();
          }
      }) 

      sectionEnd.addEventListener("change",()=>{
         donnes[0]=tbodystate.children[0].children[0].innerText;
         donnes[1]=tbodystate.children[0].children[1].innerText
         chartt.data.datasets[0].data=donnes;
         chartt.update();
         
     }) 
     dessin=document.querySelector(".dessin")
    