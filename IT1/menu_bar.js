document.write(`
<div class="menu-bar" id="menuBar">
<h1 class="logo"><a href="index.html">IT1</a></h1>
<ul>
    <li><a href="index.html">Hjem</a></li>

    <li>
        <a href="#">Periodeplan <i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
            <ul>
                <li><a href="http://didrik147.github.io/IT1/periodeplan/periodeplan_blokkD.html" target="_blank">Blokk D</a></li>
                <li><a href="http://didrik147.github.io/IT1/periodeplan/periodeplan_blokkE.html" target="_blank">Blokk E</a></li>
            </ul>
        </div>
    </li>

    <li>
        <a href="#">Lenker <i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
            <ul>
                <li><a href="https://www.udir.no/lk20/inf01-02/kompetansemaal-og-vurdering/kv471" target="_blank">Læreplan IT1</a></li>

                <li><a href="https://aunivers.lokus.no/fagpakker/realfag/informasjonsteknologi-1-2/it-1" target="_blank">Digital lærebok (Aschehoug)</a></li>

                <li><a href="https://sandvika.it/#/" target="_blank">Fagstoff IT1 (Sandvika)</a></li>

                <li><a href="https://www.w3schools.com/html/default.asp" target="_blank">W3Schools</a></li>

                <li><a href="https://validator.w3.org/#validate_by_upload" target="_blank">HTML-validator</a></li>

                <li><a href="https://jigsaw.w3.org/css-validator/validator.html.en#validate_by_upload" target="_blank">CSS-validator</a></li>

                <li><a href="https://www.uutilsynet.no/nettsteder/losningsforslag-nettsider/36" target="_blank">Universell utforming</a></li>

            </ul>
        </div>
    </li>

    <li>
        <a href="#">Programvare <i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
            <ul>
                <li><a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a></li>
                <li><a href="https://www.audacityteam.org/" target="_blank">Audacity</a></li>
                <li><a href="https://inkscape.org/" target="_blank">Inkscape</a></li>
            </ul>
        </div>
    </li>
    
    <li><a href="filmer.html">Filmer</a></li>
    <li>
        <a href="#">Annet <i class="fas fa-caret-down"></i></a>
        <div class="dropdown-menu">
            <ul>
                <li><a href="http://didrik147.github.io/timeplan" target="_blank">Didriks timeplan</a></li>
                <li><a href="http://didrik147.github.io/hjelpeliste" target="_blank">Digital hjelpeliste</a></li>
            </ul>
        </div>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()"><i class="fa fa-bars fa-lg"></i></a>
    </li>
</ul>

</div>
`);


function myFunction() {
    var x = document.getElementById("menuBar");
    if (x.className === "menu-bar") {
        x.className += " responsive";
    } else {
        x.className = "menu-bar";
    }
}