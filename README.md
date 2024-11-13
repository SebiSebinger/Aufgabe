# URL Checker

Eine kl. Webanwendung, die Benutzer*innen ermöglicht, zu überprüfen, ob eine eingegebene URL ein gültiges Format hat und ob die URL existiert(existenz ist zufallswert ja/nein). 
Die Existenzprüfung erfolgt auf Client-Seite durch eine simulierte Serverantwort.

## Funktionen

- **Formatüberprüfung:** Die Anwendung überprüft, ob die URL ein gültiges Format hat.
- **Simulierte Existenzprüfung:** Ein "Mock-Server" simuliert, ob die URL existiert und ob sie auf eine Datei oder einen Ordner verweist.
- **Throttling:** Die Existenzprüfung wird gedrosselt, sodass sie nur ausgeführt wird, wenn der/die Benutzer*in für eine kurze Zeit (1500 ms) aufhört zu tippen, um unnötige Anfragen zu vermeiden.

## Technologie-Stack

- **HTML/CSS:** Für das Layout und die Benutzeroberfläche.
- **JavaScript:** Für die Format- und Existenzprüfung sowie das Throttling.
- **Bootstrap:** Für das responsive Design und die einfache Gestaltung.
  
## Installation und Nutzung
1. **Lade das Repository runter:** 
Lade das gesammte Repository runter da nur so auch Bootstrap funktionieren kann. 
2. **Starte einen lokalen Server:** Da die Anwendung auf externe Dateien zugreift, kann ein lokaler Server hilfreich sein. Du kannst z.B. Python verwenden:
Im Ordner des Ropositorys das Terminal öffnen und fogenden Befehl eingeben 

-  python3 -m http.server 5500

Im Browser in die Url lokalhost:5500 eingeben.
3. **Alternative nutzung:**
Einfacher Doppelclick auf die Index.html datei sollte den Browserr öfnen und die Seite anzeigen.
