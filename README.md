# User Authentication - Frontend

## Nötige Applikationen

1. Visual Studio Code (recommended)
2. Visual Studio 2019
5. Neuster Stand von https://github.com/yungxramoz/UserAuthentication
3. NodeJS LTS (https://nodejs.org/en/)
4. yarn

```
npm install --global yarn
```

## Projekt setup

### UserAuthentication API starten

Mittels Visual Studio 2019 die neuste Version von yungxramoz/UserAuthentication starten. Der Endpoint der genutzt wird prüfen den der muss ggf. in der Web-App angepasst werden.

### API Endpoint konfigurieren

Die API URL wird momentan noch nicht zentral verwaltet, wodurch die Endpoints in zwei Dateien angepasst werden müssen. Die anzupassende Variable heisst `API_URL`.
1. /src/services/auth-serivce.ts
2. /src/services/user-serivce.ts

### Installation

Kann länger dauern, da hier das halbe Internet heruntergeladen wird (node modules).
Es ist wichtig das zuerst ins Project Directory gewechselt wird ( `cd [path]` ), also ins Verzeichnis user-autentication-vue-jwt.

```
yarn install
```

### Programm als Dev Build ausführen

```
yarn serve
```

## Bemerkungen

1. Bei Error messages vom Server wird der Errorcode ausgegeben, der nicht so aussagekräftig ist. Es können folgende Errors sein: </br>
1.1. Registrierung: Username bereits vergeben.</br>
1.2. Login: Kein User mit dem Username gefunden oder Passwort stimmt nicht.</br>
1.3. Profile Update: Username bereits vergeben.
2. Passwort Richttlinien Meldung ist nicht aussagekräftig: Grossbuchstabe && Kleinbuchstabe && Nummer && min. 8 Zeichen sind zu erfüllen.
