/* =========================================================
   RAYY PORTFOLIO
   SCRIPT.JS
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menuButton =
  document.getElementById("menuButton");

const nav =
  document.getElementById("nav");


if (menuButton && nav) {

  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        nav.classList.toggle("open");

      menuButton.classList.toggle(
        "active",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        isOpen
      );

    }
  );


  nav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove("open");

          menuButton.classList.remove(
            "active"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* ================= HEADER SCROLL ================= */

const header =
  document.getElementById("header");


let lastScroll = 0;


window.addEventListener(
  "scroll",
  () => {

    const currentScroll =
      window.scrollY;


    if (!header) return;


    if (currentScroll > 20) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }


    lastScroll = currentScroll;

  },
  {
    passive: true
  }
);


/* ================= REVEAL ANIMATION ================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: .12
    }

  );


revealElements.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);


/* ================= CONTACT MODAL ================= */

const modal =
  document.getElementById(
    "contactModal"
  );


const contactButton =
  document.getElementById(
    "contactButton"
  );


const modalClose =
  document.getElementById(
    "modalClose"
  );


const modalBackdrop =
  document.querySelector(
    ".modal-backdrop"
  );


function openContactModal() {

  if (!modal) return;

  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeContactModal() {

  if (!modal) return;

  modal.classList.remove(
    "active"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


if (contactButton) {

  contactButton.addEventListener(
    "click",
    openContactModal
  );

}


if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeContactModal
  );

}


if (modalBackdrop) {

  modalBackdrop.addEventListener(
    "click",
    closeContactModal
  );

}


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeContactModal();

    }

  }
);


/* ================= CONTACT FORM ================= */

/*
  GANTI EMAIL DI BAWAH INI
  dengan email kamu.
*/

const MY_EMAIL =
  "hello@example.com";


const contactForm =
  document.getElementById(
    "contactForm"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "contactName"
        ).value.trim();


      const email =
        document.getElementById(
          "contactEmail"
        ).value.trim();


      const message =
        document.getElementById(
          "contactMessage"
        ).value.trim();


      const subject =
        `Portfolio message from ${name}`;


      const body =
`Halo Rayy,

Nama: ${name}
Email: ${email}

Pesan:
${message}`;


      const mailto =
        `mailto:${MY_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;


      window.location.href =
        mailto;


      showToast(
        "Membuka aplikasi email..."
      );

    }
  );

}


/* ================= TOAST ================= */

const toast =
  document.getElementById(
    "toast"
  );


let toastTimer;


function showToast(message) {

  if (!toast) return;


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2000
    );

}


/* ================= SMOOTH ANCHORS ================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      event => {

        const targetId =
          anchor.getAttribute(
            "href"
          );


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* ================= ACTIVE NAV ================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


const navLinks =
  document.querySelectorAll(
    '.nav a[href^="#"]'
  );


const sectionObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          const id =
            entry.target.id;


          navLinks.forEach(link => {

            link.classList.remove(
              "active"
            );


            if (
              link.getAttribute(
                "href"
              ) === `#${id}`
            ) {

              link.classList.add(
                "active"
              );

            }

          });

        }

      });

    },

    {
      rootMargin:
        "-35% 0px -55% 0px"
    }

  );


sections.forEach(
  section => {

    sectionObserver.observe(
      section
    );

  }
);


/* ================= PROFILE HOVER ================= */

/*
  Efek tilt hanya aktif pada
  perangkat yang punya pointer/mouse.

  Di HP tidak dipaksakan supaya
  tetap nyaman.
*/

const profileCard =
  document.querySelector(
    ".profile-card"
  );


if (
  profileCard &&
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches
) {

  profileCard.addEventListener(
    "mousemove",
    event => {

      const rect =
        profileCard.getBoundingClientRect();


      const x =
        event.clientX - rect.left;


      const y =
        event.clientY - rect.top;


      const rotateY =
        ((x / rect.width) - .5) * 5;


      const rotateX =
        ((y / rect.height) - .5) * -5;


      profileCard.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    }
  );


  profileCard.addEventListener(
    "mouseleave",
    () => {

      profileCard.style.transform =
        "";

    }
  );

}


/* ================= CONSOLE ================= */

console.log(
  "%c Rayy Portfolio ",
  "background:#927cff;color:white;padding:6px 10px;border-radius:6px;font-weight:bold;"
);

console.log(
  "Built with curiosity."
);