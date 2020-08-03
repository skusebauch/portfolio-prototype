// page transitions
const home = document.querySelector("#list-home");
const projects = document.querySelector("#list-projects");
const contact = document.querySelector("#list-contact");

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        home.classList.add("active");
        home.href = "./index.html";
        projects.href = "../projects/";
        contact.href = "../contact/";
      },
      beforeLeave() {
        home.classList.remove("active");
      },
    },
    {
      namespace: "projects",
      beforeEnter() {
        projects.classList.add("active");
        home.href = "../index.html";
        projects.href = "./index.html";
        contact.href = "../contact/";
      },
      beforeLeave() {
        projects.classList.remove("active");
      },
    },
    {
      namespace: "contact",
      beforeEnter() {
        contact.classList.add("active");
        contact.href = "../index.html";
        projects.href = "../projects/";
        contact.href = "./index.html";
      },
      beforeLeave() {
        contact.classList.remove("active");
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 0.5, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        // scroll to top
        window.scrollTo(0, 0);
        // Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(".swipe", 0.75, { x: "0" }, { x: "100%", onComplete: done });
        tl.fromTo(next.container, 0.5, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});

$(document).ready(function () {
  const menuBtn = $("a");

  menuBtn.click(() => {
    setTimeout(() => {
      removeHash();
    }, 5);
  });

  function removeHash() {
    history.replaceState(
      "",
      document.title,
      window.location.origin + window.location.pathname + window.location.search
    );
  }
});
