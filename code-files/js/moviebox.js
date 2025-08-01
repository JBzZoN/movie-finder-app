document.addEventListener("DOMContentLoaded", () => {
  const movies = [
    // {
    //   title: "Inception",
    //   description: "A mind-bending thriller by Christopher Nolan.",
    //   poster_url: "moviesjpg/inception.jpg"
    // },
    // {
    //   title: "The Matrix",
    //   description: "A hacker discovers the reality he lives in is a simulation.",
    //   poster_url: "moviesjpg/matrix.jpg"
    // },
    // {
    //   title: "Interstellar",
    //   description: "Exploring space to save humanity.",
    //   poster_url: "moviesjpg/interstellar.jpg"
    // }
    // Add more movie objects as needed
  ];
  for (let i = 1; i<= 25; i++) {
    movies.push({
      title: `Test Movie ${i}`,
      description: `This is a placeholder description for movie ${i}.`,
      poster_url: "moviesjpg/test.jpg"
    });
  }

function createMovieBox(movie) {
  const div = document.createElement('div');
  div.className = 'movie-box';
  div.innerHTML = `
    <img src="${movie.poster_url}" alt="${movie.title} Poster">
    <div class="movie-info">
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
    </div>
  `;
  return div;
}


const display = document.getElementById('movie-display');
movies.forEach(movie => {
    const box = createMovieBox(movie);
    display.appendChild(box);
  });
});
