window.addEventListener("load", function () {
    const elements = document.getElementsByClassName("specialLetter");
    console.log(elements.length);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('animationend', function (e) {
            elements[i].classList.remove('letterBouce');
        });

        elements[i].addEventListener('mouseover', function (e) {
            elements[i].classList.add('letterBouce')
        })
    }
});

window.addEventListener("load", function () {
    const elements = document.getElementsByClassName("specialLetter2");
    console.log(elements.length);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('animationend', function (e) {
            elements[i].classList.remove('letterWiggle');
        });

        elements[i].addEventListener('mouseover', function (e) {
            elements[i].classList.add('letterWiggle')
        })
    }
});