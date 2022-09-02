navEl = document.querySelector('nav')

navEl.innerHTML = `
    <a href="index.html">Home</a>
    <a href="#" class="hamburger">
        <i class="fa fa-bars fa-lg"></i>
    </a>
    <ul>
        <li><a href="hiragana.html">Hiragana</a></li>
        <li><a href="katakana.html">Katakana</a></li>
    </ul>
`

/* Hamburger menu */
hamburgerEl = document.querySelector('.hamburger')
ulEl = document.querySelector('ul')
mainEl = document.querySelector('main')


hamburgerEl.addEventListener('click', () => {
    ulEl.classList.toggle('show')
})

mainEl.addEventListener('click', () => {
    if (ulEl.classList.contains('show')) {
        ulEl.classList.toggle('show')
    }
})