document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("urlInput");
    const output = document.getElementById("output");

    // Validierung des URL-Formats
    const isValidUrl = (url) => {
        const pattern = /^(https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,}(\/.*)?$/i;
        return pattern.test(url);
    };

    // Mock-Server Existenzprüfung
    const mockServerRequest = async (url) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const exists = Math.random() > 0.5; // 50/50
                const type = exists ? (Math.random() > 0.5 ? "file" : "folder") : null;
                const status = exists ? 200 : 404;
                resolve({ status, type });
            }, 1000);
        });
    };

    let timeoutId;
    let lastCheckedUrl = null; // Hier speichere ich die zuletzt geprüfte URL

    const statusMessages = {
        200: {
            file: "URL existiert und verweist auf eine Datei.",
            folder: "URL existiert und verweist auf einen Ordner.",
        },
        404: "URL existiert nicht.",
    };

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
            lastCheckedUrl = url; // Speichert URL vor dem Request
            const result = await mockServerRequest(url);

            if (url === lastCheckedUrl) {
                if (result.status === 200) {
                    output.textContent = statusMessages[200][result.type];
                } else {
                    output.textContent = statusMessages[404];
                }
            } else {
                console.log("Ergebnis veraltet, wird nicht angezeigt");
            }
        }, 1500);
    });
});
