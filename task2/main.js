// ** Main Script for Fetching and Displaying Products **

// * Select the main container, button, and input elements
const divContainer = document.querySelector(".container");
const button = document.querySelector("button");
const input = document.querySelector("input");

// * Filter function: Clears the container and fetches data based on the input value
function filter() {
    const id = input.value.trim(); // Get user input
    divContainer.innerHTML = ""; // Clear current content
    if (id) {
        getData(id); // Fetch filtered data
    } else {
        getData(); // Fetch all data if no input
    }
}

// * Fetch data from the API
function getData(productId = "") {
    const request = new XMLHttpRequest();
    const url = productId ? `https://fakestoreapi.com/products/${productId}` : "https://fakestoreapi.com/products";

    request.open("GET", url); // Open GET request
    request.send(); // Send request
    request.onload = () => {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText); // Parse the response
            console.log(data); // Log for debugging
            Array.isArray(data) ? displayData(data) : displayData([data]); // Handle single or multiple products
        } else {
            console.error("Failed to fetch data. Please check the API endpoint.");
        }
    };
}

// * Display data in the container
function displayData(products) {
    products.forEach(product => {
        // Create product card
        const mainDiv = document.createElement("div");
        mainDiv.className = "mainDiv";
        mainDiv.id = product.id;

        const mainInfo = document.createElement("div");
        mainInfo.className = "mainInfo";

        // Create and append image
        const mainInfoImg = document.createElement("img");
        mainInfoImg.src = product.image;

        // Create and append product ID
        const mainInfoId = document.createElement("h2");
        mainInfoId.innerText = `ID: ${product.id}`;

        // Create and append product title
        const mainInfoTitle = document.createElement("p");
        mainInfoTitle.innerText = product.title;

        // Create and append "More Info" button
        const moreInfoButton = document.createElement("button");
        moreInfoButton.className = "etc";
        moreInfoButton.innerText = "More Info";
        moreInfoButton.onclick = showMoreInfo;

        // Append elements to the main info container
        mainInfo.append(mainInfoImg, mainInfoId, mainInfoTitle, moreInfoButton);

        // Append main info to the main div
        mainDiv.appendChild(mainInfo);

        // Append main div to the container
        divContainer.appendChild(mainDiv);
    });
}

// * Show detailed product information
function showMoreInfo(event) {
    const productId = event.target.closest(".mainDiv").id; // Get the product ID
    const request = new XMLHttpRequest();

    request.open("GET", `https://fakestoreapi.com/products/${productId}`);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            const product = JSON.parse(request.responseText);
            console.log(product); // Log for debugging
            displayMoreData(product);
        } else {
            console.error("Failed to fetch product details.");
        }
    };
}

// * Display additional product details
function displayMoreData(product) {
    // Remove existing detailed view if it exists
    const existingMoreDiv = document.querySelector(".moreDiv");
    if (existingMoreDiv) {
        existingMoreDiv.remove();
    }

    const mainDiv = document.getElementById(product.id);
    const moreDiv = document.createElement("div");
    moreDiv.className = "moreDiv";

    // Create and append description
    const desc = document.createElement("p");
    desc.innerText = `Description: ${product.description}`;

    // Create and append rating
    const rate = document.createElement("p");
    rate.innerText = `Rating: ${product.rating.rate}`;

    // Create and append rating count
    const count = document.createElement("p");
    count.innerText = `Price: ${product.rating.count}`;

    // Append details to the detailed view container
    moreDiv.append(desc, rate, count);

    // Append the detailed view to the main div
    mainDiv.appendChild(moreDiv);
}

// * Initialize: Fetch all products on page load
getData();

// * Attach filter function to button
button.addEventListener("click", filter);
