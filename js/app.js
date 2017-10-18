
//Submit Event
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);
//Delete Event
document.querySelector("body").addEventListener("click", deleteLocation);

//Functions
function getLocationInfo(event) {
  //Get input value
  const zip = document.querySelector(".zip").value;
  // Fetch request
  fetch(`https://api.zippopotam.us/ru/${zip}`)
    .then(response => {
      if (response.status != 200) {
        showIcon("remove");
        document.querySelector("#output").innerHTML = `
              <article class="message is-danger">
              <div class="message-body">Неправильный почтовый индекс</div></article>
            `;
        throw Error(response.statusText);
      } else {
        showIcon("check");
        return response.json();
      }
    })
    .then(data => {
      // Show location info
      let output = "";
      data.places.forEach(place => {
        output += `
              <article class="message is-primary">
                <div class="message-header">
                  <p>Местоположение</p>
                  <button class="delete"></button>
                </div>
                <div class="message-body">
                  <ul>
                    <li><strong>Город: </strong>${place["place name"]}</li>
                    <li><strong>Область: </strong>${place["state"]}</li>
                    <li><strong>Долгота: </strong>${place["longitude"]}</li>
                    <li><strong>Широта: </strong>${place["latitude"]}</li>
                  </ul>
                </div>
              </article>
            `;
      });
      // Output innerHTML
      document.querySelector("#output").innerHTML = output;
    })
    .catch(err => console.log(err));
  event.preventDefault();
}

// Show icon func
function showIcon(icon) {
  // Clear icon
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // Show icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

// Delete location
function deleteLocation(event) {
  if (event.target.className == "delete") {
    document.querySelector(".message").remove();
    document.querySelector(".zip").value = "";
    document.querySelector(".icon-check").remove();
  }
}

