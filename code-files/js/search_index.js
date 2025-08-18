import { apikey } from "./data/settings.js";

// darkMode Button
const darkMode = document.querySelector('#dark-mode');
const sunMoon = document.querySelector('#sun-moon');

if(mode === 'dark') {
    sunMoon.src = '../images/moon.png';
    document.querySelectorAll('.nav-link').forEach((element) => {
        element.style.setProperty('--inner-color', `rgb(43, 40, 40)`);
        element.style.setProperty('--hover-color', `rgb(79, 72, 72)`);
        element.style.color =  `white`;
    });
}else{
    sunMoon.src = '../images/sun.png';
    document.querySelectorAll('.nav-link').forEach((element) => {
        element.style.setProperty('--inner-color', `white`);
        element.style.setProperty('--hover-color', `rgba(187, 187, 187, 1)`);
        element.style.color =  `black`;
    });
}

const searchButton = document.querySelector('.search-bar');
const searchButtonArea = document.querySelector('#search-section');
const searchPageResults = document.querySelector('.extra-on-enter');
const horizontalRule = document.querySelector('.horizontal-rule');
const closeButton = document.querySelector('.close-button');
const noResult = document.querySelector('.no-results');

let animationOn = false;
let animationKey;
let animationColor = `rgb(255, 255, 0)`;

closeButton.addEventListener('click', () => {
    searchButton.value = '';
    searchButtonArea.style.height = `500px`;
    if(parseInt(window.innerWidth) <= 480)
        searchButtonArea.style.height = `400px`;
    searchPageResults.innerHTML = ``;
    horizontalRule.innerHTML = ``;
});

function animation() {
    if(animationOn === false){
        closeButton.style.backgroundColor = `${animationColor}`;
        closeButton.style.transform = `rotate(180deg)`;
        animationOn = true;
    }
    else{
        closeButton.style.backgroundColor = 'rgb(78, 72, 72)';
        if(mode === 'light') 
            closeButton.style.backgroundColor = 'white';
        closeButton.style.transform = `rotate(0deg)`;
        animationOn = false;
    }
    animationKey = setInterval(()=> {

        if(animationOn === false){
            closeButton.style.backgroundColor = `${animationColor}`;
            closeButton.style.transform = `rotate(180deg)`;
            animationOn = true;
        }
        else{
            closeButton.style.backgroundColor = 'rgb(78, 72, 72)';
            if(mode === 'light') 
                closeButton.style.backgroundColor = 'white';

            closeButton.style.transform = `rotate(0deg)`;
            animationOn = false;
        }
        
    }, 1000);
}

let results = [];
let results_html = '';

searchButton.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
        let url = `https://www.omdbapi.com/?apikey=${apikey}&s=${searchButton.value}`;

        animation();
        
        fetch(url).then((response) => response.json()
        ).then((data) => {

            if(data.Response == 'True') {
                results = [];
                data.Search.forEach((movObj) => {
                    results.push({
                    title: movObj.Title,
                    description: movObj.Year,
                    poster_url: movObj.Poster,
                    imdbID: movObj.imdbID
                    });
                });

                checkIfItHasAnImage().then(() => {

                    horizontalRule.innerHTML = `
                    <hr style="
                        border: none;                  /* remove default */
                        height: 2px;                   /* thickness */
                        background-color: grey;        /* color */
                        ">
                    `;

                    results_html = ``;
                    results.forEach((movie) => {
                    results_html += `
                    <div class="movie-box" data-imdb="${movie.imdbID}" data-poster="${movie.poster_url}">
                        <img src="${movie.poster_url}" alt="${movie.title} Poster">
                        <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <p>${movie.description}</p>
                        </div>
                    </div>`;
                    });

                    searchButtonArea.style.height = `200px`;
                    searchPageResults.innerHTML = `
                    <!--content-->
                    ${results_html}
                    `;
                    document.querySelectorAll('.movie-box').forEach((element) => {
                        element.addEventListener('click', () => {
                            renderOverlay(element.dataset.imdb, element.dataset.poster);
                        })
                    });

                    clearInterval(animationKey);
                    closeButton.style.backgroundColor = 'rgb(78, 72, 72)';
                    if(mode === 'light') 
                        closeButton.style.backgroundColor = 'white';
                    closeButton.style.transform = `rotate(0deg)`;
                    animationOn = false;
                });

            }else {

                noResult.style.opacity = '1';
                setTimeout(() => {
                    noResult.style.opacity = '0';
                }, 1000); // stays visible for 1 seconds

                searchButtonArea.style.height = `500px`;
                if(parseInt(window.innerWidth) <= 480)
                    searchButtonArea.style.height = `400px`;
                searchPageResults.innerHTML = ``;
                horizontalRule.innerHTML = ``;

                clearInterval(animationKey);
                closeButton.style.backgroundColor = 'rgb(78, 72, 72)';
                if(mode === 'light') 
                    closeButton.style.backgroundColor = 'white';
                closeButton.style.transform = `rotate(0deg)`;
                animationOn = false;
            }
        });
    }
})

darkMode.addEventListener('click', () => {
    if(mode === 'dark') {
        
        mode = 'light';
        localStorage.setItem(`mode`, mode);
        sunMoon.src = '../images/sun.png';
        
        sunMoon.style.transform = 'translateX(0px)';
        darkMode.style.border = `2px solid black`;
        sunMoon.style.backgroundColor = `black`;

        document.querySelector('body').style.backgroundColor = `white`;
        document.querySelector('body').style.color = `black`;

        document.querySelectorAll('.nav-link').forEach((element) => {
            element.style.setProperty('--inner-color', `white`);
            element.style.setProperty('--hover-color', `rgba(187, 187, 187, 1)`);
            element.style.color =  `black`;
        });
        
        document.querySelector('.search-bar').style.color = 'black';
        document.querySelector('.search-bar').style.backgroundColor = 'white';
        document.querySelector('.close-button').style.backgroundColor = `white`;
        document.querySelector('.search-bar').style.setProperty('--text-color', 'black');  

    }else{
        mode = 'dark';
        localStorage.setItem(`mode`, mode);
        sunMoon.src = '../images/moon.png';
        
        sunMoon.style.transform = 'translateX(15px)';
        darkMode.style.border = `2px solid white`;
        sunMoon.style.backgroundColor = `white`;

        document.querySelector('body').style.backgroundColor = `rgb(43, 40, 40)`;
        document.querySelector('body').style.color = `white`;

        document.querySelectorAll('.nav-link').forEach((element) => {
            element.style.setProperty('--inner-color', `rgb(43, 40, 40)`);
            element.style.setProperty('--hover-color', `rgb(79, 72, 72)`);
            element.style.color =  `white`;
        });
        document.querySelector('.search-bar').style.color = 'white';
        document.querySelector('.search-bar').style.backgroundColor = 'rgb(78, 72, 72)';
        document.querySelector('.close-button').style.backgroundColor = `rgb(78, 72, 72)`;
        document.querySelector('.search-bar').style.setProperty('--text-color', 'white');   

    }
});


// results is a list of objects
async function checkIfItHasAnImage() {
    for(let i = 0; i < results.length; i++) {
        
        await fetch(results[i].poster_url).then((response) => {
            if(response.ok === false) {
                results[i].poster_url = `../images/empty.png`;
            }
        }).catch((error) => {
            results[i].poster_url = `../images/empty.png`;
        })
            
    }
}


// Overlay box for movie display
function renderOverlay(imdb, poster) {
  const overlay = document.querySelector('.overlay');
  let url = `https://www.omdbapi.com/?apikey=${apikey}&i=${imdb}`;

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