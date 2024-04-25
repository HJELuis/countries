
const createCard = (countrie) => {
    const card = document.createElement("article");
    const infoSection = document.createElement("section");
    const flagSection = document.createElement("section");
    const nameElement = document.createElement("p");
    const capitalElement = document.createElement("p");
    const populationElement = document.createElement("p");
    const flagElement = document.createElement("img");
    
    const name = countrie.name.official;
    let capital = "";
    if(countrie.capital != undefined) {
        capital = countrie.capital[0];
    } else {
        capital = "n/a";
    }
    
    const population = countrie.population;
    nameElement.innerText = `Name: ${name}`;
    capitalElement.innerText = `Capital: ${capital}`;
    populationElement.innerText = `Population: ${population}`;

    infoSection.appendChild(nameElement);
    infoSection.appendChild(capitalElement);
    infoSection.appendChild(populationElement);
    infoSection.setAttribute("class", "country__info");

    const flagAlt = "bandera de México";
    flagElement.setAttribute("class","country__img");
    flagElement.setAttribute("alt",flagAlt);
    flagElement.setAttribute("src",countrie.flags.png);

    flagSection.appendChild(flagElement);
    flagSection.setAttribute("class", "country__flag");

    card.appendChild(infoSection);
    card.appendChild(flagSection);
    card.setAttribute("class", "country");
    
    return card;
    
}

const loadCountries = async () => {
    const countryGrid = document.querySelector(".countries");
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");    
        const countries = response.data;
        countryGrid.innerHTML = "";

        for(countrie of countries) {
           const card = createCard(countrie);
           countryGrid.appendChild(card);
           
        }     
       
    } catch(error) {
        console.log("Error: ", error);
    }
}

document.addEventListener("DOMContentLoaded", loadCountries);

const searchCountry = async () => {
    const countryName = document.getElementById("search__input").value.toLowerCase(); 
    const countryGrid = document.querySelector(".countries");    
    try {
        const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        console.log(countryResponse);
        const countries = countryResponse.data;
        countryGrid.innerHTML = "";    
        for(country of countries) {
            const card = createCard(country);
            countryGrid.appendChild(card);    
        }            
            
    }catch(error) {
        console.log("Error: ", error);
    }
};

document.querySelector(".search__button").addEventListener("click", searchCountry);
document.getElementById("search__input").addEventListener("keypress", key => {
    if(key.code == "Enter") {
        searchCountry();
    }
});

document.getElementById("search__input").addEventListener("keydown", key => {
    if(key.code == "Backspace") {
        loadCountries();
    }
})

document.querySelector("h1").addEventListener("click", loadCountries);




  