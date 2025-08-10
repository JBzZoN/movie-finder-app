const searchButton = document.querySelector('.search-bar');

const apikey = `b7df9d12`;


searchButton.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
        let url = `http://www.omdbapi.com/?apikey=${apikey}&s=${searchButton.value}`;
        console.log();
        fetch(url).then((response) => response.json()
        ).then((data) => {if(data.Response == 'True')console.log(data);});
    }
})

// now add some way to show the results inside the index page