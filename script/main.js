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

function optionAJAXGet() {
    if (metodo == "xhr")
        getIDXHR();
    else if (metodo == "fetch")
        getIDFetch();
    else
        getIDJQuery();
}

function optionAJAXPost() {
    if (metodo == "xhr")
        postXHR();
    else if (metodo == "fetch")
        postFetch();
    else
        postJQuery();
}

function getTiendasXHR() {   //MOSTRAR TIENDAS XHR
    loader();
    let conection = new XMLHttpRequest();
    conection.addEventListener('readystatechange', () => {
        if (conection.readyState === 4 && conection.status === 200) {
            let data = conection.responseText;
            data = JSON.parse(data);
            sacarLista(data);
        }
    })
    conection.open("GET", "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/", true);
    conection.send();

    console.log("Mostrado por peticion XHR");
}

async function getTiendasJQuery() {    //MOSTRAR TIENDAS JQUERY 
    loader();
    await $.ajax({
        type: "GET",
        dataType: "json",
        url: 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/',
        success: data => {
            // en data tenemos lo recibido
            sacarLista(data);
        },
        error: () => {
            alert("error");
        }
    });

    console.log("Mostrado por peticion JQuery");
}

async function getTiendasFetch() {     //MOSTRAR TIENDAS FETCH
    loader();
    await fetch('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/')
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            sacarLista(data);
        })
        .catch(error => {
            console.log(error);
        });

    console.log("Mostrado por peticion Fetch");
}

function sacarLista(data) {
    borrarNodo(main);
    let containerMenu = crearNodo("div", "", [], [{ name: "id", value: "containerMenu" }]);
    let botonTienda = crearNodo("button", "Nueva tienda", [], [{ name: "id", value: "nuevaTienda" }])
    botonTienda.addEventListener('click', () => {      //hacer transición formulario
        if (divFormulario.classList.contains("abierto")) {
            document.getElementById("divFormulario").classList.replace("abierto", "cerrado");
        }
        else {
            document.getElementById("divFormulario").classList.replace("cerrado", "abierto");
        }
    });
    containerMenu.appendChild(botonTienda);
    let containerBuscar = crearNodo("div", "", [], []);
    containerBuscar.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Buscar tienda por ID" }, { name: "value", value: "" }, { name: "id", value: "buscarId" }]));
    let botonBuscar = crearNodo("button", "🔍", [], [{name:"id", value:"botonLupa"}]);
    botonBuscar.addEventListener('click', optionAJAXGet);
    containerBuscar.appendChild(botonBuscar);
    containerMenu.appendChild(containerBuscar);
    let containerTienda = crearNodo("div", "", [], [{ name: "id", value: "containerTienda" }]);
    let divFormulario = crearNodo("div", "", ["tienda", "cerrado"], [{ name: "id", value: "divFormulario" }]);
    divFormulario.appendChild(crearNodo("h2", "Nueva empresa", [], []));
    let divInputs = crearNodo("div", "", [], [{ name: "id", value: "formulario" }]);
    divInputs.appendChild(crearNodo("h4", "Nombre", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Nombre de la empresa" }, { name: "value", value: "" }, { name: "id", value: "name" }]));
    divInputs.appendChild(crearNodo("h4", "Dirección", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Dirección de la empresa" }, { name: "value", value: "" }, { name: "id", value: "direction" }]));
    divInputs.appendChild(crearNodo("h4", "Localidad", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Localidad de la empresa" }, { name: "value", value: "" }, { name: "id", value: "location" }]));
    divInputs.appendChild(crearNodo("h4", "Teléfono", [], []));
    divInputs.appendChild(crearNodo("input", "", [], [{ name: "type", value: "text" }, { name: "placeholder", value: "Teléfono de la empresa" }, { name: "value", value: "" }, { name: "id", value: "telephone" }]));
    divFormulario.appendChild(divInputs);
    let divBoton = crearNodo("div", "", [], [{ name: "id", value: "containerBoton" }]);
    let botonAdd = crearNodo("button", "Añadir tienda", [], [{ name: "id", value: "addStore" }])
    botonAdd.addEventListener('click', optionAJAXPost);
    divBoton.appendChild(botonAdd);
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

async function getIDXHR() {   //BUSCAR TIENDA XHR
    let client = new XMLHttpRequest();
    borrarNodo(document.getElementById("containerTienda"));
    let id = document.getElementById("buscarId").value;
    if (id != null || id == undefined || id == "") {
        client.addEventListener("readystatechange", () => {
            if (client.readyState === 4 && client.status === 200) {
                let data = client.responseText;
                data = JSON.parse(data);
                let dataArr = [];
                dataArr.push(data);
                sacarLista(dataArr);
            }
        });

        client.open("GET", "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/" + id);
        client.send();
    }
    else
        console.log("Hubo un error al buscar la tienda");
}

async function getIDFetch() {    //BUSCAR TIENDA FETCH
    let id = document.getElementById("buscarId").value;
    await fetch('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/' + id)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);
            let dataArr = [];
            dataArr.push(data);
            sacarLista(dataArr);
        })
        .catch(error => {
            console.log(error);
        });
}

function getIDJQuery() {
    let id = document.getElementById("buscarId").value;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/' + id,
        success: data => {
            let dataArr = [];
            dataArr.push(data);
            sacarLista(dataArr);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

async function postXHR() {    //POST XHR
    let data = info();
    if (data != -1) {
        let http = new XMLHttpRequest();
        http.open('POST', 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/', true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function () {
            getTiendasXHR();
        }
        http.send(JSON.stringify(data));
    }
}

async function postFetch() {    //POST TIENDA FETCH
    let data = info();
    await fetch('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    getTiendasFetch();
}

async function postJQuery(){    //POST TIENDA JQUERY
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(info()),
        url: 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/',
        
    })
    .fail(console.log("Hubo errores al introducir la tienda(?)"))
    .always(getTiendasJQuery())
}

function info() {
    let info = {
        nombreTienda: document.getElementById("name").value,
        direccion: document.getElementById("direction").value,
        localidad: document.getElementById("location").value,
        telefono: document.getElementById("telephone").value
    };
    return info;
}

function loader() {
    borrarNodo(main);
    let img = crearNodo("img", "", ["loader"], [{ name: "src", value: "./img/loading.png" }]);
    main.appendChild(img);
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