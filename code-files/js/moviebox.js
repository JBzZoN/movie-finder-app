import { movieObjects } from "./data/movieObjects.js";
import { apikey } from "./data/settings.js";

const pages = ["page-a", "page-b", "page-c"];

// Colours
const selectedPageColor = `rgba(54, 77, 120, 0.77)`;

// Pagination
const paginationDiv = document.querySelector('.pagination');
let currPageNumber = 1;
let centerPageOfCurrentPagination = 2;
const moviesInAPage = 60;

const totalMovies = movieObjects.length;
const maxPageNumber = Math.floor(totalMovies/60);

let movies = [];
const movieDisplay = document.querySelector('#movie-display');


function getMovies() {
  for(let i = currPageNumber*moviesInAPage + 1;
      (i < (currPageNumber+1)*moviesInAPage) && (i < totalMovies);
      i++
  ) {
    movies.push(movieObjects[i]);
  }
}

function renderPage() {

  paginationDiv.innerHTML = '';
  movieDisplay.style.marginTop = `0px`;
  movieDisplay.style.gridTemplateColumns = `repeat(auto-fit, minmax(1fr, 1fr))`;
  movieDisplay.innerHTML = `
      <div class="loading">
        <span class="text-loader">Loading</span>
      </div>`;
  const loadingText = document.querySelector('.text-loader');
  const intervalValue = setInterval(()=>{loadingScreen(loadingText);}, 300);
  movies = [];
  getMovies();

  movieDisplay.style.gridTemplateColumns = `repeat(auto-fit, minmax(180px, 1fr))`;
  if(parseInt(window.innerWidth) <= 450)
    movieDisplay.style.gridTemplateColumns = `repeat(auto-fit, minmax(120px, 1fr))`;
  

  checkIfItHasAnImage().then(() => {
    let postHtml = '';
    // Stop loading screen
    clearInterval(intervalValue);
    function createMovieBox() {
      movies.forEach((movie) => {
        postHtml += `
        <div class="movie-box" data-imdb="${movie.imdbID}" data-poster="${movie.Poster}">
          <img src="${movie.Poster}" alt="${movie.Title} Poster">
          <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          </div>
        </div>`;
      });
    }
    movieDisplay.style.marginTop = `50px`;
    createMovieBox();

    movieDisplay.innerHTML = postHtml;

    document.querySelectorAll('.movie-box').forEach((element) => {
      element.addEventListener('click', () => {
        renderOverlay(element.dataset.imdb, element.dataset.poster);
      })
    });
    loadPagination();
    
  });
}

renderPage();

// Pagination
function loadPagination() {

  paginationDiv.innerHTML = `

  <a href="#topmost" style="text-decoration:none; color:black"><div class="left-page"><</div></a>
  <div class="left-section"><<</div>
  <a href="#topmost" style="text-decoration:none; color:black"><div class="pageNumber page-a">${centerPageOfCurrentPagination - 1}</div></a>
  <a href="#topmost" style="text-decoration:none; color:black"><div class="pageNumber page-b">${centerPageOfCurrentPagination}</div></a>
  <a href="#topmost" style="text-decoration:none; color:black"><div class="pageNumber page-c">${centerPageOfCurrentPagination + 1}</div></a>  
  <div class="right-section">>></div>
  <a href="#topmost" style="text-decoration:none; color:black"><div class="right-page">></div></a>
  
  `;

  const pageObjects = pages.map(
  (element) => document.querySelector(`.` + element));
  
  pageObjects.forEach(
    (element) => {
      if(element.innerHTML === currPageNumber.toString()) {
        element.style.backgroundColor = selectedPageColor;
      }
    }
  );

  document.querySelectorAll('.pageNumber').forEach((a) => {
    a.addEventListener('click', () => {
      currPageNumber = Number(a.innerHTML);
      renderPage();
    });
  });

  document.querySelector('.left-section').addEventListener('click', () => {
    centerPageOfCurrentPagination -= 1;
    if(centerPageOfCurrentPagination < 2) {
      centerPageOfCurrentPagination = 2;
    }
    loadPagination();
  });

  document.querySelector('.right-section').addEventListener('click', () => {
    centerPageOfCurrentPagination += 1;
    if(centerPageOfCurrentPagination + 1 > maxPageNumber) {
      centerPageOfCurrentPagination = maxPageNumber - 1;
    }
    loadPagination();
  });


  document.querySelector('.left-page').addEventListener('click', () => {
    currPageNumber -= 1;

    if(currPageNumber < 1) {
      currPageNumber = 1;
    }

    
    if(currPageNumber === centerPageOfCurrentPagination - 2) {
      centerPageOfCurrentPagination -= 1;
    }else if(currPageNumber < centerPageOfCurrentPagination - 2) {
      centerPageOfCurrentPagination = currPageNumber + 1;
    }else if(currPageNumber > centerPageOfCurrentPagination + 1) {
      centerPageOfCurrentPagination = currPageNumber - 1;
    }

    renderPage();
  });

  document.querySelector('.right-page').addEventListener('click', () => {
    currPageNumber += 1;
    if(currPageNumber > maxPageNumber) {
      currPageNumber = maxPageNumber;
    }

    if(currPageNumber === centerPageOfCurrentPagination + 2) {
      centerPageOfCurrentPagination += 1;
    }else if(currPageNumber > centerPageOfCurrentPagination + 2) {
      centerPageOfCurrentPagination = currPageNumber - 1;
    }else if(currPageNumber < centerPageOfCurrentPagination - 1) {
      centerPageOfCurrentPagination = currPageNumber + 1;
    }

    renderPage();
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
        
        await fetch(movies[i].Poster).then((response) => {
            if(response.ok === false) {
                movies[i].Poster = `../images/empty.png`;
            }
        }).catch((error) => {
            movies[i].Poster = `../images/empty.png`;
        })
            
    }
}


// Overlay box for movie display
function renderOverlay(imdb, poster) {
  const overlay = document.querySelector('.overlay');

  let url = `http://www.omdbapi.com/?apikey=${apikey}&i=${imdb}`;

  fetch(url).then((response) => response.json()
  ).then((data) => {

        if(data.Response == 'True') {

          overlay.style.visibility = 'visible';
          renderOverlayData(data, poster);
          document.querySelector('.close-overlay').addEventListener('click', () => {
            overlay.style.visibility = 'hidden';
          });
        }
    });
}

function renderOverlayData(data, poster) {
  let overlayImageRating = document.querySelector('.poster-ratings');
  let html_lol =`
    <img src="${poster}">
    <div class="ratings-overlay">
      <p>Title: ${data.Title}</p>
      <p>Genre: ${data.Genre}</p>
      <p>Language: ${data.Language}</p>
      <p>Year: ${data.Year}</p>
      </br>
  `;
  
  if(data.Ratings.length === 1)
    html_lol+=
       `<p class="rating">IMDb🎥: ${data.Ratings[0].Value}</p>
        </div>`;
  else if(data.Ratings.length === 2)
    html_lol+=
       `<p class="rating">IMDb🎥: ${data.Ratings[0].Value}</p>
        <p class="rating">Rotten Tomatoes🍅: ${data.Ratings[1].Value}</p>
        </div>`;
  else if(data.Ratings.length === 3)
      html_lol+=
      `<p class="rating">IMDb🎥: ${data.Ratings[0].Value}</p>
       <p class="rating">Rotten Tomatoes🍅: ${data.Ratings[1].Value}</p>
       <p class="rating">Metacritic🎞️: ${data.Ratings[2].Value}</p>  
       </div>`;
  else
    html_lol+= '</div>';

  overlayImageRating.innerHTML = html_lol;

  let overlayMovieDescription = document.querySelector('.movie-description');
  overlayMovieDescription.innerHTML=`
    <p>Director: ${data.Director}</p>
    <p>Writer: ${data.Writer}</p>
    <p>Actors: ${data.Actors}</p>
    <p>Box Office: ${data.BoxOffice}</p>
    <p>Plot: ${data.Plot}</p>
  `;
}