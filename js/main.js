//Elementi del DOM
const rowEl = document.querySelector(".row");
let cardsEl;
const overlayEl = document.querySelector(".overlay");
const overlayImg = document.querySelector(".overlay-img img");
const overlayButton = document.querySelector(".overlay-button");

//End point dell' API utilizzata
const apiUrl = `https://lanciweb.github.io/demo/api/pictures/`;

axios.get(apiUrl).then((responses) => {
  const arrObj = responses.data;

  console.log(responses.data);

  let contentCard = "";

  arrObj.forEach((obj) => {
    contentCard += ` <div class="col-12 col-md-6 col-xl-4">
      <div id="card" class="card mx-auto">
      <img class="pin" src="./img/pin.svg" alt="" />
      <img src="${obj.url}" alt="..." />
      <div class="card-body">
      <p class="card-text">
      ${obj.date}
      </p>
      <p class="card-text fw-bold fs-3">
      ${obj.title}
      </p>
      </div>
      </div>
      </div>`;
  });

  rowEl.innerHTML = contentCard;

  cardsEl = document.querySelectorAll(".card");

  for (const card of cardsEl) {
    const pin = card.querySelector(".pin");
    const cardImg = card.querySelector("img:not(.pin)");

    card.addEventListener("mouseover", () => {
      card.style.transform = "rotate(10deg) scale(1.1)";
      pin.classList.add("d-none");
      card.classList.add(
        "card-shadow",
        "cursor-pointer",
        "card-transition",
        "z-1"
      );
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "rotate(0deg)";
      pin.classList.remove("d-none");
      card.classList.remove("card-shadow", "z-1");
    });

    card.addEventListener("click", () => {
      overlayImg.src = cardImg.src;
      overlayEl.classList.remove("d-none");
      card.classList.add("d-none");
    });

    overlayButton.addEventListener("click", () => {
      overlayEl.classList.add("d-none");
      card.classList.remove("d-none");
    });
  }
});
