const url = 'https://randomuser.me/api/?results=12';
const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        for (i = 0; i<12; i++) {
            const gallery = document.getElementById('gallery');
            let html = document.createElement('div');
            html.innerHTML = `<div class="card" id="${i}">
            <div class="card-img-container">
              <img class="card-img" src= ${data.results[i].picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
              <p class="card-text">${data.results[i].email}</p>
              <p class="card-text cap">${data.results[i].location.city}</p>
            </div>
            <div class="modal-container" id="${i}" style="display:none">
                        <div class="modal">
                            <button id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                            <img class="modal-img" src= ${data.results[i].picture.large} alt="profile picture">
                                <h3 id="name" class="modal-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                                <p class="modal-text">${data.results[i].email}</p>
                                <p class="modal-text cap">${data.results[i].location.city}</p>
                                <hr>
                                <p class="modal-text">${data.results[i].cell}</p>
                                <p class="modal-text">${data.results[i].location.street.number} ${data.results[i].location.street.name}, ${data.results[i].location.state}, ${data.results[i].location.postcode}</p>
                                <p class="modal-text">Birthday: ${data.results[i].dob.date}</p>
                            </div>
                        </div>`
            gallery.appendChild(html);
        }
        for (i = 0; i< 12; i++) {
            const card = document.getElementsByClassName('card')[i];
            card.addEventListener('click', () => {
            card.lastChild.style.display = 'block';
            })
          }
          for (i = 0; i< 12; i++) {
            const button = document.getElementsByClassName('modal-close-btn')[i];
            button.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
            })
            }
          } 
    xhr.send();
}

getData();
