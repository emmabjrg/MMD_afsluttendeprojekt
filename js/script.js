/*-----------------------------------------------------------------------------------------------
          HEADER
-------------------------------------------------------------------------------------------------*/

/*--------------------- Finder HTML-elementerne ----------------------*/

/*
document.querySelector() finder det første HTML-element, der matcher det class-navn, man skriver i parentesen
*/

/* Finder hamburgerknappen */
const menuButton = document.querySelector(".menu-button");

/* finder hele navigationen */
const navigation = document.querySelector(".navigation");

/* finder Service-knappen */
const servicesButton = document.querySelector(".services-button");

/* finder dropdown-menuen med servicerne */
const servicesMenu = document.querySelector(".services-menu");


/*--------------------- Mobilmenu ----------------------*/

/*
addEventListener() holder øje med en bestemt handling.
holder øje med "click".
Når man klikker på hamburgerknappen, kører koden inde i funktionen.
*/

menuButton.addEventListener("click", () => {

  /*
   classList.toggle() tilføjer eller fjerner en class.
 
   Hvis "is-open" ikke findes:
   -> bliver den tilføjet.
 
   Hvis "is-open" allerede findes:
   -> bliver den fjernet.
 
   CSS bruger derefter .is-open til at vise eller skjule menuen.
   */

  menuButton.classList.toggle("is-open");
  navigation.classList.toggle("is-open");


  /*
    classList.contains() undersøger,
    om navigationen lige nu har class "is-open".
  
    Resultatet bliver enten:
    true = menuen er åben
    false = menuen er lukket
    */

  const menuIsOpen =
    navigation.classList.contains("is-open");

  /*
   setAttribute() ændrer en HTML-attribut.
 
   aria-expanded fortæller bla. skærmlæsere om menuen er åben eller lukket.
 
   true -> menuen er åben
   false -> menuen er lukket
   */

  menuButton.setAttribute(
    "aria-expanded",
    menuIsOpen
  );
});

/*--------------------- Services dropdown ----------------------*/

/*
Når man klikker på Services-knappen,
tilføjes eller fjernes class "is-open".

Services-knappen bruger classen til pilens animation,
mens servicesMenu bruger den til at vise/skjule dropdown-menuen.
*/

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


/*-----------------------------------------------------------------------------------------------
          TESTIMONIAL SLIDER
-------------------------------------------------------------------------------------------------*/

/*--------------------- Finder slider-elementerne ----------------------*/

/*
querySelectorAll() finder ALLE elementer,
der matcher class-navnet.

derfor bruges querySelectorAll() til cards og dots,
fordi der findes flere af dem.
*/

const cards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".testimonial-dot");

/*
querySelector() bruges fordi der kun findes en venstre og en højre pil.
*/
const prev = document.querySelector(".testimonial-arrow-left");
const next = document.querySelector(".testimonial-arrow-right");

/*--------------------- Kontrollerer om slideren findes ----------------------*/
/*
testimonial slider findes kun på forsiden.

derfor undersøges først,om de nødvendige HTML-elementer findes.

cards.length > 0
-> der findes mindst ét testimonial-card.

dots.length > 0
-> der findes mindst én dot.

prev && next
-> begge pile findes.

!! Hvis elementerne ikke findes,
springer JavaScript resten af sliderkoden over.

dette gør, at samme script.js kan bruges på alle sider.
*/

if (cards.length > 0 && dots.length > 0 && prev && next) {

  /*
    current holder styr på,
    hvilket slide der er aktivt.
  
    JavaScript tæller fra 0.
  
    0 = første slide
    1 = andet slide
    2 = tredje slide
    */

  let current = 0;

  /*--------------------- Funktion der skifter slide ----------------------*/
  /*
  showSlide(index) modtager et nummer, der fortæller hvilket slide, der skal vises.
  */

  function showSlide(index) {
    /*
    først fjernes "is-active" fra det slide og den dot, der er aktive lige nu.
    */

    cards[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");

    /*
      Her beregnes det nye slide.
      % kaldes modulo og bruges her til at sørge for, at slideren starter forfra efter sidste slide.
    */

    current = (index + cards.length) % cards.length;

    /*
    Tilsidst får det nye slide og den tilhørende dot class "is-active".
    */

    cards[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  /*--------------------- Næste slide ----------------------*/

  /*
  Når højre pil klikkes, kaldes showSlide() med det nuværende nummer + 1.
  */

  next.addEventListener("click", () => {
    showSlide(current + 1);
  });

  /*--------------------- Forrige slide ----------------------*/

  /*
   Når venstre pil klikkes, kaldes showSlide() med det nuværende nummer - 1.
   */

  prev.addEventListener("click", () => {
    showSlide(current - 1);
  });

  /*--------------------- Dots ----------------------*/

  /*
  forEach() gennemgår hver dot én ad gangen.

  dot = den dot vi arbejder med lige nu.
  index = dens placering i rækken. 0,1,2  
  */

  dots.forEach((dot, index) => {
    /*
  Når en dot klikkes, vises det slide, der har samme index.
  */

    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });
}

/*-----------------------------------------------------------------------------------------------
          SERVICES PREVIEW
-------------------------------------------------------------------------------------------------*/

/*--------------------- Finder service-elementerne ----------------------*/

/*
Finder alle service-rækkerne i venstre side og alle preview-cards i højre side.
*/

const serviceRows = document.querySelectorAll(".service-row");
const serviceCards = document.querySelectorAll(".service-preview-card");

/*--------------------- Funktion der skifter service-card ----------------------*/

/*
showServiceCard() modtager navnet på en service.
"executive"
"team"
"leadership"
"workshops"

HTML'en bruger data-attributter til at forbinde en service-række med det rigtige card.
*/

function showServiceCard(serviceName) {
  serviceRows.forEach((row) => {

    /*
    row.dataset.service læser værdien fra fx:
    data-service="team"

    den sammenlignes med serviceName.

    Hvis de er ens: isActive = true
    Hvis de ikke er ens: isActive = false
    */

    const isActive = row.dataset.service === serviceName;
    row.classList.toggle("is-active", isActive);
  });


  /* Gennemgår alle preview-cards */

  serviceCards.forEach((card) => {
    /*
    card.dataset.serviceCard læser fx: data-service-card="team"
    Hvis værdien matcher serviceName, bliver cardet aktivt.
    */
    const isActive = card.dataset.serviceCard === serviceName;
    card.classList.toggle("is-active", isActive);
  });
}
/*--------------------- Hover og tastaturfokus ----------------------*/

serviceRows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    showServiceCard(row.dataset.service);
  });

  /*focus sker, når elementet får tastaturfokus,
  fx hvis brugeren navigerer med Tab.
  */
  row.addEventListener("focus", () => {
    showServiceCard(row.dataset.service);
  });
});


/*-----------------------------------------------------------------------------------------------
          SCROLL ANIMATION
-------------------------------------------------------------------------------------------------*/


/*--------------------- Finder elementer der skal fade ind ----------------------*/

/*
Finder alle HTML-elementer, der har class "fade-in".
*/

const fadeElements = document.querySelectorAll(".fade-in");

/*--------------------- Intersection Observer ----------------------*/

/*
IntersectionObserver holder øje med, om et element kommer ind i browserens synlige område.
*/

const fadeObserver = new IntersectionObserver(
  (entries) => {
    /*
       entries er de elementer, observeren lige har registreret.
      forEach() gennemgår dem ét ad gangen.
       */

    entries.forEach((entry) => {

      /*
      entry.isIntersecting er true, når elementet er synligt i browserens viewport.
      */

      if (entry.isIntersecting) {
        /*
        Når elementet bliver synligt, får det class "is-visible".
        CSS ændrer derefter opacity og transform, så elementet fader ind.
        */

        entry.target.classList.add("is-visible");

        /*
        Når animationen er kørt én gang, stoppes observation af elementet.
        */
        fadeObserver.unobserve(entry.target);
      }
    });
  },

  /*
  hvor meget af elementet der skal være synligt, før animationen starter.
  */
  {
    threshold: 0.15
  }
);
/*--------------------- Starter observeren ----------------------*/

/* til sidst gennemgås  alle .fade-in-elementerne og fortæller IntersectionObserver,
at den skal holde øje med dem.
*/

fadeElements.forEach((element) => {
  fadeObserver.observe(element);
});