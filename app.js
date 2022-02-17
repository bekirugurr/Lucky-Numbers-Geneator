const inputWrapper = document.getElementById("header__input-wrapper");
const input = document.getElementById("ticket-number");
const getButton = document.getElementById("get-button");
const refreshWrapper = document.getElementById("header__refresh-button");
const refreshButton = document.getElementById("refresh-button");
const deneme = document.getElementById("deneme");
const header = document.querySelector("header");
const main = document.getElementById("main");
const warningSection = document.getElementById("warning-section");

let loadFunc = () => {
  header.style.display = "flex";
  main.style.display = "flex";
  warningSection.style.display = "none";
  input.focus();
  input.value = "";
  document.getElementById("header__input-wrapper").style.display = "block";
  document.getElementById("header__refresh-button").style.display = "none";
};

// istenen kadar seri elde etme fonksiyonu
let getTicketsFunc = () => {
  let ticketsContainerDiv = document.createElement("div");
  ticketsContainerDiv.className = "main__tickets-outer-container";

  // Tek bir seri elde etme fonksiyonu
  let getASerie = () => {
    //Bütün sayıları kapsayacak divi tanımlama
    let numbersWrapperDiv = document.createElement("div");
    numbersWrapperDiv.className = "main__numbers-wrapper";
    // İlk altı sayıyı elde etme, bunları kapsayı bir div oluşturup içine yazma ve bu divi sayıları kapsayan divin içine ekleme
    let sixNumbersList = [];
    while (6 > sixNumbersList.length) {
      let number = Math.round(Math.random() * 90);
      count = 0;
      for (let i = 0; i < sixNumbersList.length; i++) {
        if (sixNumbersList[i] == number) {
          count++;
        }
      }
      if (count == 0) {
        sixNumbersList.push(number);
      }
    }
    sixNumbersList = sixNumbersList.sort((a, b) => a - b);
    for (let i = 0; i < sixNumbersList.length; i++) {
      let sixNumbersDiv = document.createElement("div");
      sixNumbersDiv.className = "main__first-six-numbers";
      sixNumbersDiv.innerHTML = sixNumbersList[i].toString().padStart(2, "0");
      numbersWrapperDiv.appendChild(sixNumbersDiv);
    }
    
    //joker number ı elde etme, divini tanımlayıp içine yazma ve bu divi sayıları kapsayan divin içine ekleme
    let jokerNumber = 0;
    let getJokerNumber = () => {
      let num = Math.round(Math.random() * 90);
      let count = 0;
      for (let i = 0; i < sixNumbersList.length; i++) {
        if (num == sixNumbersList[i]) {
          count++;
        }
      }
      if (count == 0) {
        jokerNumber = num;
      } else {
        getJokerNumber();
      }
    };
    getJokerNumber();
    let jokerDiv = document.createElement("div");
    jokerDiv.className = "main__joker-number";
    jokerDiv.innerHTML = jokerNumber.toString().padStart(2, "0");
    numbersWrapperDiv.appendChild(jokerDiv);



    //super star number ı elde etme, divini tanımlayıp içine yazma ve bu divi sayıları kapsayan divin içine ekleme
    let superStarNumber = Math.round(Math.random() * 90);
    let superStarNumberDiv = document.createElement("div");
    superStarNumberDiv.className = "main__super-star-number";
    superStarNumberDiv.innerHTML = superStarNumber.toString().padStart(2, "0");
    numbersWrapperDiv.appendChild(superStarNumberDiv);

    //ticket divini oluşturup sayıları kapsayan divini içine ekleme
    let ticketDiv = document.createElement("div");
    ticketDiv.className = "main__ticket-container";
    ticketDiv.appendChild(numbersWrapperDiv);
    ticketsContainerDiv.appendChild(ticketDiv); 
  }; 

 
  if (+input.value > 0 && +input.value < 9) {
    for (let i = 0; i < +input.value; i++) {
      getASerie();
    }
  } else {
    header.style.display = "none";
    main.style.display = "none";
    warningSection.style.display = "block";
    setTimeout(() => {
      ticketsContainerDiv.remove();
      loadFunc();
      input.focus();
    }, 2000);
  }
  main.appendChild(ticketsContainerDiv);
  document.getElementById("header__input-wrapper").style.display = "none";
  document.getElementById("header__refresh-button").style.display = "block";
};

//console.log(sixNumbers);
//deneme.innerHTML = (sixNumbers + " " +jokerNumber.toString());

window.addEventListener("load", () => {
  loadFunc();
  input.focus();
});
refreshButton.addEventListener("click", () => {
  loadFunc();
  input.focus();
});
getButton.addEventListener("click", getTicketsFunc);
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    getTicketsFunc();
  }
});
refreshButton.addEventListener("click", () => {
  let ticketsContainerDiv = document.getElementsByClassName(
    "main__tickets-outer-container"
  )[0];
  ticketsContainerDiv.remove();
  loadFunc();
});
