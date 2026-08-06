/* finder html-elementerne, document.querySelector() finder et element ud fra dets class-navn.  */

/* finder hamburgerknappen */
const menuButton = document.querySelector(".menu-button");

/* finder hele navigationen */
const navigation = document.querySelector(".navigation");

/* finder Service-knappen */

const servicesButton = document.querySelector(".services-button");

/* finder dropdown-menuen med servicerne */
const servicesMenu = document.querySelector(".services-menu");


/* Eventlistener, så koden kører, når man klikker på hamburgerknappen. */
menuButton.addEventListener("click", () => {

  /* toggle() tilføjer eller fjerner class "is-open".

  hvis ikke findes, bliver den tilføjet.
  hvis allerede findes, bliver den fjernet. */
  menuButton.classList.toggle("is-open");
  navigation.classList.toggle("is-open");


  /* contains() undersøger om navigationen lige nu har class "is-open". Resultatet er enten true eller false.*/
  const menuIsOpen =
    navigation.classList.contains("is-open");


  /* Opdaterer aria-expanded på hamburgerknappen. 
  Hvis menuen er åben:aria-expanded="true"
  Hvis menuen er lukket:aria-expanded="false" */
  menuButton.setAttribute(
    "aria-expanded",
    menuIsOpen
  );
});


/* åbner og lukker dropdown-menu ved services. Koden kører, når brugeren klikker på Services-knappen. */
servicesButton.addEventListener("click", () => {
  servicesButton.classList.toggle("is-open");
  servicesMenu.classList.toggle("is-open");
});


/* ved klik udenfor dropdown lukkes menuen. */
document.addEventListener("click", (event) => {

  /*
  event.target er det element, man klikkede på.

  closest(".services-item") undersøger, om det
  klikkede element ligger inde i Services-området.
  */

  const servicesItem =
    event.target.closest(".services-item");


  /*
  ! betyder "ikke".
  hvis klikket ikke ligger inde i .services-item,
  skal dropdown-menuen lukkes.
  */
  if (!servicesItem) {

    servicesButton.classList.remove("is-open");
    servicesMenu.classList.remove("is-open");
  }
});



const cards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".testimonial-dot");
const prev = document.querySelector(".testimonial-arrow-left");
const next = document.querySelector(".testimonial-arrow-right");

if (cards.length > 0 && dots.length > 0 && prev && next) {

  let current = 0;

  function showSlide(index) {
    cards[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");

    current = (index + cards.length) % cards.length;

    cards[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  next.addEventListener("click", () => {
    showSlide(current + 1);
  });

  prev.addEventListener("click", () => {
    showSlide(current - 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });
}
/*----------------------------------- SERVICES PREVIEW --------------------------------*/

const serviceRows = document.querySelectorAll(".service-row");
const serviceCards = document.querySelectorAll(".service-preview-card");

function showServiceCard(serviceName) {
  serviceRows.forEach((row) => {
    const isActive = row.dataset.service === serviceName;
    row.classList.toggle("is-active", isActive);
  });

  serviceCards.forEach((card) => {
    const isActive = card.dataset.serviceCard === serviceName;
    card.classList.toggle("is-active", isActive);
  });
}

serviceRows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    showServiceCard(row.dataset.service);
  });

  row.addEventListener("focus", () => {
    showServiceCard(row.dataset.service);
  });
});


/*----------------------------------- SCROLL ANIMATION --------------------------------*/

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

fadeElements.forEach((element) => {
  fadeObserver.observe(element);
});