// Assuming these components are defined in your project
import { Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
    document.querySelector("#root").innerHTML = `
        ${Nav(store.Links)}
        ${Main(state)}
        ${Footer()}
    `;
    router.updatePageLinks();
    afterRender();
}

function afterRender() {
    document.querySelector(".fa-bars").addEventListener("click", () => {
        document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });

    setupPixelaEventListeners();
}

function setupPixelaEventListeners() {
  const createUserButton = document.getElementById("createUserButton");
  if (createUserButton) {
      createUserButton.addEventListener("click", () => {
          createUser("classicatkins", "token"); // Replace 'username' and 'token' with actual values
      });
  }

  // Here you can add more event listeners for other Pixela API actions if needed
  // For example:
  // const createGraphButton = document.getElementById("createGraphButton");
  // if (createGraphButton) {
  //     createGraphButton.addEventListener("click", () => {
  //         createGraph("username", "token", "graphId", ...); // Replace with actual values and implement createGraph function
  //     });
  // }
}

function createUser(username, token) {
  console.log("Creating user:", username, token);
  // Implement the Axios POST request to create a user
  axios.post('https://pixe.la/v1/users', {
      token: token,
      username: username,
      agreeTermsOfService: 'yes',
      notMinor: 'yes'
  })
  .then(response => {
      console.log('User creation response:', response.data);
  })
  .catch(error => {
      console.error('Error creating user:', error);
  });
}

router.hooks({
    before: (done, params) => {
        const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";

        switch (view) {
            case "Home":
                // Add any specific logic for the Home view
                done();
                break;
            // case "Today":
            //     document.querySelectorAll('.circle-card').forEach(card => {
            //         alert('here');
            //           card.addEventListener('click', () => {
            //               card.classList.toggle('active');
            //           });
            //       });
                
            //       function updateStreakNumber(newNumber) {
            //     document.getElementById('streakNumber').textContent = newNumber;
            //     }
                
            //     updateStreakNumber(5);
                
            //     let currentDate = new Date();
                
            //     function updateCalendar() {
            //     const startOfWeek = getStartOfWeek(currentDate);
            //     const options = { month: 'long' };
            //     const month = startOfWeek.toLocaleDateString('en-US', options);
            //     document.querySelector('.month-display').textContent = month;
                
            //     const days = document.querySelectorAll('.week-display .day .date');
            //     days.forEach((day, index) => {
            //         const date = new Date(startOfWeek);
            //         date.setDate(date.getDate() + index);
            //         day.textContent = date.getDate();
            //         day.classList.toggle('bold', date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth());
            //     });
            //     }
                
            //     function getStartOfWeek(date) {
            //     const day = date.getDay();
            //     const start = new Date(date);
            //     start.setDate(date.getDate() - day);
            //     return start;
            //     }
                
            //     document.getElementById('prevWeek').addEventListener('click', function() {
            //     currentDate.setDate(currentDate.getDate() - 7);
            //     updateCalendar();
            //     });
                
            //     document.getElementById('nextWeek').addEventListener('click', function() {
            //     currentDate.setDate(currentDate.getDate() + 7);
            //     updateCalendar();
            //     });
                
            //     updateCalendar();
            //     break;
            // Implement other cases as needed
            default:
                done();
        }
    },
    already: params => {
        const view = params && params.data && params.data.view ? capitalize(params.data.view) : "Home";
        render(store[view]);
    }
});

router.on({
    "/": () => render(),
    ":view": params => {
        let view = capitalize(params.data.view);
        if (view in store) {
            render(store[view]);
        } else {
            render(store.Viewnotfound);
            console.log(`View ${view} not defined`);
        }
    }
}).resolve();

// Example Axios GET request
axios.get("https://api.openweathermap.org/data/2.5/weather?q=St.%20Louis&APPID=723e0986e0f98b33c0d046e7f38d272c");
