import { starterMovies as tags } from "./data/starterMovieTags.js";


// Pagination
const paginationDiv = document.querySelector('.pagination');
const loadingText = document.querySelector('.text-loader');
let pageNumber = 1;


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
// Another one - `b7df9d12` Over for 12-08-2025
// Another one - `d4d6bd1b`
const apikey = `cd72faf7`;
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

  movieBox.style.gridTemplateColumns = `repeat(auto-fit, minmax(220px, 1fr))`;
  movieBox.style.marginTop = `50px`;
  
  result.forEach((movObj, index) => {
    movies.push({
      title: movObj.Title,
      description: movObj.Year,
      poster_url: movObj.Poster
    });
  });

  checkIfItHasAnImage().then(() => {
    let postHtml = '';
    // Stop loading screen
    clearInterval(intervalValue);
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
    paginationDiv.innerHTML = `
    <div class="left-page"><<</div>
    <div>${pageNumber}</div>
    <div>${pageNumber + 1}</div>
    <div>${pageNumber + 2}</div>
    <div class="right-page">>></div>
    `;

    document.querySelector('.left-page').addEventListener('click', () => {
      pageNumber -= 1;
      if(pageNumber < 1) {
        pageNumber = 1;
      }
      loadPagination();
    });

    document.querySelector('.right-page').addEventListener('click', () => {
      pageNumber += 1;
      loadPagination();
    });
    
  });
  
  
});


// Pagination
function loadPagination() {
  paginationDiv.innerHTML = `
  <div class="left-page"><<</div>
  <div>${pageNumber}</div>
  <div>${pageNumber + 1}</div>
  <div>${pageNumber + 2}</div>
  <div class="right-page">>></div>
  `;
  document.querySelector('.left-page').addEventListener('click', () => {
    pageNumber -= 1;
    if(pageNumber < 1) {
      pageNumber = 1;
    }
    loadPagination();
  });

  document.querySelector('.right-page').addEventListener('click', () => {
    pageNumber += 1;
    loadPagination();
  });
}

function loadingScreen(textObj) {

  if(textObj) {
    textObj.innerHTML += '.';

    if(textObj.innerHTML === 'Loading....') {
      textObj.innerHTML = 'Loading';
    }
  }
  
}

// movies is a list of objects
async function checkIfItHasAnImage() {
    for(let i = 0; i < movies.length; i++) {
        
        await fetch(movies[i].poster_url).then((response) => {
            if(response.ok === false) {
                movies[i].poster_url = `../images/empty.png`;
            }
        }).catch((error) => {
            movies[i].poster_url = `../images/empty.png`;
        })
            
    }
}