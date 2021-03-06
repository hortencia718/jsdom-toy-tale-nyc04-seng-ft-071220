let addToy = false;

let toyCollection = document.querySelector("#toy-collection");

let newToyName = document.querySelector(".add-toy-form")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  });

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toyname => createNewToy(toyname))
    let createNewToy = (toyname) =>{ 
     toyname.forEach(toy => {
     
      let toyDiv = document.createElement("div")
      toyDiv.className = "card"
      let toyH2 = document.createElement("h2")
      toyH2.innerText = toy.name
      toyDiv.append(toyH2)
      let toyImg = document.createElement("img")
      toyImg.src= toy.image
      toyImg.className = "toy-avatar"
      toyDiv.append(toyImg)
      let toyP = document.createElement("p")
      toyP.innerText = `${toy.likes} likes` 
      toyDiv.append(toyP)
      let toyButton = document.createElement("button")
      toyButton.innerText = "Like"
      toyButton.className = "link-btn"
      toyDiv.append(toyButton)
      toyCollection.append(toyDiv)
     });
    }
    newToyName.addEventListener("submit", function(evt) {
      evt.preventDefault()
      const newToyName = evt.target.name.value
      const newToyUrl = evt.target.image.value
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": newToyName,
          "image": newToyUrl,
          "likes": 0
        })
      }) 
      .then(res => res.json())
      .then(newToyName => createNewToyName(newToyName))

      let createNewToyName = (newToyName) => {

        let toyDiv = document.createElement("div")
        toyDiv.className = "card"
        let toyH2 = document.createElement("h2")
        toyH2.innerText = newToyName.name
        toyDiv.append(toyH2)
        let toyImg = document.createElement("img")
        toyImg.src= newToyName.image
        toyImg.className = "toy-avatar"
        toyDiv.append(toyImg)
        let toyP = document.createElement("p")
        toyP.innerText = `${newToyName.likes} likes` 
        toyDiv.append(toyP)
        let toyButton = document.createElement("button")
        toyButton.innerText = "Like"
        toyButton.className = "link-btn"
        toyDiv.append(toyButton)
        toyCollection.append(toyDiv)
      }
    })
    

})

