# Natlex Chart Application





Welcome to Natlex Chart Application, place for creating, editing, deleting and managing charts seamlessly!
## Features

* **Chart system:** Add, Delete, Edit and Update your charts according to your need!

* **Friendly UI:** Easy and understandable user interface

* **Updating of charts:** Just a quick refresh needed to see the changes you've made!

* **Customizable charts:** Ability to change seriesTitle, xAxisName, values, title, data, dates and color.

* **Date Range Filter** Abilty to set the starting and end date to find your desired charts within that range.

## Tech Stack used

* **Redux State Management** Redux used for state management of files.

* **Mongo db** Mongo database is used to store, fetch, edit and delete charts, helping the user to save their data for long. 

* **Express and Node JS:** Used in bcakend for managing data flow between frontend and database

* **React and Typescript** Used for creating Single Page Application

* **React Bootstrap** Used for modern layout, used in components such as Header and Input modal window.

* **Highcharts** Used for creation and displaying of Highcharts on the page.

* **ES Lint** Es lint addition for fixing syntax errors, code styles and removing unnecessary code


## Notes

I have uploaded .env files, So that the project can be cloned and ran by the tester. I am well aware that .env file shouldn't be uploaded/pushed to github for security reasons.

After editing or creating charts a refresh is necessary to reflect the changes

Currently users can provide 2 values and 2 dates when adding a chart. However more can be added later on.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Divyansh72144/Natlex_Task

2. **Download necessary libraries:**
   ```bash
   cd frontend
   npm i

   cd backend
   npm i

3. **Start the project:**
   ```bash
   
   cd backend
   npm start

   cd frontend
   npm run dev
