document.addEventListener('DOMContentLoaded', () => {
    // Obtener los campos y botones de cifrado
    const encryptInput = document.getElementById('encryptInput');
    const encryptOutput = document.getElementById('encryptOutput');
    const encryptBtn = document.getElementById('encryptBtn');
    const clearEncryptBtn = document.getElementById('clearEncryptBtn');

    // Obtener los campos y botones de descifrado
    const decryptInput = document.getElementById('decryptInput');
    const decryptOutput = document.getElementById('decryptOutput');
    const decryptBtn = document.getElementById('decryptBtn');
    const clearDecryptBtn = document.getElementById('clearDecryptBtn');

    async function procesarTexto(texto, outputElement) {

        // Validar que el texto no esté vacío
        if (!texto.trim()) {
            alert('Por favor, ingresa un texto válido.');
            return;
        }

        try {
            // Enviar el texto a Spring Boot para procesarlo con ROT13
            const response = await fetch('/api/rot13/procesar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ texto: texto })
            });

            // Verificar si la petición fue exitosa
            if (!response.ok) {
                throw new Error('Error en el servidor.');
            }

            // Recibir el resultado del cifrado o descifrado
            const data = await response.json();
            outputElement.value = data.resultado || '';

        } catch (error) {
            // Mostrar un aviso si falla la comunicación con el servidor
            console.error('Error:', error);
            alert('No se pudo conectar con el servidor Spring Boot en http://localhost:8001');
        }
    }

    // Ejecutar el procesamiento al presionar Cifrar
    encryptBtn.addEventListener('click', () => {
        procesarTexto(encryptInput.value, encryptOutput);
    });

    // Limpiar los campos de cifrado
    clearEncryptBtn.addEventListener('click', () => {
        encryptInput.value = '';
        encryptOutput.value = '';
        encryptInput.focus();
    });

    // Descifrar usando la misma función, porque ROT13 es simétrico
    decryptBtn.addEventListener('click', () => {
        procesarTexto(decryptInput.value, decryptOutput);
    });

    // Limpiar los campos de descifrado
    clearDecryptBtn.addEventListener('click', () => {
        decryptInput.value = '';
        decryptOutput.value = '';
        decryptInput.focus();
    });
});
