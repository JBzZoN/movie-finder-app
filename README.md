# 🎥Movie Finder App

Movie Finder App is a web-based application built purely with HTML, CSS, and JavaScript. It lets users search for any movie title using the OMDb (Open Movie Database) API and displays comprehensive details about the selected movie. Key information such as title, director, actors, box office, language, genre, runtime, and more are shown for each search result. The app also includes a curated collection of 750 popular/latest movies for users to explore and spark curiosity. It features a clean, user-friendly interface with pagination for browsing lists. A dark/light theme toggle is provided, and the current theme mode and pagination state are saved in the browser’s localStorage, ensuring these preferences persist across sessions.

The app is hosted on GitHub Pages at [Movie Finder App Live Demo](https://jbzzon.github.io/movie-finder-app/code-files/), where you can try it live. This project was developed collaboratively by Josh Biju and Vishnumukund.

---

## 🪶Features

- **OMDb API Movie Search** – Search for movies by title. The app uses the [OMDb API](https://www.omdbapi.com) to fetch detailed data on each movie.
- **Detailed Movie Information** – Displays a movie’s title, director, cast, box office, language, genre, runtime, ratings, and more in a well-organized view.
- **Curated Movie List** – Built-in database of 750 popular/latest movies. Users can browse through this collection to discover new titles.
- **Dark/Light Mode** – Toggle between dark and light themes for comfortable viewing. The chosen theme (and current page of results) is remembered using the Web Storage API; data saved in `localStorage` is retained across browser sessions.
- **Responsive Interface** – Designed to work on various devices and screen sizes with modern styling (split CSS across multiple files for modularity).
- **Technology Stack** – Built with JavaScript (no frameworks or libraries required) and styled with CSS. Two HTML pages (`index.html` for search, `movies.html` for the movie list) handle the application interface.

---

## 🕸️Live Demo

A live demo of the Movie Finder App is available on GitHub Pages: [Movie Finder App](https://jbzzon.github.io/movie-finder-app/code-files/). No installation is necessary—simply open the link or, for local use, clone the repository and open `code-files/index.html` in a web browser (no server setup required).

---

## 👤Usage

- **Search for Movies:** On the homepage (`index.html`), enter a movie title into the search bar and click the Search button. The app will query the OMDb API and display matching results.
- **View Movie Details:** Click on a movie result to see its full details (title, cast, box office, etc.).
- **Explore the Curated List:** Go to `movies.html` to browse the list of 750 preloaded popular movies. Use the pagination controls to navigate.
- **Theme Toggle:** Use the theme switch to change between dark and light mode. Your preference and current page are stored and automatically reloaded on subsequent visits.

---

## 🌳Folder Structure
<pre>
Movie Finder App/
├── code-files/
│ ├── index.html
│ ├── movies.html
│ ├── js/
│ │ ├── moviebox.js
│ │ ├── search_index.js
│ │ └── data/ # Internal data (list of 750 movies)
│ └── style/
│ ├── general.css
│ ├── index.css
│ ├── movie.css
│ └── header-and-footer.css
├── images/
└── README.md
</pre>

**code-files/js/** – Contains JavaScript source:

- `moviebox.js` – Handles movie data rendering and UI interactions.
- `search_index.js` – Manages search functionality and API calls.
- `data/` – Internal data folder (contains JSON or JS data for the 750-movie list).

**code-files/style/** – Contains CSS files for styling different pages and components (`general.css`, `index.css`, `movie.css`, `header-and-footer.css`).

**code-files/index.html** – The homepage where users search for movies.

**code-files/movies.html** – Page displaying the curated movie list with pagination.

**README.md** – This documentation file.

---

## ⚙️Technologies Used

- **HTML, CSS, JavaScript** – The app is built with standard web technologies (no frontend frameworks).
- **OMDb API** – Used for fetching movie details ([omdbapi.com](https://www.omdbapi.com)).

---

## 👥Authors

- **Josh Biju**
- **Vishnumukund**
