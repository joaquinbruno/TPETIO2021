document.addEventListener("DOMContentLoaded", cargarPagina);

function cargarPagina(){

    let valorcaptcha = "";
    let usuario = document.getElementById('user').value;
    let resultado = document.getElementById('resultcaptcha').value;



  





    function captcharandom(){

        let captcha1 = Math.floor((Math.random() * 9) + 1);
        let captcha2 = Math.floor((Math.random() * 9) + 1);
        let captcha3 = Math.floor((Math.random() * 9) + 1);
        let captcha4 = Math.floor((Math.random() * 9) + 1);
        let captcha5 = Math.floor((Math.random() * 9) + 1);
        resultado = "" + captcha1 + "" + captcha2 + "" + captcha3 + "" + captcha4 + "" + captcha5;
        document.getElementById('valuecaptcha').innerHTML = resultado;
        document.querySelector("#appear").classList.add("btnsend");
    }


    function verificar(){
        let input = document.getElementById('user').value;

        if (resultado == input){
            document.getElementById('resultcaptcha').innerHTML = "Es correcto";
            document.querySelector("#appear").classList.remove("btnsend");
        }else{
            document.getElementById('resultcaptcha').innerHTML = "Es falso";
            document.querySelector("#appear").classList.add("btnsend");
        }
    }
    
    
    function toggleMenu(){
        document.querySelector("#showmenu").classList.toggle("show");

    }
    
    let menubar = document.querySelector("#menu").addEventListener("click", toggleMenu);
    let button = document.querySelector("#btncheck").addEventListener('click', verificar);
    let chaptcharandom = document.querySelector("#btncaptcha").addEventListener('click', captcharandom);
    

}   