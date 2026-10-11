document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const processBtn = document.getElementById('processBtn');
    const clearBtn = document.getElementById('clearBtn');

    processBtn.addEventListener('click', async () => {
        const texto = inputText.value;

        if (!texto.trim()) {
            alert('Por favor, ingresa un texto para procesar.');
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
                throw new Error('Error en la comunicación con el servidor backend.');
            }

            const data = await response.json();
            outputText.value = data.resultado || '';

        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo conectar con el servidor Spring Boot. Asegúrate de que la aplicación esté ejecutándose en http://localhost:8080');
        }
    });

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
        inputText.focus();
    });
});
