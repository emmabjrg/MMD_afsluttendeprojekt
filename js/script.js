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