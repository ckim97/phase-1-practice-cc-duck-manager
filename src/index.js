// document.addEventListener("DOMContentLoaded", function () {
//     let script = document.querySelector("script");
//     if (script) {
//         script.defer = true;
//     }

//     fetch("http://localhost:3000/ducks")
//         .then(response => response.json())
//         .then(ducks => {
//             let duckContainer = document.querySelector("#duck-nav");
//             for (let duck of ducks) {
//                 let image = document.createElement("img");
//                 image.src = duck["img_url"];
//                 // Deliverable 2
//                 image.addEventListener("click", function () {
//                     updateDuckDisplay(duck);
//                 });
//                 duckContainer.append(image);
//             }
//         });

//     let newForm = document.querySelector("#new-duck-form");
//     newForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         let addDuck = {
//             name: newForm.elements["duck-name-input"].value,   
//             img_url: newForm.elements["duck-image-input"].value,
//             likes: 0
//         };
//         newForm.reset();

//         fetch("http://localhost:3000/ducks/", {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(addDuck)
//         })
//             .then(response => response.json())
//             .then(data => console.log(data));
//     });

//     function updateDuckDisplay(duck) {
//         let duckName = document.getElementById("duck-display-name");
//         duckName.textContent = duck.name;

//         let duckImage = document.getElementById("duck-display-image");
//         duckImage.src = duck["img_url"];

//         let duckLikes = document.getElementById("duck-display-likes");
//         duckLikes.textContent = `${duck.likes} likes`;


//         // Deliverable 3
//         duckLikes.addEventListener("click", incrementLikes);
        

//         function incrementLikes() {
//             let currentLikes = duck.likes;
//             currentLikes++;
//             duck.likes = currentLikes;
//             duckLikes.textContent = `${currentLikes} likes`;

//             fetch(`http://localhost:3000/ducks/${duck.likes}`, {
//                 method: "PATCH",
//                 headers: {
//                     "content-type": "application/json"
//                 },
//                 body: JSON.stringify({ likes: duck.likes })
//             });
        
//         }
//     }
// });

let currentDuck = null;

fetch("http://localhost:3000/ducks")
    .then(res => res.json())
    .then(data => {
        for (let duck of data) {
            renderImage(duck);
        }
    })

function renderImage(duckObject) {
    let duckContainer = document.querySelector("#duck-nav");
    let image = document.createElement("img");
    image.src = duckObject["img_url"];
    duckContainer.append(image);

    image.addEventListener("click", function() {
        handleClick(duckObject);
    })

    function handleClick(duckObject) {
        let duckName = document.getElementById("duck-display-name");
        duckName.textContent = duckObject.name;
    
        let duckImage = document.getElementById("duck-display-image");
        duckImage.src = duckObject["img_url"];
    
        let duckLikes = document.getElementById("duck-display-likes");
        duckLikes.textContent = `${duckObject.likes} likes`;

        currentDuck = duckObject;
    }
}


let button = document.getElementById("duck-display-likes");
button.addEventListener("click", function() {
    incrementLikes(currentDuck)
})


function incrementLikes(duckObject) {
    let currentLikes = parseInt(duckObject.likes);
    console.log(currentLikes);
    currentLikes++;
    duckObject.likes = currentLikes;

    let displayLikes = document.querySelector("#duck-display-likes");
    displayLikes.textContent = `${currentLikes} likes`;

}