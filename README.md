# Nackademin Backend 3 - Fullstack Webshop Project
A school assignment where we built a todo application. We used Google Keep (https://keep.google.com) as an inspiration for how we designed and built the app.

## Table of Contents
<ol>
<li><a href="https://github.com/Oz90/Backend3_Webshop_Grupp2#group-members">Group Members</a></li>
<li><a href="https://github.com/Oz90/Backend3_Webshop_Grupp2#specification-of-requirements-swedish">Specification of Requirements (Swedish)</a></li>
<li><a href="https://github.com/Oz90/Backend3_Webshop_Grupp2#tech-stack">Tech Stack</a></li>
<li><a href="https://github.com/Oz90/Backend3_Webshop_Grupp2#start-the-app">Run application</a></li>
</ol>

## Group Members
<h3 align="center">
  <a href="https://github.com/hibubbajoe">Robin</a>
  •
  <a href="https://github.com/Oz90">Özgür</a>
  </h3>

## Trello
[Trello for our project][trello ref]

[trello ref]: https://trello.com/b/lofWLrP0/todo-app

## Specification of Requirements (Swedish)
<table><tr><td>
  
### Översikt
Målet med detta projekt är att utveckla en fullständig TODO applikation som låter en användare se, skapa, och redigera TODO listor. För ett exempel på hur en sådan applikation kan fungera, se t.ex. Google Keep (https://keep.google.com).
  
### Grundläggande krav (Godkänt)
Applikationen skall utvecklas i NodeJS med ExpressJS som applikationsramverk, MongoDB som databas, och ReactJS som frontend-lösning. 
Applikationen skall kunna hantera flera TODO listor och användaren ska kunna skapa nya, redigera befintliga, och radera enskilda listor. 
Varje lista ska innehålla följande detaljer:
- Rubrik (text)
- Innehåll (text)
- Datum för senaste redigering (datum)

Applikationen ska kunna visa en översikt av alla listor samt detaljer för enskilda listor.
Koden för applikationen skall publiceras på GitHub. All kod måste vara snyggt och korrekt formatterad. Kommentarer i koden skall vara relevanta och bortkommenterade stycken med kod är inte godkänt vid inlämning. 

### Utökade krav (Väl Godkänt)
Utöver ovanstående krav så skall applikationen ha följande extra funktioner.
Stöd för flera inloggade användare. Inloggningen ska ske på ett säkert vis, antingen med användarnamn + lösenord, eller med en federerad inloggning (t.ex. Google, Facebook, GitHub eller dylikt). Lagras lösenord i applikationen så skall dessa skyddas korrekt (se föreläsning om Säkerhet)

Varje användare har en egen uppsättning av TODO listor som andra användare inte kan se.
Innehållet i varje TODO lista ska kunna formateras med hjälp av Markdown. Se t.ex. https://uiwjs.github.io/react-md-editor/. Detta innebär att texten skall lagras som Markdown i databasen och renderas i frontend med korrekt formatering.

Koden för applikationen skall innehålla relevanta enhetstester och projekten ska ha statisk kodanalys. Alla tester och statisk kodanalys ska passera utan fel eller varningar.

### Tekniska krav
Följande komponenter måste används i det färdiga projektet, både för G och VG.
- MongoDB för lagring av data
- ExpressJS som applikationsramverk

Valet av frontend lösning för detta projekt är valfritt (d.v.s., välj mellan någon view-lösning från ExpressJS eller t.ex. ReactJS.).

### Redovisning
Projektet ska redovisas löpande i form av skriftlig standup från projektdeltagarna (Se föreläsningen med Torbjörn om Agil projektform). Det slutgiltiga projektet ska redovisas som ett fullstack projekt på GitHub. Datum för sista redovisningsdag presenteras på studentportalen.
</td></tr></table>

## Tech Stack
- [MongoDB][mongodb ref]
- [ExpressJS][express ref]
- [ReactJS][react ref]
- [NodeJS][node ref]
- [Tutorial: How to set up a MERN project][tutorial ref]

[mongodb ref]: https://docs.mongodb.com/
[express ref]: https://expressjs.com/en/starter/installing.html
[react ref]: https://reactjs.org/docs/getting-started.html
[node ref]: https://nodejs.org/en/
[tutorial ref]: https://www.mongodb.com/languages/mern-stack-tutorial

# Start the app
## Start client side
In the project directory run:
`cd client`
Once in the client directory run:
`npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Start server side
In the project directory run:
`cd server`
In the backend directory run:
`npx nodemon start`

# Deployment
## Frontend deployed at
[Enter link after deployment]

## Backend deployed at
[Enter link after deployment]

# Testing
## Client side testing
Add once we've added tests

## Server side testing
Add once we've added tests

## Eslint
Add once we've added eslint

