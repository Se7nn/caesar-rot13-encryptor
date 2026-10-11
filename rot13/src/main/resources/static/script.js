document.addEventListener('DOMContentLoaded', () => {
    // Cifrar Elements
    const encryptInput = document.getElementById('encryptInput');
    const encryptOutput = document.getElementById('encryptOutput');
    const encryptBtn = document.getElementById('encryptBtn');
    const clearEncryptBtn = document.getElementById('clearEncryptBtn');

    // Descifrar Elements
    const decryptInput = document.getElementById('decryptInput');
    const decryptOutput = document.getElementById('decryptOutput');
    const decryptBtn = document.getElementById('decryptBtn');
    const clearDecryptBtn = document.getElementById('clearDecryptBtn');

    async function procesarTexto(texto, outputElement) {
        if (!texto.trim()) {
            alert('Por favor, ingresa un texto válido.');
            return;
        }

        try {
            const response = await fetch('/api/rot13/procesar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ texto: texto })
            });

            if (!response.ok) {
                throw new Error('Error en el servidor.');
            }

            const data = await response.json();
            outputElement.value = data.resultado || '';

        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo conectar con el servidor Spring Boot en http://localhost:8080');
        }
    }

    // Eventos Cifrar
    encryptBtn.addEventListener('click', () => {
        procesarTexto(encryptInput.value, encryptOutput);
    });

    clearEncryptBtn.addEventListener('click', () => {
        encryptInput.value = '';
        encryptOutput.value = '';
        encryptInput.focus();
    });

    // Eventos Descifrar (ROT13 es simétrico, usa la misma API)
    decryptBtn.addEventListener('click', () => {
        procesarTexto(decryptInput.value, decryptOutput);
    });

    clearDecryptBtn.addEventListener('click', () => {
        decryptInput.value = '';
        decryptOutput.value = '';
        decryptInput.focus();
    });
});
