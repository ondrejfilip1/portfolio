const cursor = document.querySelector('.js-cursor');

function moveCursor(e) {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
}

document.addEventListener('mousemove', moveCursor);

const biggerCursor = document.querySelectorAll('.bigger-cursor');

biggerCursor.forEach((element) => {
    element.addEventListener('mouseover', () => {
        cursor.classList.add('hovered');
    });

    element.addEventListener('mouseout', () => {
        cursor.classList.remove('hovered');
    });
});

const linkCursor = document.querySelectorAll('.link-cursor');

linkCursor.forEach((element) => {
    element.addEventListener('mouseover', () => {
        cursor.classList.add('hovered-link');
    });

    element.addEventListener('mouseout', () => {
        cursor.classList.remove('hovered-link');
    });
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});