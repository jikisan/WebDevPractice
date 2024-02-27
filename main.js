const WEATHER_API_KEY = 'ddff13f42f5f09b8cd5c409f721d5489';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

const galleryImages = [
    {
        src: './assets/gallery/image1.jpg',
        alt: 'Thumbnail Image 1'
    },
    {
        src: './assets/gallery/image2.jpg',
        alt: 'Thumbnail Image 2'
    },
    {
        src: './assets/gallery/image3.jpg',
        alt: 'Thumbnail Image 3'
    }
];

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

//Menu Section
document.querySelector("button#open-nav-menu").addEventListener("click", openMenu)
document.querySelector("button#close-nav-menu").addEventListener("click", closeMenu)

function openMenu(){
document.querySelector("header nav .wrapper").classList.add("nav-open")
}

function closeMenu(){
document.querySelector("header nav .wrapper").classList.remove("nav-open")
}


// Greeting Section
const greeting = document.getElementById('greeting');
const greetingMessage = document.getElementById('weather');
const weatherGroup = document.querySelector('.weather-group');

const currentHour = new Date().getHours();
let greetingText;

if(currentHour < 12) {
greetingText = 'Good Morning!';
}
else if(currentHour < 19) {
greetingText = 'Good Afternoon!';
}
else if(currentHour < 24) {
greetingText = 'Good Evening!';
}
else {
greetingText = 'Welcome!';
}

setGreetingText(greetingText);

// const weatherCondition = `sunny`;
// const userLocation = `PH`;
// let temperature = 104;

//Get geolocation property of user
navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let url = WEATHER_API_URL
        .replace('{lat}', latitude)
        .replace('{long}', longitude)
        .replace('{API Key}', WEATHER_API_KEY);

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weatherCondition = data.weather[0].description;
        const userLocation = data.name;
        const temperature = data.main.temp;   

        const isUsingCelsius = `The weather is ${weatherCondition} in ${userLocation} and it's ${fahrenheitToCelsius(temperature)} outside.`;
        const isUsingFahr = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahrenheit(temperature)} outside.`;
        setWeatherMessage(isUsingCelsius);
        weatherGroup.addEventListener("click", handleTemperatureClick);

    });
});




function setGreetingText(message){
    greeting.innerHTML = message;
}

function setWeatherMessage(message){
    greetingMessage.innerHTML = message;
}

function handleTemperatureClick(event) {
if (event.target.id === 'celsius') {
    setWeatherMessage(isUsingCelsius);
} else if (event.target.id === 'fahr') {
    setWeatherMessage(isUsingFahr);
}
}

function celsiusToFahrenheit(celsius){
temperature = (celsius * (9/5)) + 32;
console.log(temperature)
return temperature.toFixed(1) + '°F';
}

function fahrenheitToCelsius(fahrenheit){
temperature = ((fahrenheit - 32) * 5) / 9;
console.log(temperature)
return temperature.toFixed(1) + '°C';
}

//Clock Section
setTime();
setInterval(incrementSeconds, 1000);

function setTime(){
const localTime = new Date();
document.querySelector('span[data-time=hours]').textContent = localTime.getHours().toString().padStart(2,"0");
document.querySelector('span[data-time=minutes]').textContent = localTime.getMinutes().toString().padStart(2,"0");
document.querySelector('span[data-time=seconds]').textContent = localTime.getSeconds().toString().padStart(2,"0");
}

function incrementSeconds(){
setTime();
}

//Gallery Section

//Declare main image
const mainImage = document.querySelector('#gallery > img');
const thumbnails = document.querySelector('#gallery .thumbnails');

//Set Main Image
mainImage.src = galleryImages[0].src;
mainImage.alt = galleryImages[0].alt;

//Add thumbnails
galleryImages.forEach((image, index) => setThumbnail(image, index));

function setThumbnail(image, index){
const thumb = document.createElement("img");
thumb.src = image.src;
thumb.alt = image.alt;
thumb.dataset.arrayIndex = index;
thumb.dataset.selected = index === 0 ? true : false;
thumb.addEventListener("click", selectThumbnail);
thumbnails.append(thumb);  
}

function selectThumbnail(event){
let selectedIndex = event.target.dataset.arrayIndex;
let selectedImage= galleryImages[selectedIndex];
mainImage.src = selectedImage.src;
mainImage.alt = selectedImage.alt;

thumbnails.querySelectorAll('img').forEach(function(img){
    img.dataset.selected = false;
})

event.target.dataset.selected = true;
}

//Product Section        
const productsSection = document.querySelector('.products-area');
const productsFilter = document.querySelector('.products-filter');

const freeProducts = products.filter(function(item){
    return item.price <= 0 || !item.price;
});

const paidProducts = products.filter(function(item){
    return item.price > 0;
});

const totalProdcuts = products.length;
const totalPaidProdcuts = paidProducts.length;
const totalFreeProdcuts = freeProducts.length;



populateProducts(products);

document.querySelector('.products-filter label[for=all] span.product-amount').textContent = totalProdcuts;
document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = totalPaidProdcuts;
document.querySelector('.products-filter label[for=free] span.product-amount').textContent = totalFreeProdcuts;

productsFilter.addEventListener('click', function(e){
    let filter = e.target.id;
    switch(filter){
        case 'paid':
            populateProducts(paidProducts);
        break;
        case 'free':
            populateProducts(freeProducts);
        break;
        default:
            populateProducts(products);
    }
})

//Populate product items
function populateProducts(productList){

    productsSection.textContent = "";

    productList.forEach(function(product, index){
        const productElm = document.createElement('div');
        productElm.classList.add('product-item');
    
        //Create product image
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = "Image for " + product.title;
    
        //Create the product details
        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');
    
        //Create product title, author, and price
        const productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;
    
        const productAuthor = document.createElement('p');
        productAuthor.classList.add('product-author');
        productAuthor.textContent = product.author;
    
        const productPriceTitle = document.createElement('p');
        productPriceTitle.classList.add('price-title');
        productPriceTitle.textContent = 'Price';
        
        const productPrice = document.createElement('p');
        productPrice.classList.add('product-title');
        productPrice.textContent = product.price > 0 ? `$ ${product.price.toFixed(2)}` : `Free`;
    
        //Append product details to parent element (.product-details).
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(productPriceTitle);
        productDetails.append(productPrice);
    
        productElm.append(productImage);
        productElm.append(productDetails);
        productsSection.append(productElm);
    });
}

//Footer Section (FAQs)
const currentYear = new Date().getFullYear();
document.querySelector('footer').textContent = `© ${currentYear} - All rights reserved`;



//Page Load
