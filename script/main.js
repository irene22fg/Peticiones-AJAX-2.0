const client = new XMLHttpRequest();
let metodo;

document.getElementById("xhr").addEventListener('click', () => {
    metodo = "xhr";
    getTiendasXHR();
});
document.getElementById("fetch").addEventListener('click', () => {
    metodo = "fetch";
    getTiendasFetch();
});
document.getElementById("jquery").addEventListener('click', () => {
    metodo = "jquery";
    getTiendasJQuery();
});
let main = document.getElementsByTagName("main")[0];

function optionAJAXGet(){

    if(metodo == "XHR")
        getIDXHR();
    else if(metodo == "fetch")
        getIDFetch();
    else
        getIDJQuery();
}

function getIDXHR(){
    if (client.readyState === 4 && client.status === 200) {
        let data = client.responseText;
        data = JSON.parse(data);
        console.log(data);
        borrarNodo(main);
        sacarLista(data);
    }
    client.open("GET", "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/", true);
    client.send();

    console.log("Mostrado por peticion XHR");
}

function getTiendasXHR() {

    if (client.readyState === 4 && client.status === 200) {
        let data = client.responseText;
        data = JSON.parse(data);
        console.log(data);
        borrarNodo(main);
        sacarLista(data);
    }
    client.open("GET", "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/", true);
    client.send();

    console.log("Mostrado por peticion XHR");
}

function getTiendasJQuery() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/',
        success: data => {
            // en data tenemos lo recibido
            console.log(data);
            borrarNodo(main);
            sacarLista(data);
        },
        error: () => {
            alert("error");
        },
        always: () => {
            console.log("complete");
        }
    });

    console.log("Mostrado por peticion JQuery");
}

async function getTiendasFetch() {
    await fetch('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/')
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            console.log(data);
            borrarNodo(main);
            sacarLista(data);
        })
        .catch(error => {
            console.log(error);
        });

    console.log("Mostrado por peticion Fetch");
}

function sacarLista(data) {
    let containerMenu = crearNodo("div", "", [], [{ name: "id", value: "containerMenu" }]);
    let botonTienda = crearNodo("button", "Nueva tienda", [], [{name:"id", value:"nuevaTienda"}])
    botonTienda.addEventListener('click', () => {      //hacer transición formulario
        if(divFormulario.classList.contains("abierto")){
            document.getElementById("divFormulario").classList.replace("abierto", "cerrado");
        }
        else{
            document.getElementById("divFormulario").classList.replace("cerrado", "abierto");
        }
    });
    containerMenu.appendChild(botonTienda);
    let containerBuscar = crearNodo("div", "", [], []);
    containerBuscar.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Buscar tienda por ID" }, { name: "value", value: "" }, {name:"id", value:"buscarId"}]));
    let botonBuscar = crearNodo("button", "🔍", [], []);
    botonBuscar.addEventListener('click', optionAJAXGet());
    containerBuscar.appendChild(botonBuscar);
    containerMenu.appendChild(containerBuscar);
    let containerTienda = crearNodo("div", "", [], [{ name: "id", value: "containerTienda" }]);
    let divFormulario = crearNodo("div", "", ["tienda", "abierto"], [{name:"id", value:"divFormulario"}]);
    divFormulario.appendChild(crearNodo("h2", "Nueva empresa", [], []));
    let divInputs = crearNodo("div", "", [], [{name:"id", value:"formulario"}]);
    divInputs.appendChild(crearNodo("h4", "Nombre", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Nombre de la empresa" }, { name: "value", value: "" }, {name:"id", value:"name"}]));
    divInputs.appendChild(crearNodo("h4", "Dirección", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Dirección de la empresa" }, { name: "value", value: "" }, {name:"id", value:"direction"}]));
    divInputs.appendChild(crearNodo("h4", "Localidad", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Localidad de la empresa" }, { name: "value", value: "" }, {name:"id", value:"location"}]));
    divInputs.appendChild(crearNodo("h4", "Teléfono", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Teléfono de la empresa" }, { name: "value", value: "" }, {name:"id", value:"telephone"}]));
    divFormulario.appendChild(divInputs);
    let divBoton = crearNodo("div", "", [], [{name:"id", value:"containerBoton"}]);
    divBoton.appendChild(crearNodo("button", "Añadir tienda", [], [{name:"id", value:"addStore"}]));
    divFormulario.appendChild(divBoton);
    containerTienda.appendChild(divFormulario);
    data.forEach(tienda => {
        let divContainer = crearNodo("div", "", ["tienda"], []);
        divContainer.appendChild(crearNodo("h2", tienda.nombreTienda, [], []));
        divContainer.appendChild(crearNodo("p", tienda.direccion + " (" + tienda.localidad + ")", [], []));
        divContainer.appendChild(crearNodo("p", tienda.telefono, [], []));
        containerTienda.appendChild(divContainer);
    });
    main.appendChild(containerMenu);
    main.appendChild(containerTienda);
}

function borrarNodo(nodo) {
    while (nodo.firstChild) {
        nodo.removeChild(nodo.lastChild);
    }
};

function crearNodo(tipo, texto, clases, atributos) {     //función CREAR NODO
    let nodo = document.createElement(tipo);
    if (texto != "" && texto != null) {
        nodo.appendChild(document.createTextNode(texto));
    }
    if (clases.length > 0) {
        clases.forEach(clase => nodo.classList.add(clase));
    }
    if (atributos.length > 0) {
        atributos.forEach(atributo => nodo.setAttribute(atributo.name, atributo.value));
    }
    return nodo;
}