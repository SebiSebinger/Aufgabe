document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("urlInput");
    const output = document.getElementById("output");

    // Validierung des URL-Format
    const isValidUrl = (url) => {
        const pattern = /^(https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,}(\/.*)?$/i;
        return pattern.test(url);
    };

    // Mock-Server Existenzprüfung
    const mockServerRequest = async (url) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const exists = Math.random() > 0.5; // 50/50
                const type = exists ? (Math.random() > 0.5 ? "Datei" : "Ordner") : "Nicht vorhanden";
                resolve({ exists, type });
            }, 1000);
        });
    };

    let timeoutId;

    // Eventlistener für die Eingabe mit Throttling
    urlInput.addEventListener("input", () => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(async () => {
            const url = urlInput.value.trim();
            output.textContent = ""; // Löscht vorherige Meldungen

            // URL-Format Prüfung
            if (!isValidUrl(url)) {
                output.textContent = "Ungültiges URL-Format.";
                return;
            }

            //Test
            const result = await mockServerRequest(url);
            output.textContent = result.exists
                ? `URL existiert und verweist auf eine ${result.type}.`
                : "URL existiert nicht.";
        }, 1500);
    });
});

