# Einblick-Stuttgart

## Mission
Dieses Projekt startet mit dem Ziel die öffentlichen Ratsdokumente der Stadt Stuttgart besser für alle Bürgerinnen und Bürger zugänglich zu machen. Dabei versteht sich dieses Projekt selbst als unparteiisch und nur gegenüber demokratischer Meinungsvielfalt verpflichtet.

+ Als Stadtbewohner:in soll ich mit dieser Software die Möglichkeit bekommen, mich zu bestimmten Themen/Stichworten schlau zu machen, um einen besseren Einblick in die politische Arbeit des Stuttgarter Gemeinderats zu bekommen und mich besser für anstehende Wahlen und Bürgerinitiativen vorbereiten zu können.

+ Als Politiker:in soll ich mit dieser Software die Möglichkeit bekommen, mich besser auf meine Arbeit als politische:r Repräsentant:in vorzubereiten um effektivere und nachhaltigere Entscheidungen treffen zu können

Die Ratsdokumente der Stadt Stuttgart sind bereits online abrufbar, allerdings nur mit einer in die Jahre gekommenen Overfläche.

Dieses Projekt ist wesentlich inspiriert durch [Politik bei uns](https://politik-bei-uns.de/) und [Frag den Staat](https://fragdenstaat.de/).  

## Anwendung
Diese Anwendung besteht aus einem Server- und einem Client-Teil. Der Server-Teil ist eine Node.js Server-Anwendung und ist in TypeScript programmiert. Der Client-Teil ist eine Browser-Anwendung, die ebenfalls in TypeScript entwickelt ist. In diesem Repository liegt der Quellode beider Anwendungs-Bestandteile.

### Voraussetzungen
Der Server-Teil der Anwendung benötigt [Node.js](https://nodejs.org/en/download/) als Laufzeitumgebung.

### Installation: Bibliotheken und Abhängigkeiten
Mit dem Befehl `npm install` installiert ihr alle notwendigen Code-Bibliotheken, um aus dem Server-Code wie auch den Client-Code eine ausführbare Anwendung zu machen. Diese Bibliotheken sind auch Voraussetzung für die lokale Weiterentwicklung dieser Anwendung.

### Building: Ausführbaren Code erzeugen
Der ausführbare Code des Server- und Client-Teil dieser Anwendung kann jeweils separat gebaut werden. Der Befehl `npm run server:build` erzeugt den Server-Code und der Befehl `npm run client:build` erzeugt den Client-Teil (für den Browser).

Für die lokale Entwicklung eignen sich die Befehle `npm run server:build:live` und `npm run client:build:watch`, die in bedein Fällen den jeweiligen Code neu bauen, wenn sich etwas im Quellcode-Verzeichns der Anwendung ändert.

### Running: Anwendung benutzen
Der Befehl `npm start` startet den Server-Teil der Anwendung. Vor dem Start werden jeweils der ausführbare Server- und auch der Client-Code neu erzeugt. Der Client-Teil für den Browser ist über die Server-Anwendung benutzbar.

### Testing: GraphQL API testen
Anwendung starten (`npm start`) und mit dem Sandbox-Tool unter `localhost:4000/playground` die API testen. Der GraphQL Playground unterstützt mit Autovervollständigung und Korrekturfunktion das Testen der API.

### Lizenz
Der Quellcode dieses Projekts ist unter der [GNU-AGPLv3](LICENSE) lizensiert. Es ist euch darum unter anderem frei diesen Quellcode beliebig zu verändern und weiterzuverteilen. Was ihr rechtlich genau alles machen könnt, lest ihr entweder direkt in der Lizenzdatei oder in der zusammengefassten Form [hier](https://choosealicense.com/licenses/agpl-3.0/) nach.

### Contribution: Unterstützung bei der Weiterentwicklung
Eure Pull-Requests sind willkommen, aber bitte überprüft vor dem Commit Euren Code indem ihr die Anwendung startet (`npm start`) und die Änderungen sinnvoll testet. 

Möchte ihr ein neues 'großes' Feature in die Anwendung bringen, beschreibt eure Idee bitte zuerst als Issue, anhand dessen wir die Idee und die Implementierungsdetails besprechen können. Das verhindert, dass keine eurer wertvollen Zeit bei der Weiterentwicklung durch abgelehnte Pull-Requests vergeudet wird.

#### Code-Richtlinien
Die TypeScript Lint-Rules stammen aus dem tollen Open-Source Projekt [MichalLytek/type-graphql](https://github.com/MichalLytek/type-graphql). Der Befehl `npm run lint` überprüft die in diesem Repository konfigurierten Richtlinien.

Anwender:innen von VS Code können den Editor so [konfigurieren](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin), dass Lint-Errors automatisch beim Speichern behoben werden. 

Dieses Projekt betrifft zu diesem Zeitpunkt ein sehr regionales Anwendungsgebiet. Aus diesem Grund wurde sich dazu entschlossen Commit-Nachrichten und Code-Kommentare in deutscher Sprache zu verfassen, um merkwürdige Übersetzungen deutscher Bürokratiebegriffe zu vermeiden (Bsp. Beratungsunterlage => Discussiondocument?!).

### Hosting: Hinweis zum öffentlichen Hosting
Wenn ihr diese Anwendung im Internet hosten möchtet, überprüft bitte vorher, ob alle Daten, die in dieser Anwendung abgegriffen und weiterverteilt werden, auch wirklich 'offen' und nicht durch Copyrights geschützt sind. Zum jetzigen Zeitpunkt ist dieses Projekt noch experimentell und nicht für ein öffentliches Hosting gedacht.

### Eingebundene Projekte und Werkzeuge 
Ein Dankeschön an dieser Stelle an alle Open-Source Projekte, die als Bibliotheken oder Frameworks Ihren Platz in dieser Anwendung gefunden haben. Ohne diese wertvollen Projekte wäre es nie möglich gewesen, dieses Projekt in solch einer kurzen Zeit auf die Beine zu stellen. Eine genaue Auflistung der verwendeten Projekte findet sich in der [package.json](package.json) unter den beiden Eigenschaften `dependencies` und `devDependencies`.

## Sonstiges
### Öffentliche Datenbestände
[Ratsdokumente - Startseite](https://www.stuttgart.de/external/show/ratsdokumente)  
[Ratsdokumente - Suche](https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf/masustart)  
[Sitzungskalender + Tagesordnungen](https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf/AnSiKa)  
[Gemeinderat Mitglieder](https://www.stuttgart.de/gemeinderat)  
[Gemeinderat politische Zusammensetzung](https://www.stuttgart.de/img/mdb/item/673539/148788.pdf)  
[Gemeinderat Wahldaten Faltblatt](https://servicex.stuttgart.de/lhs-services/komunis/documents/  7653_1_Faltblatt_Stuttgarter_Wahldaten___Ausgabe_2018.PDF)  
[Gemeinderat Wahldaten im Detail](https://www.stuttgart.de/img/mdb/item/673539/144734.pdf)  

### Glossar
Die Ratsdokumente sind gespickt mit Abkürzungen und Bürokratiebegriffen. [GLOSSAR.md](GLOSSAR.md) ist ein Glossar mit entsprechenden Erklärungen.
