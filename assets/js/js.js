// Variables globales
let registros = [];
let sessionStorageRegistros = sessionStorage.getItem("registros");



// Función para agregar un registro
function agregarRegistro(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let id = document.getElementById("id").value;

    if (nombre != "" || correo != "" || id != "") { // Si nombre es distinto de vacio y correo, ID es distinto de vacio, ejecuta el código

        // Crear un nuevo registro
        let registro = {
            nombre: nombre,
            correo: correo,            
            id: id,
        };

        // Agregar el registro al arreglo
        registros.push(registro);

        // Guardar los registros en sesión storage
        guardarRegistrosEnStorage();

        // Limpiar los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("id").value = "";

        // Mostrar el registro en la tabla
        mostrarRegistros();
    }
}



// Función para mostrar los registros
function mostrarRegistros() {
    // Vaciar la tabla
    let tbody = document.querySelector("#registros tbody");
    tbody.innerHTML = "";

    // Recorrer el arreglo de registros
    for (let i = 0; i < registros.length; i++) {
        let registro = registros[i];

        // Crear una nueva fila en la tabla
        let fila = document.createElement("tr");
        fila.dataset.id = i; // Usar un identificador único para la fila

        // Agregar las celdas a la fila
        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = registro.nombre;
        fila.appendChild(celdaNombre);

        let celdaCorreo = document.createElement("td");
        celdaCorreo.textContent = registro.correo;
        fila.appendChild(celdaCorreo);

        let celdaId = document.createElement("td");
        celdaId.textContent = registro.id;
        fila.appendChild(celdaId);




        // Agregar un botón para editar el registro
        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "button-editar";
        botonEditar.name = "botonEditar";
        botonEditar.addEventListener("click", () => editarRegistro(i));
        let tdEditar = document.createElement("td");
        tdEditar.appendChild(botonEditar);
        fila.appendChild(tdEditar);




        // Agregar un botón para eliminar el registro
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "button-eliminar"
        botonEliminar.name = "botonEliminar"
        botonEliminar.addEventListener("click", () => eliminarRegistro(i));

        tdEditar.appendChild(botonEliminar);
        fila.appendChild(tdEditar);

        // Agregar la fila a la tabla
        tbody.appendChild(fila);
    }
}




// Función para editar un registro
function editarRegistro(index) {
    // Obtener el registro por su índice
    let registro = registros[index];

    // Encontrar la fila correspondiente al registro
    let fila = document.querySelector(`tr[data-id="${index}"]`);

    // Crear inputs para editar los campos
    let inputNombre = document.createElement("input");
    inputNombre.value = registro.nombre;
    inputNombre.className = "form-control";

    let inputCorreo = document.createElement("input");
    inputCorreo.value = registro.correo;
    inputCorreo.className = "form-control";

    let inputId = document.createElement("input");
    inputId.value = registro.id;
    inputId.className = "form-control";






    // Reemplazar el texto estático con inputs en la fila
    fila.querySelector("td:first-child").textContent = "";
    fila.querySelector("td:first-child").appendChild(inputNombre);
    fila.querySelector("td:nth-child(2)").textContent = "";
    fila.querySelector("td:nth-child(2)").appendChild(inputCorreo);
    fila.querySelector("td:nth-child(3)").textContent = "";
    fila.querySelector("td:nth-child(3)").appendChild(inputId);







    // Reemplazar el botón "Editar" por "Guardar" y "Cancelar"
    let botonEditar = fila.querySelector("button[name='botonEditar']");
    botonEditar.style.display = "none"; // Ocultar el botón "Editar"
    let botonEliminar = fila.querySelector("button[name = 'botonEliminar']");
    botonEliminar.style.display = "none"; // Ocultar el botón "Editar"




    let botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar";
    botonGuardar.className = "button-guardar"
    botonGuardar.addEventListener("click", () => guardarEdicion(index, inputNombre, inputCorreo, inputId));
    let tdEditar = fila.querySelector("td:nth-child(4)");
    tdEditar.appendChild(botonGuardar);





    let botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.className = "button-cancelar"
    botonCancelar.addEventListener("click", () => cancelarEdicion(index, botonEditar, botonEliminar, botonGuardar, botonCancelar));
    tdEditar.appendChild(botonCancelar);
}






// Función para guardar la edición
function guardarEdicion(index, inputNombre, inputCorreo, inputId) {
    // Actualizar los datos del registro con los valores de los inputs
    registros[index].nombre = inputNombre.value.trim();
    registros[index].correo = inputCorreo.value.trim();
    registros[index].id = inputId.value.trim();


    // Guardar los registros en sesión storage
    guardarRegistrosEnStorage();

    // Mostrar el registro actualizado en la tabla
    mostrarRegistros();
}





// Función para cancelar la edición
function cancelarEdicion(index, botonEditar, botonEliminar, botonGuardar, botonCancelar) {
    // Restaurar los valores originales en la fila
    let fila = document.querySelector(`tr[data-id="${index}"]`);
    let registro = registros[index];
    fila.querySelector("td:first-child").textContent = registro.nombre;
    fila.querySelector("td:nth-child(2)").textContent = registro.correo;
    fila.querySelector("td:nth-child(3)").textContent = registro.id;


    // Restaurar el botón "Editar"
    botonEditar.style.display = "inline";
    botonEliminar.style.display = "inline";
    botonGuardar.style.display = "none";
    botonCancelar.style.display = "none";
}





// Función para eliminar un registro
function eliminarRegistro(index) {
    // Eliminar el registro del arreglo
    registros.splice(index, 1);

    // Guardar los registros en sesión storage
    guardarRegistrosEnStorage();

    // Mostrar los registros restantes en la tabla
    mostrarRegistros();
}





// Función para guardar los registros en sessionStorage
function guardarRegistrosEnStorage() {
    sessionStorage.setItem("registros", JSON.stringify(registros));
}

// Eventos
document.querySelector("form").addEventListener("submit", agregarRegistro);

// Inicializar
if (sessionStorageRegistros) {
    registros = JSON.parse(sessionStorageRegistros);
    mostrarRegistros();
}