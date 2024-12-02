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
    let lastCheckedUrl = null; //Hier speichere ich die zuletzt geprüfte URL

    // Eventlistener für die Eingabe mit Throttling
    urlInput.addEventListener("input", () => {
        const url = urlInput.value.trim();
        clearTimeout(timeoutId);
        output.textContent = ""; // Löscht vorherige Meldungen

        // URL-Format Prüfung
        if (!isValidUrl(url)) {
            output.textContent = "Ungültiges URL-Format.";
            lastCheckedUrl = null;
            return;
        }
        
        timeoutId = setTimeout(async () => {
            lastCheckedUrl = url; //Speichert URL vor dem Rewuest
            const result = await mockServerRequest(url);

            if (url === lastCheckedUrl){
                output.textContent = result.exists
                ? `URL existiert und verweist auf eine ${result.type}.`
                : "URL existiert nicht."
            }else {
                console.log("Ergebnis veraltet, wird nicht angezeigt.");
            }
        }, 1500);
    });
});

