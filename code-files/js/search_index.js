const searchButton = document.querySelector('.search-bar');
const apikey = `b7df9d12`;
const searchButtonArea = document.querySelector('#search-section');
const searchPageResults = document.querySelector('.extra-on-enter');
const horizontalRule = document.querySelector('.horizontal-rule');
const closeButton = document.querySelector('.close-button');
const noResult = document.querySelector('.no-results');

let animationOn = false;
let animationKey;
let animationColor = `rgba(217, 94, 94, 1)`;

closeButton.addEventListener('click', () => {
    searchButton.value = '';
    searchButtonArea.style.height = `500px`;
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
        let url = `http://www.omdbapi.com/?apikey=${apikey}&s=${searchButton.value}`;

        animation();
        
        fetch(url).then((response) => response.json()
        ).then((data) => {

            if(data.Response == 'True') {
                results = [];
                data.Search.forEach((movObj) => {
                    results.push({
                    title: movObj.Title,
                    description: movObj.Year,
                    poster_url: movObj.Poster
                    });
                });

                checkIfItHasAnImage().then(() => {

                    horizontalRule.innerHTML = `
                    <hr style="color: grey;">
                    `;

                    results_html = ``;
                    results.forEach((movie) => {
                    results_html += `
                    <div class="movie-box">
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

                    clearInterval(animationKey);
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
                searchPageResults.innerHTML = ``;
                horizontalRule.innerHTML = ``;

                clearInterval(animationKey);
                closeButton.style.backgroundColor = 'white';
                closeButton.style.transform = `rotate(0deg)`;
                animationOn = false;
            }
        });
    }
})

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