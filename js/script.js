document.addEventListener('DOMContentLoaded', function() {
    const formAgendar = document.getElementById('form-agendar');
    const ventanaConfirmacion = document.getElementById('ventana-confirmacion');
    const datosCita = document.getElementById('datos-cita');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const btnModificar = document.getElementById('btn-modificar');

    function mostrarMensaje(elemento, mensaje, esError = true) {
        elemento.textContent = mensaje;
        elemento.style.color = esError ? 'red' : 'green';
    }

    formAgendar.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        let errores = [];

        if (!nombre) {
            errores.push({ campo: 'nombre', mensaje: 'El nombre es requerido.' });
        }

        if (!email) {
            errores.push({ campo: 'email', mensaje: 'El email es requerido.' });
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errores.push({ campo: 'email', mensaje: 'Por favor, ingrese un email válido.' });
            }
        }

        if (!telefono) {
            errores.push({ campo: 'telefono', mensaje: 'El teléfono es requerido.' });
        }

        if (!fecha) {
            errores.push({ campo: 'fecha', mensaje: 'La fecha es requerida.' });
        }

        if (!hora) {
            errores.push({ campo: 'hora', mensaje: 'La hora es requerida.' });
        }

        if (!mensaje) {
            errores.push({ campo: 'mensaje', mensaje: 'El mensaje es requerido.' });
        }

        if (errores.length > 0) {
            // Mostrar errores (esto es un ejemplo, puedes usar un div para mostrar todos los errores juntos)
            errores.forEach(error => {
                const campo = document.getElementById(error.campo);
                mostrarMensaje(campo.nextElementSibling, error.mensaje); // Asume que hay un elemento hermano para el mensaje
            });
            return;
        }

        // Mostrar los datos en la ventana de confirmación
        datosCita.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Hora:</strong> ${hora}</p>
            <p><strong>Mensaje:</strong> ${mensaje}</p>
        `;

        ventanaConfirmacion.style.display = 'block';
    });

    btnConfirmar.addEventListener('click', function() {
        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            mensaje: document.getElementById('mensaje').value.trim()
        };

        fetch('/agendar-cita', { // Reemplaza con la URL correcta de tu servidor
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarMensaje(datosCita, '¡Gracias, tu cita ha sido agendada!', false);
                setTimeout(() => {
                    ventanaConfirmacion.style.display = 'none';
                    formAgendar.reset();
                }, 3000); // Ocultar después de 3 segundos
            } else {
                mostrarMensaje(datosCita, 'Hubo un error al agendar la cita.', true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarMensaje(datosCita, 'Hubo un error al agendar la cita.', true);
        });
    });

    btnCancelar.addEventListener('click', function() {
        ventanaConfirmacion.style.display = 'none';
    });

    btnModificar.addEventListener('click', function() {
        ventanaConfirmacion.style.display = 'none';
        // Aquí puedes agregar la lógica para permitir al usuario modificar los datos
    });
});