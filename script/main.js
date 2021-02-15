const client = new XMLHttpRequest();

document.getElementById("xhr").addEventListener('click', pruebaXHR);
document.getElementById("fetch").addEventListener('click', pruebaFetch);
document.getElementById("jquery").addEventListener('click', pruebaJQuery);
let main = document.getElementsByTagName("main")[0];

function pruebaXHR() {

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

function pruebaJQuery() {
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

async function pruebaFetch() {
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
    containerMenu.appendChild(crearNodo("a", "Nueva tienda", [], [{name:"href", value:""}, {name:"id", value:"linkDesplegable"}]));
    let containerBuscar = crearNodo("div", "", [], []);
    containerBuscar.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Buscar tienda por ID" }, { name: "value", value: "" }, {name:"id", value:"buscarId"}]));
    containerBuscar.appendChild(crearNodo("button", "🔍", [], []));
    containerMenu.appendChild(containerBuscar);
    let containerTienda = crearNodo("div", "", [], [{ name: "id", value: "containerTienda" }]);
    let divFormulario = crearNodo("div", "", ["tienda"], [{name:"id", value:"divFormulario"}]);
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
let a = document.getElementById("linkDesplegable").addEventListener('click', () => {      //hacer transición
    document.getElementById("divFormulario").style.display="none";
});

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