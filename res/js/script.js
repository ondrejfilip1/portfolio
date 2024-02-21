const cursor = document.querySelector(".js-cursor");
let mouseX = 0;
let mouseY = 0;

const moveCursor = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  requestAnimationFrame(updateCursor);
}

const updateCursor = () => {
  cursor.style.top = `${mouseY - 10}px`;
  cursor.style.left = `${mouseX - 10}px`;
  descriptionWork.style.left = `${mouseX}px`;
  descriptionWork.style.top = `${mouseY}px`;
}

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
  const invertFilter = document.documentElement.style.filter === "invert(1)";
  document.documentElement.style.filter = invertFilter ? "" : "invert(1)";
  // Invert colors of images
  images.forEach((element) => {
    element.style.filter = invertFilter ? "" : "invert(1)";
  });
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

const descriptionWork = document.querySelector('.description-work');
const workClass = document.querySelectorAll('.work');

const updateDescription = (e) => {
  let target = e.target;
  // find ID that starts with
  while (target && !target.id.startsWith('work-hover-')) {
    target = target.parentElement;
  }

  if (target && target.id.startsWith('work-hover-')) {
    switch (target.id) {
      case 'work-hover-1':
        descriptionWork.innerHTML = 'Paintings by Tim Lee<br><span class="yellow-text">Bootstrap, Custom CSS</span>';
        break;
      case 'work-hover-2':
        descriptionWork.innerHTML = 'Cookie clicker<br><span class="yellow-text">Custom CSS & JS</span>';
        break;
      case 'work-hover-3':
        descriptionWork.innerHTML = 'Modern school website<br><span class="yellow-text" style="">Bootstrap, Custom CSS</span>';
        break;
      default:
        descriptionWork.innerText = "";
    }
  }
}

document.addEventListener("mousemove", moveCursor);

const startFollowing = () => {
  document.addEventListener('mousemove', updateDescription);
  descriptionWork.style.opacity = "1";
  descriptionWork.style.scale = "1";
}

const stopFollowing = () =>  {
  document.removeEventListener('mousemove', updateDescription);
  descriptionWork.style.opacity = "0";
  descriptionWork.style.scale = "0.8";
}

workClass.forEach(function(workClasses) {
  workClasses.addEventListener('mouseover', startFollowing);
  workClasses.addEventListener('mouseout', stopFollowing);
});
