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
    // İlk altı sayıyı elde etme, bunlara bir div oluşturup içine yazma
    let sixNumbersList = [];
    for (let i = 0; i < 6; i++) {
      let number = Math.round(Math.random() * 90)
        .toString()
        .padStart(2, "0");
      sixNumbersList.push(number);
    }
    sixNumbersList = sixNumbersList.sort((a, b) => a - b);
    sixNumbers = sixNumbersList.join(" ");
    let sixNumbersDiv = document.createElement("div");
    sixNumbersDiv.className = "main__first-six-numbers";
    sixNumbersDiv.innerHTML = sixNumbers;

    //joker number ı elde etme, divini tanımlayıp içine yazma
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

    //super star number ı elde etme, divini tanımlayıp içine yazma
    let superStarNumber = Math.round(Math.random() * 90);
    let superStarNumberDiv = document.createElement("div");
    superStarNumberDiv.className = "main__super-star-number";
    superStarNumberDiv.innerHTML = superStarNumber.toString().padStart(2, "0");

    // ilk altı sayının divini, joker number divini ve super star number divini içine alacak div ekleyip bu üçünü içine pushlama
    let numbersWrapperDiv = document.createElement("div");
    numbersWrapperDiv.className = "main__numbers-wrapper";
    numbersWrapperDiv.appendChild(sixNumbersDiv);
    numbersWrapperDiv.appendChild(jokerDiv);
    numbersWrapperDiv.appendChild(superStarNumberDiv);
    console.log(numbersWrapperDiv);
    //ticket divini oluşturup  pushlama
    let ticketDiv = document.createElement("div");
    ticketDiv.className = "main__ticket-container";
    ticketDiv.appendChild(numbersWrapperDiv);
    ticketsContainerDiv.appendChild(ticketDiv);
  };

  //getASerie()
  //getASerie()

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

window.addEventListener("load", ()=>{
    loadFunc();
    input.focus();
});
refreshButton.addEventListener("click", ()=>{
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
