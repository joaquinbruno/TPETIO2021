document.addEventListener("DOMContentLoaded", cargarPagina);
function cargarPagina(){


let menu = document.querySelector("#menu").addEventListener("click", toggleMenu);

    function toggleMenu() {
        document.querySelector("#showmenu").classList.toggle("show");

    }

};