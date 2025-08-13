import { movieObjects } from "./data/movieObjects.js";

console.log(movieObjects.length);

const pages = ["page-a", "page-b", "page-c"];

// Colours
const selectedPageColor = `rgba(217, 94, 94, 1)`;

// Pagination
const paginationDiv = document.querySelector('.pagination');
let currPageNumber = 1;
let centerPageOfCurrentPagination = 2;
const moviesInAPage = 60;

const totalMovies = movieObjects.length;
const maxPageNumber = Math.floor(totalMovies/60);

let movies = [];
const movieBox = document.querySelector('#movie-display');


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
  movieBox.style.marginTop = `0px`;
  movieBox.style.gridTemplateColumns = `repeat(auto-fit, minmax(1fr, 1fr))`;
  movieBox.innerHTML = `
      <div class="loading">
        <span class="text-loader">Loading</span>
      </div>`;
  const loadingText = document.querySelector('.text-loader');
  const intervalValue = setInterval(()=>{loadingScreen(loadingText);}, 300);
  movies = [];
  getMovies();

  movieBox.style.gridTemplateColumns = `repeat(auto-fit, minmax(220px, 1fr))`;

  checkIfItHasAnImage().then(() => {
    let postHtml = '';
    // Stop loading screen
    clearInterval(intervalValue);
    function createMovieBox() {
      movies.forEach((movie) => {
        postHtml += `
        <div class="movie-box">
          <img src="${movie.Poster}" alt="${movie.Title} Poster">
          <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          </div>
        </div>`;
      });
    }
    movieBox.style.marginTop = `50px`;
    createMovieBox();
    movieBox.innerHTML = postHtml;
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