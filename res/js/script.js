const cursor = document.querySelector(".js-cursor");
const grid = document.querySelector(".grid");
const gradientText = document.querySelector(".gradient-text");
let mouseX = 0;
let mouseY = 0;
let scrollOffset = 0;

document.body.onload = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  if (randomNumber == 0) {
    gradientText.style.background = "-webkit-linear-gradient(0deg, #642b73, #c6426e, #642b73, #c6426e)";
  } else if (randomNumber == 1) {
    gradientText.style.background = "-webkit-linear-gradient(0deg, #4568dc, #b06ab3, #4568dc, #b06ab3)";
  } else if (randomNumber == 2) {
    gradientText.style.background = "-webkit-linear-gradient(0deg, #ff5f6d, #ffc371, #ff5f6d, #ffc371)";
  } else if (randomNumber == 3) {
    gradientText.style.background = "-webkit-linear-gradient(0deg, #f3904f, #574931, #f3904f, #574931)";
  }
  gradientText.style.backgroundSize = "400% 400%";
  gradientText.style.webkitBackgroundClip = "text";
}

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

const updateGridPos = () => {
  scrollOffset = document.body.scrollHeight - window.innerHeight - window.scrollY;
  grid.style.maskPosition = `calc(${mouseX}px - 28%) calc(${mouseY}px - 16vw - ${scrollOffset}px)`;
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
  gradientText.style.filter = invertFilter ? "" : "invert(1)";
  document.querySelectorAll(".yellow-text").forEach((element) => {
    element.style.filter = invertFilter ? "" : "invert(1)";
    element.style.color =  invertFilter ? "#ffc400" : "#000";
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
let currentDescription = ""; // store current desc

const updateDescription = (e) => {
  let target = e.target;
  // find ID that starts with
  while (target && !target.id.startsWith('work-hover-')) {
    target = target.parentElement;
  }

  if (target && target.id.startsWith('work-hover-')) {
    let newDescription = ""; // store new desc
    switch (target.id) {
      case 'work-hover-1':
        newDescription = 'Paintings by Tim Lee<br><span class="yellow-text">Bootstrap, Custom CSS</span>';
        break;
      case 'work-hover-2':
        newDescription = 'Cookie clicker<br><span class="yellow-text">Custom CSS & JS</span>';
        break;
      case 'work-hover-3':
        newDescription = 'Modern school website<br><span class="yellow-text" style="">Bootstrap, Custom CSS</span>';
        break;
      default:
        newDescription = "";
    }

    // updating overload fix
    if (newDescription !== currentDescription) {
      descriptionWork.innerHTML = newDescription;
      const invertFilter = document.documentElement.style.filter !== "invert(1)";
      document.querySelectorAll(".yellow-text").forEach((element) => {
        element.style.filter = invertFilter ? "" : "invert(1)";
        element.style.color =  invertFilter ? "#ffc400" : "#000";
      });
      currentDescription = newDescription; // update current desc
    }
  }
}

document.addEventListener("mousemove", (e) => {
  moveCursor(e);
  updateDescription(e);
  requestAnimationFrame(updateGridPos);
});

document.addEventListener("scroll", (e) => {
  requestAnimationFrame(updateGridPos);
});

const startFollowing = () => {
  descriptionWork.style.opacity = "1";
  descriptionWork.style.scale = "1";
}

const stopFollowing = () =>  {
  descriptionWork.style.opacity = "0";
  descriptionWork.style.scale = "0.8";
}

workClass.forEach(workClasses => {
  workClasses.addEventListener('mouseover', startFollowing);
  workClasses.addEventListener('mouseout', stopFollowing);
});
