const burgerEl = document.querySelector('.fa-bars')

const navUlEl = document.querySelector('nav ul')

burgerEl.addEventListener('click', showNav)

function showNav(){
    navUlEl.classList.toggle('show')
}