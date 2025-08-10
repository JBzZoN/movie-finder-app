import { starterMovies as tags } from "./data/starterMovieTags.js";

const starterMovies = [];
const randomNumbers = [];
// with 5 movie tags upto 50 movies
// 10 movie with each search
while(starterMovies.length != 5) {
  let random = (Math.round(Math.random()*1000))%tags.length;

  if(randomNumbers.includes(random)) {
    continue;
  }

  randomNumbers.push(random);
  starterMovies.push(tags[random]);
}

// OMDB API initialisation. 1000 req per day
const apikey = `b7df9d12`;
let result = [];

const intervalValue = setInterval(()=>{loadingScreen(loadingText);}, 300);


async function getMovies() {

  for(let i = 0; i < starterMovies.length; i++) {
    let url = `http://www.omdbapi.com/?apikey=${apikey}&s=${starterMovies[i]}`;
    const response = await fetch(url);
    result = result.concat((await response.json()).Search);
  }

}

console.log(result.length, result);

const movies = [];
const movieBox = document.querySelector('#movie-display');

// after loading the api request, execute the function inside then
getMovies().then(() => {

  // Stop loading screen
  clearInterval(intervalValue);
  movieBox.style.gridTemplateColumns = `repeat(auto-fit, minmax(220px, 1fr))`;
  movieBox.style.marginTop = `50px`;
  
  result.forEach((movObj, index) => {
    movies.push({
      title: movObj.Title,
      description: movObj.Year,
      poster_url: movObj.Poster
    });
  });
  
  let postHtml = '';
  function createMovieBox() {
    movies.forEach((movie) => {
      postHtml += `
      <div class="movie-box">
        <img src="${movie.poster_url}" alt="${movie.title} Poster">
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <p>${movie.description}</p>
        </div>
      </div>`;
    });
  }
  createMovieBox();
  movieBox.innerHTML = postHtml;
});

const loadingText = document.querySelector('.text-loader');

function loadingScreen(textObj) {

  if(textObj) {
    textObj.innerHTML += '.';

    if(textObj.innerHTML == 'Loading....') {
      textObj.innerHTML = 'Loading';
    }
  }
  
}