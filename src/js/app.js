document.addEventListener("DOMContentLoaded", () => {
    const urlInput = document.getElementById("urlInput");
    const output = document.getElementById("output");

    //Nochmalige Validierung des URL-Formats
    const isValidUrl = (url) => {
        const pattern = /^(https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,}(\/.*)?$/i;
        return pattern.test(url);
    };

    // Mock-Server-Funktion zur simulierten Existenzprüfung
    const mockServerRequest = async (url) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const exists = Math.random() > 0.5; // Zufällige Antwort: 50/50
                const type = exists ? (Math.random() > 0.5 ? "Datei" : "Ordner") : "Nicht vorhanden";
                resolve({ exists, type });
            }, 1000);
        });
    };
    let timeoutId;
    // Eingabe mit Throttling
    urlInput.addEventListener("input", () => {
        // Lösche vorherigen Timeout, um Anfragen zu drosseln
        clearTimeout(timeoutId);
        
        const url = urlInput.value.trim();
        output.textContent = "";

        // Prüfe sofort das Format
        if (!isValidUrl(url)) {
            output.textContent = "Ungültiges URL-Format.";
            return;
        }

        // Verzögerung der Existenzprüfung um 500 ms nach Eingabestopp
        timeoutId = setTimeout(async () => {
            const result = await mockServerRequest(url);
            output.textContent = result.exists
                ? `URL existiert und verweist auf eine ${result.type}.`
                : "URL existiert nicht.";
        }, 500); // Throttling-Zeit auf 500 ms gesetzt
    });
});
