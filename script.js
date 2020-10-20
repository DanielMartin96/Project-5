const url = 'https://randomuser.me/api/?results=12';
const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        for (i = 0; i<12; i++) { // cycles through the json data and appends two divs to the page
            const gallery = document.getElementById('gallery');
            let cardDiv = document.createElement('div');
            cardDiv.innerHTML = `<div class="card" id="${i}">
            <div class="card-img-container">
              <img class="card-img" src= ${data.results[i].picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
              <p class="card-text">${data.results[i].email}</p>
              <p class="card-text cap">${data.results[i].location.city}</p>
            </div>`
            let modalDiv = document.createElement('div'); // modal div style=display = none - meaning it is not shown on page
            let phoneNumber = formatNumber(data.results[i].cell);
          let date = data.results[i].dob.date; // cycles through the date to find the numbers needed then concatinated them in the required way
          const day1 = date[8]
          const day2 = date[9]
          const day = day1 + day2;
          const month1 = date[5];
          const month2 = date[6];
          const month = month1 + month2;
          const year1 = date[0];
          const year2 = date[1];
          const year3 = date[2];
          const year4 = date[3];
          const year = year1 + year2 + year3 + year4;
          const bday = month + "/" + day + "/" + year;
            modalDiv.innerHTML = `<div class="modal-container" id="${i}" style="display:none">
                        <div class="modal">
                            <button id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                            <img class="modal-img" src= ${data.results[i].picture.large} alt="profile picture">
                                <h3 id="name" class="modal-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                                <p class="modal-text">${data.results[i].email}</p>
                                <p class="modal-text cap">${data.results[i].location.city}</p>
                                <hr>
                                <p class="modal-text">${phoneNumber}</p>
                                <p class="modal-text">${data.results[i].location.street.number} ${data.results[i].location.street.name}, ${data.results[i].location.state}, ${data.results[i].location.postcode}</p>
                                <p class="modal-text">Birthday: ${bday}</p>
                            </div>
                        </div>`
            gallery.appendChild(cardDiv);
            gallery.appendChild(modalDiv);
        }
        
        for (i = 0; i< 12; i++) { // makes each card clickable and opens the modal container
            const card = document.getElementsByClassName('card')[i];
            const modalDiv = document.getElementsByClassName('modal-container')[i]
            card.addEventListener('click', () => {
            modalDiv.style.display = 'block';
        })
          
        }
          for (i = 0; i< 12; i++) { // makes the close button clickable and closes the modal
            const button = document.getElementsByClassName('modal-close-btn')[i];
            button.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
            })
            }
          } 
    xhr.send();
}

function formatNumber(number) { // formats the number using regex
  var cleaned = ('' + number).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  } else {
    return cleaned;
  }
}            

getData();
