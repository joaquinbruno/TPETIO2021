"use strict";

document.addEventListener("DOMContentLoaded", cargarPagina);
function cargarPagina() {

  
let boton = document.querySelector("#btnAgregar").addEventListener("click", agregar);
  let botonBorrar = document.querySelector("#btnBorrar").addEventListener("click", borrarTodo);
  let botonOfertas = document.querySelector("#btnAgregarx3").addEventListener("click", ofertas);
  let inputedit = document.querySelector("#btn-editar").addEventListener("click", MenuEdit);
  let filtracion = document.querySelector("#btnfiltrado").addEventListener("click", filtrar);
  let menu = document.querySelector("#menu").addEventListener("click", toggleMenu)
  
  
    function MenuEdit() {
      document.querySelector("#menu-edit").classList.remove("editar");
    }
    function toggleMenu() {
      document.querySelector("#showmenu").classList.toggle("show");

  }
  let url = "http://web-unicen.herokuapp.com/api/groups/116bruno_joaquin/productos/"
  let tabla = document.getElementById("tablaingresos");

  mostrarTabla();
  
  async function agregar(event) {
    event.preventDefault();
    let marca = document.getElementById("marca").value;
    let tipo = document.getElementById("tipo").value;
    let precio = document.getElementById("precio").value;
    let modelo = document.getElementById("modelo").value;

    let productoingresado = {
      "thing": {
        "marca": marca,
        "tipo": tipo,
        "precio": precio,
        "modelo": modelo
      }
    };

    cargarTabla(productoingresado);

  }

  async function cargarTabla(productoingresado) {
    try {
      let r = await fetch(url, {
        "method": "POST",
        "mode": "cors",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(productoingresado)
      })
      await r.json();
      mostrarTabla();
    }
    catch (e) {
      console.log(e);
    }
  };

  async function filtrar(){
    let filtroProducto = [];
        let filtro = document.getElementById("filtrado").value;
        console.log(filtro);
        
        try{
            let r = await fetch (url);
            let json = await r.json();
            for (const elem of json.productos) {
                
                if (elem.thing.tipo == filtro){
                  filtroProducto.push(elem.thing);
                  console.log(filtro);
                }
            }
            tabla.innerHTML = "";
            console.log(filtroProducto);
            
            for (let i = 0; i < filtroProducto.length; i++) {
              let id = filtroProducto[i]._id;   
          tabla.innerHTML += `<tr>
              <td>${filtroProducto[i].tipo}</td>
              <td>${filtroProducto[i].marca}</td>
              <td>${filtroProducto[i].modelo}</td>
              <td>${filtroProducto[i].precio}</td>
              <td><button id="botonBorrar" value="${id}">Borrar</button>
              <button id="botonEditar" value="${id}">Editar</button></td>                 
              <tr>`
            }
            console.log(filtroProducto);
            let botonBorrar = document.querySelectorAll("#botonBorrar");
      for (let element of botonBorrar) {
        element.addEventListener("click", borrarFila);
      }
      let botonEditar = document.querySelectorAll("#botonEditar");
      for (let element of botonEditar) {
        element.addEventListener("click", editarProducto);
      }
        }
        catch(e){
            console.log(e);
        }
  }
  
  async function mostrarTabla() {


    try {
      let r = await fetch(url);
      let json = await r.json();
      tabla.innerHTML = "";
      
      for (let i = 0; i < json.productos.length; i++) {
        let id = json.productos[i]._id;

        tabla.innerHTML += `<tr>
                                          <td>${json.productos[i].thing.tipo}</td>
                                          <td>${json.productos[i].thing.marca}</td>
                                          <td>${json.productos[i].thing.modelo}</td>
                                          <td>${json.productos[i].thing.precio}</td>
                                            <td><button id="botonBorrar" value="${id}">Borrar</button>
                                            <button id="botonEditar" value="${id}">Editar</button></td>                 
                                         <tr>`



      }
      let botonBorrar = document.querySelectorAll("#botonBorrar");
      for (let element of botonBorrar) {
        element.addEventListener("click", borrarFila);
      }
      let botonEditar = document.querySelectorAll("#botonEditar");
      for (let element of botonEditar) {
        element.addEventListener("click", editarProducto);
      }


    }
    catch (e) {
      console.log(e);
    }
  };

  async function borrarTodo(event) {
    event.preventDefault();
    try {
      let r = await fetch(url);
      let json = await r.json();
      for (const elem of json.productos) {
        

        let borrado = url + elem._id;

        await fetch(borrado, {
          "method": "DELETE"
        });
      }
      mostrarTabla();

    }
    catch (e) {
      console.log(e);

    }
  }

  async function editarProducto() {

    let id = this.getAttribute("value");
    let editProducto = {
      "thing": {
        "tipo": document.getElementById("edit_tipo").value,
        "marca": document.getElementById("edit_marca").value,
        "modelo": document.getElementById("edit_modelo").value,
        "precio": document.getElementById("edit_precio").value,

      }
    }

    

       fetch(url + id, {
        "method": "PUT",
        "mode": "cors",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(editProducto)

      }).then(function (r) {
        if (!r.ok) {
          console.log("Mostrar Error en HTML");
        }
        return r.json()
      })
        .then(function () {
          mostrarTabla();
        })
        .catch(function (e) {
          console.log(e);
        });
   
  };
  async function borrarFila() {

    let id = this.getAttribute("value");

    fetch(url + id, {
      "method": "DELETE",
      "headers": { "Content-Type": "application/json" }

    }
    ).then(function (r) {
      if (!r.ok) {
        console.log("Mostrar Error de borrar");
      }
      return r.json()
    })
      .then(function (json) {
        mostrarTabla();
      })
      .catch(function (e) {
        console.log(e)
      })

  };
  async function ofertas(event) {
    event.preventDefault();
    let oferta1 =
    {
      "thing": {
        "marca": "Nvidia",
        "modelo": "1650",
        "tipo": "Placa de Video",
        "precio": "30.000"
      }
    };

    let oferta2 =
    {
      "thing": {
        "marca": "Intel",
        "modelo": "I5 7200",
        "tipo": "Procesador",
        "precio": "25.000"
      }
    };

    let oferta3 = {
      "thing": {
        "marca": "AMD",
        "tipo": "Procesador",
        "modelo": "Ryzen 5",
        "precio": "13.000"
      }
    };

    cargarTabla(oferta1);
    cargarTabla(oferta2);
    cargarTabla(oferta3);

  }

}
