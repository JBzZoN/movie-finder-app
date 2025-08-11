const searchButton = document.querySelector('.search-bar');
const apikey = `b7df9d12`;
const searchButtonArea = document.querySelector('#search-section');
const searchPageResults = document.querySelector('.extra-on-enter');
const horizontalRule = document.querySelector('.horizontal-rule');
const closeButton = document.querySelector('.close-button');
const noResult = document.querySelector('.no-results');

closeButton.addEventListener('click', () => {
    searchButton.value = '';
    searchButtonArea.style.height = `500px`;
    searchPageResults.innerHTML = ``;
    horizontalRule.innerHTML = ``;
});


let results = [];
let results_html = '';

searchButton.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
        let url = `http://www.omdbapi.com/?apikey=${apikey}&s=${searchButton.value}`;
        console.log();
        fetch(url).then((response) => response.json()
        ).then((data) => {
            if(data.Response == 'True') {

                horizontalRule.innerHTML = `
                <hr style="color: grey;">
                `;
                results = [];
                data.Search.forEach((movObj) => {
                    results.push({
                    title: movObj.Title,
                    description: movObj.Year,
                    poster_url: movObj.Poster
                    });
                });

                checkIfItHasAnImage().then(() => {
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

                    console.log(results);
                    searchButtonArea.style.height = `200px`;
                    searchPageResults.innerHTML = `
                    <!--content-->
                    ${results_html}
                    `;
                })

            }else {

                noResult.style.opacity = '1';
                setTimeout(() => {
                    noResult.style.opacity = '0';
                }, 1000); // stays visible for 1 seconds

                searchButtonArea.style.height = `500px`;
                searchPageResults.innerHTML = ``;
                horizontalRule.innerHTML = ``;
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