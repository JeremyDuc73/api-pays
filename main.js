
const monBouton = document.querySelector("#fetchAll")

const countryContainer = document.querySelector(".lesPays")
const langageCompteur = document.querySelector(".langageCompteur")

const monBoutonSearch = document.querySelector("#triggerSearch")
const searchField = document.querySelector("#search")

const monBoutonLangage = document.querySelector("#triggerSearchLangage")
const searchLangage = document.querySelector("#searchLangage")

monBouton.addEventListener("click", ()=>{
    clearContainer()
    fetchAll()
})
monBoutonSearch.addEventListener("click", ()=>{
    clearContainer()
    fetchOne(searchField.value)
})
monBoutonLangage.addEventListener("click", ()=>{
    clearContainer()
    fetchLangage(searchLangage.value)
})

function fetchAll(){

    fetch("https://restcountries.com/v3.1/all")
        .then(paysSerialises=>paysSerialises.json())
        .then( paysDeserialises => {

            paysDeserialises.forEach(pays=>{

                addCountryTemplate(pays)


            })

        })
}

function fetchOne(countryName){

    let url = `https://restcountries.com/v3.1/name/${countryName}`

    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            //on sait que la réponse vient dans un tableau contenant un objet pays, donc :

            let country = data[0]


            addCountryPreciseTemplate(country)
        })
}

function addCountryTemplate(country){
    let template = `
                <div class="countryDiv">
                   
                    <img height="20px" width="30px" src="${country.flags.png}" alt="">
                    <p class="clickable">${country.name.common}</p>
                    
                </div>
    `


    countryContainer.innerHTML += template

    let countries = document.querySelectorAll(".clickable").forEach(country=>{

        country.addEventListener("click", ()=>{
            clearContainer()
            fetchOne(country.innerHTML)

        })

    })
}

function addCountryPreciseTemplate(country){
    let template = `
                <div class="countryDiv">
                   
                    <img height="20px" width="20px" src="${country.flags.png}" alt="">
                    <div>
                         <p>${country.name.common}</p>
                        <p>Region :  ${country.region}</p>
                    </div>
                  
                    
                </div>
    `


    countryContainer.innerHTML += template

    let countries = document.querySelectorAll(".clickable").forEach(country=>{

        country.addEventListener("click", ()=>{
            clearContainer()
            fetchOne(country.innerHTML)

        })

    })
}

function clearContainer(){
    document.querySelector(".lesPays").innerHTML = ""
    document.querySelector(".langageCompteur").innerHTML = ""
}

function fetchLangage(langage){
    let url = `https://restcountries.com/v3.1/lang/${langage}`
    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            clearContainer()
            let tableau = data
            addNumberLangage(tableau)
            tableau.forEach(country =>{
                addCountryTemplate(country)
            })
        })
}

function addNumberLangage(langage){
    let template = `
                <div class="countryDiv">
                    <p>${langage.length} countries talk this language</p>
                </div>
    `
    langageCompteur.innerHTML += template
}