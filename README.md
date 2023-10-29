# Crypto Currency Monitoring App

Crypto Currency Monitoring App is a SPA test assignment project. The purpose of this test is to help TeleTrader ascertain the qualiﬁcation and skill level of the prospective candidate applying for the Junior React Developer position.
The project itself is related to TeleTrader's core business, which revolves around developing applications for the financial industry.

## Description

This is a SPA built with React and created using the Create React App (CRA) method. The application allows users to monitor the latest data for the top 5 cryptocurrencies. It provides real-time updates for cryptocurrency pairs from Bitfnex using WebSockets. Users can also view detailed information for individual currency pairs, add or remove pairs to/from their favorites list, and access a dedicated "Favorites" page that displays their selected pairs.

## Links

Deploy: [https://teletrader-test-assignment-5pleferg9-irinagarmaeva.vercel.app/](https://teletrader-test-assignment-5pleferg9-irinagarmaeva.vercel.app/) <br>

## Technologies
* HTML5
* BEM
* CSS
* Flexbox
* React JS (Functional components, hooks)
* Redux Toolkit
* Webpack


## Functionality

Login functionality is simulated. After clicking the login button users are logged in forever and state should be persisted upon app close. There’s no logout functionality.

**Home Page (`/`)**: The home page displays information for the top 5 cryptocurrency pairs, including:

 - Cryptocurrency name
 - Last price
 - Daily change
 - Daily change percent
 - Daily high price
 - Daily low price

This data is updated in real-time via WebSocket connection to the Bitfnex API.


**Details Page (`/details/:symbol`)**: Users can click on a cryptocurrency pair's name on the home page to navigate to the details page. The details page provides information for the selected currency pair, including:

 - Symbol (Cryptocurrency pair name)
 - Last price
 - Daily high price
 - Daily low price

Unlike the home page, this data doesn't have real-time updating.

**Favorites**: Logged-in users can add or remove cryptocurrency pairs to/from their favorites list. The state of logged-in status and favorite pairs is stored in local storage.

**Favorites Page (`/favorites`)**: The favorites page displays cryptocurrency pairs that the logged-in user has added to their favorites list. This page also receives real-time updates via WebSocket connection.


## How to install and run locally

Clone repository:

  `git clone https://github.com/IrinaGarmaeva/teletrader-test-assignment`

Install dependencies:

  `npm install`

Run app:

  `npm run start`

Build app(production):

  `npm run build`


