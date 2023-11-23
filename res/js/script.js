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

/* mix-blend-mode: difference*/
