//Elementi del DOM
const rowEl = document.querySelector(".row");
let cardsEl;
const modalImg = document.getElementById("modalImg");

console.log(modalImg);

//End point dell' API utilizzata
const apiUri = `https://lanciweb.github.io/demo/api/pictures/`;

/**
 *
 * Funzione che permette di generare in pagina gli elementi tramite una chiamata AJAX all' API
 *
 * @param {string} apiUri end point dell'api che si vuole utilizzare
 */
const generateElement = (apiUri) => {
  axios.get(apiUri).then((responses) => {
    const arrObj = responses.data;
    let contentCard = "";

    arrObj.forEach((obj) => {
      contentCard += ` <div class="col-12 col-md-6 col-xl-4">
      <div id="card" class="card mx-auto" style="width: 18rem">
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
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));

    for (const card of cardsEl) {
      const pin = card.querySelector(".pin");
      const cardImg = card.querySelector("img:not(.pin)");
      console.log(cardImg);

      card.addEventListener("mouseover", () => {
        card.style.transform = "rotate(30deg) scale(1.1)";
        card.classList.add("z-1");
        pin.classList.add("d-none");
      });
      card.addEventListener("mouseout", () => {
        card.style.transform = "rotate(0deg)";
        card.classList.remove("z-1");
        pin.classList.remove("d-none");
      });

      card.addEventListener("click", () => {
        const img = cardImg.getAttribute("src");
        modalImg.src = img;
        modal.show();
      });
    }
  });
};

generateElement(apiUri);
