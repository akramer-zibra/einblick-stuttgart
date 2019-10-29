# Einblick-Stuttgart

## Mission
Dieses Projekt startet mit dem Ziel die öffentlichen Ratsdokumente der Stadt Stuttgart übersichtlich und verständlich im Internet zur Verfügung zu stellen. Dabei versteht sich dieses Projekt selbst als unparteiisch und nur einer Toleranz gegenüber demokratischer Meinungsvielfalt verpflichtet.

+ Als Stadtbewohner:in soll ich mit dieser Software die Möglichkeit bekommen, mich zu bestimmten Themen/Stichworten retrospektiv schlau zu machen, um einen besseren Einblick in die politische Arbeit der Stadt Stuttgart zu bekommen und mich besser für anstehende Wahlen und Bürgerinitiativen vorzubereiten

+ Als Politiker:in soll ich mit dieser Software die Möglichkeit bekommen, mich zu bestimmten Themen retrospektiv informieren zu können, um mich dadurch besser auf meine politische Aufgabe vorzubereiten und effektivere Entscheidungen treffen zu können

## Anwendung
Diese Anwendung besteht aus einem Server und einem Client Teil. Der Server-Teil ist eine Node.js Anwendung Server-Anwendung und ist in TypeScript programmiert. Der Client-Teil ist eine Browseranwendung, die ebenfalls in TypeScript programmiert ist. In diesem Repository liegen beide Anwendungsteile.

### Voraussetzungen
Für den Betrieb muss `Node.js` installiert sein. 

### Bibliotheken und Abhängigkeiten
Mit dem Befehl `npm install` werden alle Abhängigkeiten zu Code-Bibliotheken installiert. 
Dies ist die Voraussetzung für die lokale Weiterentwicklung dieser Anwendung.

### Building
Der ausführbare Code des Server- und Client-Teil dieser Anwendung kann jeweils separat gebaut werden. Der Befehl `npm run server:build` erzeugt den Server-Code und der Befehl `npm run client:build` erzeugt den Client-Teil (für den Browser).

### Running
Der Befehl `npm start` startet den Server-Teil der Anwendung. Vor dem Start werden jeweils der ausführbare Server- und auch der Client-Code neu erzeugt. Der Client-Teil für den Browser ist über die Server-Anwendung benutzbar.

### API-Testing
Server starten und mit dem Sandbox-Tool unter `localhost:4000/playground` die API testen.

## Beispielhafte Anfragen

1. Als Stadtbewohner:in möchte ich wissen, in wieweit sich die Stadt Stuttgart gerade mit dem Thema "Weltklima in Not - Stuttgart handelt" beschäftigt.

2. Als Stadtbewohner:in möchte ich außerdem einen einfachen Zugriff auf die entsprechenden Ratsdokumente haben, um mich tiefergehend damit auseinandersetzen zu können

Die Ratsdokumente sind bereits online abrufbar, allerdings nur mit einer verstaubten und unübersichtlichen Oberfläche.

Dieses Projekt ist inspiriert durch [Politik bei uns](https://politik-bei-uns.de/).  

## Sonstiges
### Öffentliche Datenbestände
[Ratsdokumente - Startseite](https://www.stuttgart.de/external/show/ratsdokumente)
[Ratsdokumente - Suche](https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf/masustart)
[Sitzungskalender + Tagesordnungen](https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf/AnSiKa)

### Drittanbieter "Werkzeuge" 
#### User Interface
[Bulma.io](https://bulma.io/)

#### Konzeption
[PlatUML](http://plantuml.com/de/starting) für die technische Konzeption 

## FAQs
### Datein-Encoding der Datenquellen domino1.stuttgart.de
+ Suchergebnisse sind in `Windows 1252` codiert
+ Haushaltsanträge sind in `Windows 1252` codiert
+ Anträge sind in `Windows 1252` codiert

### Coding Guidelines
Die `TypeScript` Lint-Rules stammen aus dem open-source Projekt [MichalLytek/type-graphql](https://github.com/MichalLytek/type-graphql). Der Befehl `npm run server:lint` überprüft die Guidelines.

Anwender:innen von VS Code können den Editor so [konfigurieren](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin), dass Lint-Errors automatisch beim Speichern behoben werden. 