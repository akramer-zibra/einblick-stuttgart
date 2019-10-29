# Einblick-Stuttgart

## Mission
Dieses Projekt startet mit dem Ziel die öffentlichen Ratsdokumente der Stadt Stuttgart übersichtlich und verständlich im Internet zur Verfügung zu stellen. Dabei versteht sich dieses Projekt selbst als unparteiisch und nur einer Toleranz gegenüber demokratischer Meinungsvielfalt verpflichtet.

+ Als Stadtbewohner:in soll ich mit dieser Software die Möglichkeit bekommen, mich zu bestimmten Themen/Stichworten retrospektiv schlau zu machen, um einen besseren Einblick in die politische Arbeit der Stadt Stuttgart zu bekommen und mich besser für anstehende Wahlen und Bürgerinitiativen vorzubereiten

+ Als Politiker:in soll ich mit dieser Software die Möglichkeit bekommen, mich zu bestimmten Themen retrospektiv informieren zu können, um mich dadurch besser auf meine politische Aufgabe vorzubereiten und effektivere Entscheidungen treffen zu können

## Software

### Prepare
`npm install`

### Building
`npm build`

### Running
`npm start`

### API-Testing
Server starten und mit dem Sandbox-Tool unter `loclhost:4000/playground` die API testen.

### Drittanbieter "Werkzeuge" 
#### User Interface
[Bulma.io](https://bulma.io/)

#### Konzeption
[PlatUML](http://plantuml.com/de/starting) für die technische Konzeption 

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

### ...Alternative Projekttitel
"Stuttgart transparency", "Stuttgart monitoring", "Occupy Stuttgart", "Stuttgart-Watch", ...

## FAQs
### Datein-Encoding der Datenquellen domino1.stuttgart.de
+ Suchergebnisse sind in `Windows 1252` codiert
+ Haushaltsanträge sind in `Windows 1252` codiert
+ Anträge sind in `Windows 1252` codiert

### Coding Guidelines
Die `TypeScript` Lint-Rules stammen aus dem open-source Projekt [MichalLytek/type-graphql](https://github.com/MichalLytek/type-graphql). Der Befehl `npm run lint` überprüft die Guidelines.

Anwender:innen von VS Code können den Editor so [konfigurieren](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin), dass Lint-Errors automatisch beim Speichern behoben werden. 