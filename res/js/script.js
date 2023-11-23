const cursor = document.querySelector(".js-cursor");

function moveCursor(e) {
  cursor.style.transform = `translate(${e.clientX - 10}px, ${
    e.clientY - 10
  }px)`;
}

document.addEventListener("mousemove", moveCursor);

const biggerCursor = document.querySelectorAll(".bigger-cursor");

biggerCursor.forEach((element) => {
  element.addEventListener("mouseover", () => {
    cursor.classList.add("hovered");
  });

  element.addEventListener("mouseout", () => {
    cursor.classList.remove("hovered");
  });
});

const linkCursor = document.querySelectorAll(".link-cursor");

linkCursor.forEach((element) => {
  element.addEventListener("mouseover", () => {
    cursor.classList.add("hovered-link");
  });

  element.addEventListener("mouseout", () => {
    cursor.classList.remove("hovered-link");
  });
});

document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  cursor.style.opacity = "1";
});

const checkbox = document.getElementById("dark-light-mode");
const images = document.querySelectorAll(".image");
checkbox.addEventListener("change", () => {
  if (document.documentElement.style.filter === "invert(1)") {
    document.documentElement.style.filter = "";
    images.forEach((element) => {
      element.style.filter = "";
    });
  } else {
    document.documentElement.style.filter = "invert(1)";
    images.forEach((element) => {
      element.style.filter = "invert(1)";
    });
  }
});

/* https://webdesign.tutsplus.com/animate-on-scroll-with-javascript--cms-36671t */
/* Thanks for the scrolling effect :3 */

const scrollElements = document.querySelectorAll(".onScroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

let isScrollingUp = false;
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  isScrollingUp = currentScroll < lastScrollTop;

  handleScrollAnimation();

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
