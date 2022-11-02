// API Key :  6d789beb

const searchBtn = document.getElementById("search-btn")
const inputEl = document.getElementById("search-field")
let inputValue = ""
const bottomContainer = document.getElementById("bottom-container")
let topThreeMovies = []
let movieDetailArray =[]
let movieIDArray = []

searchBtn.addEventListener("click", ()=>{
    reset()
    inputValue = inputEl.value.replace(" ", "_")
    searchMovieTitles(inputValue)
    inputEl.value = ""
})

function reset(){
    movieDetailArray = []
    topThreeMovies = []
    movieIDArray = []
    bottomContainer.innerHTML = ""
}

async function searchMovieTitles(input) {
    const res = await fetch(`https://www.omdbapi.com/?s=${input}&apikey=6d789beb`)
    const data = await res.json()
    for (let i=0; i<data.Search.length; i++){
        movieIDArray.push(data.Search[i].imdbID)
    }
    topThreeMovies = movieIDArray.slice(0,3)
    searchMovieID(topThreeMovies)
}

function searchMovieID(array) {
    array.map(function(id){
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=6d789beb`)
            .then(res => res.json())
            .then(data => {
                renderMovie(data.Poster, data.Title, data.Ratings[0].Value, data.Runtime, data.Genre, data.Plot)
                saveToLocalStorage (data.Poster, data.Title, data.Ratings[0].Value, data.Runtime, data.Genre, data.Plot)
            })
    })
}



function renderMovie(poster, title, rating, runtime, genre, plot) {
    bottomContainer.innerHTML += `
        <div class="movie-item">
            <img src="${poster}">
            <div class="movie-details">
                <div class="title-rating">
                    <h3>${title}</h3>
                    <p><img src="img/star-icon.png">${rating}</p>
                </div>
                <div class="runtime-genre-addWatchlist">
                    <p>${runtime}</p>
                    <p>${genre}</p>
                    <button id="watchlist-btn"><img src="img/add-icon.png">Watchlist</button>
                </div>
                
                <p>${plot}</p>
            </div>
        </div>
        `
}



function consoleLogHi() {
    console.log("hi")
}

function saveToLocalStorage (poster, title, rating, runtime, genre, plot) {
    localStorage.setItem("title", title)
    localStorage.setItem("poster", poster)
    localStorage.setItem("rating", rating)
    localStorage.setItem("runtime", runtime)
    localStorage.setItem("genre", genre)
    localStorage.setItem("plot", plot)
}

function addToWatchlist() {
    document.getElementById("watchlist-container").innerHTML += `
    <div class="movie-item">
            <img src="${localStorage.getItem("poster")}">
            <div class="movie-details">
                <div class="title-rating">
                    <h3>${localStorage.getItem("title")}</h3>
                    <p><img src="img/star-icon.png">${localStorage.getItem("rating")}</p>
                </div>
                <div class="runtime-genre-addWatchlist">
                    <p>${localStorage.getItem("runtime")}</p>
                    <p>${localStorage.getItem("genre")}</p>
                    <button id="watchlist-btn"><img src="img/add-icon.png">Watchlist</button>
                </div>
                
                <p>${localStorage.getItem("plot")}</p>
            </div>
        </div>
    `
}










