document.addEventListener("DOMContentLoaded", () => {
  addAllDogData();
  document.addEventListener("click", () => {
    if (event.target.parentElement.id === "dog-bar") {
      id = parseInt(event.target.dataset.id);
      addDogData(id);
    } else if (event.target.className === "button") {
      id = event.target.dataset.id;
      getDogData(id);
    } else if (
      event.target.id == "good-dog-filter" &&
      event.target.innerText == "Filter good dogs: OFF"
    ) {
      event.target.innerText = "Filter good dogs: ON";
      allGoodBois();
    } else if (
      event.target.id == "good-dog-filter" &&
      event.target.innerText == "Filter good dogs: ON"
    ) {
      event.target.innerText = "Filter good dogs: OFF";
      document.getElementById("dog-bar").innerHTML = "";
      addAllDogData();
    }
  });
});

// -------------------------------------------------------------------

function addAllDogData() {
  fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => displayAll(dog)));
}

function displayAll(dog) {
  let dogDisplayElement = document.getElementById("dog-bar");
  dogDisplayElement.innerHTML += `<span data-id="${dog.id}">${dog.name}</span>`;
}

// ----------------------------------------------------------------

function addDogData(id) {
  fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
    .then(dog => displayDog(dog));
}

function displayDog(dog) {
  let dogDisplayElement = document.getElementById("dog-info");
  dogDisplayElement.innerHTML = "";
  if (dog.isGoodDog) {
    dogDisplayElement.innerHTML += `<div>
  <h2>${dog.name}</h2>
  <img src=${dog.image}>
  <br>
  <button data-id="${dog.id}" class="button">Good Dog!</button>
  </div>`;
  } else {
    dogDisplayElement.innerHTML += `<div>
    <h2>${dog.name}</h2>
    <img src=${dog.image}>
    <br>
    <button data-id="${dog.id}" class="button">Bad Dog!!</button>
    </div>`;
  }
}

// --------------------------------------------------------------------

function getDogData(id) {
  fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
    .then(dog => patchDog(dog, id).then(displayDog(dog)));
}

function patchDog(dog, id) {
  let x = dog.isGoodDog;
  if (x == true) {
    return fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ isGoodDog: false })
    });
  } else if (x != true) {
    return fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ isGoodDog: true })
    });
  }
}

// -------------------------------------------------------

function allGoodBois() {
  fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then(empty())
    .then(dogs => dogs.forEach(dog => displayAllGoodBois(dog)));
}

function displayAllGoodBois(dog) {
  if (dog.isGoodDog === true) {
    displayAll(dog);
  } else {
    // addAllDogData();
  }
}

function empty() {
  document.getElementById("dog-bar").innerHTML = "";
}
// ------------------------------------------------------------
