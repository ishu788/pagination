const people = users;
const len = Object.keys(people).length + 1;

document.querySelector(".total").innerHTML = `<h3>Total : ${len}</h3>`;
const main = document.querySelector(".contact-list");

let jsonObject = {};
let currentPage = 1; // Track the current page

const paginationLimit = 10;
const paginationNumber = document.querySelector(".pagination_container");
let pagecount = 0;



const appendPage = (index) => {
  paginationNumber.innerHTML += `<li><a>${index + 1}</a></li>`;
};





const updateDisplay = () => {
  document.querySelector(".total").innerHTML = `<h3>Total : ${jsonObject.results.length }</h3>`;

  main.innerHTML = ''; // Clear previous content

  const startIndex = (currentPage - 1) * paginationLimit;
  const endIndex = startIndex + paginationLimit;



  // Display items for the current page
  for (let i = startIndex; i < endIndex && i < jsonObject.results.length; i++) {
    let date = jsonObject.results[i].registered.date.split('T')[0];
    let formatted = formatDate(date);

    main.innerHTML +=
      `<li class="contact-item cf">
            <div class="contact-details">
                <img class="avatar" src="${jsonObject.results[i].picture.thumbnail}">
                <h3>${jsonObject.results[i].name.first} ${jsonObject.results[i].name.last}</h3>
                <span class="email">${jsonObject.results[i].email}</span>
            </div>
            <div class="joined-details">
                   <span class="date">Joined ${formatted}</span>
           </div>
        </li>`;
  }



};



const calculate = () => {
  pagecount = Math.ceil(jsonObject.results.length / paginationLimit);
  for (let i = 0; i < pagecount; i++) {
    appendPage(i);
  }
} 


// Generate pagination links


// Fetch data and update display
fetch('https://randomuser.me/api/?results=33')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    jsonObject = data;
    calculate();
    updateDisplay();
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });




// Handle pagination click events
paginationNumber.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    currentPage = parseInt(event.target.textContent, 10);
    updateDisplay();
  }
});



// Formatting of date.

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}
