<img src="Screenshots/HomePage-ReactApp.PNG"/>


## front-end

 - ReactJS (ES6)
 - react-router (*Single Page Application*)
 - bootstrap
 
*source files in `FrontEnd/` folder*

## back-end

 - `NodeJS` (ES6)
 - `Express`
 - `MongoDB`

*source files in `BackEnd/` folder*

## Env File Setup for Back-End
- Change config/config.config.env to config/config.env
- Add your JWT secret and MongoDB URI

## Env File Setup for Front-END
- Before launching the App, Create a **.env** file in **FrontEnd\QuickFoodDelivery**.
- Launch Backend App then keep **REACT_APP_NodeJS_ServiceURL = http://localhost:XXXX** this line in .env file which is in Front End.

Note: REACT_APP_NodeJS_ServiceURL should be your Backend App Hosted url or Backend Local URL.



## Setup and launch

1. FrontEnd part: cd FontEnd/QuickFoodDelivery/src/ 
 - Run **npm install** to install dependencies
 - Run **npm start** for development
2. BackEnd part: cd BackEnd/restaurant-api/ 
 - Run **npm install** to install dependencies
 - Run **npm run dev** for development
