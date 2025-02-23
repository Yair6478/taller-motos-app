// Función para manejar el envío del formulario de agendar cita
function enviarFormulario() {
    // Obtenemos los valores del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;
    var mensaje = document.getElementById("mensaje").value;
  
    // Validación básica del formulario
    if (nombre === "" || email === "" || telefono === "" || mensaje === "") {
      alert("Por favor, completa todos los campos.");
      return false; // Evitar el envío del formulario
    }
  
    // Mostrar un mensaje de éxito (para demostrar que el formulario se envió)
    alert("¡Gracias, " + nombre + "! Tu cita ha sido agendada.");
  
    // Limpiar los campos del formulario
    document.getElementById("form-agendar").reset();
  
    return true; // Permite el envío del formulario (aunque en este caso solo muestra un mensaje)
  }
  
  // Función para mostrar la sección de servicios de forma dinámica
  function mostrarServicios() {
    // Definir servicios
    const servicios = [
      { nombre: "Lavado de Moto", descripcion: "Limpieza completa de tu motocicleta para dejarla como nueva." },
      { nombre: "Mantenimiento General", descripcion: "Revisión y mantenimiento de todas las partes esenciales de tu moto." },
      { nombre: "Cambio de Aceite", descripcion: "Reemplazo del aceite de tu moto para mantenerla en óptimas condiciones." }
    ];
  
    // Obtener el contenedor donde se mostrarán los servicios
    var contenedorServicios = document.getElementById("contenedor-servicios");
  
    // Crear el HTML dinámicamente
    servicios.forEach(function(servicio) {
      var card = document.createElement("div");
      card.classList.add("card");
  
      var h3 = document.createElement("h3");
      h3.textContent = servicio.nombre;
  
      var p = document.createElement("p");
      p.textContent = servicio.descripcion;
  
      card.appendChild(h3);
      card.appendChild(p);
  
      contenedorServicios.appendChild(card);
    });
  }
  
  // Cargar los servicios cuando la página esté completamente cargada
  window.onload = function() {
    mostrarServicios();
  };
  