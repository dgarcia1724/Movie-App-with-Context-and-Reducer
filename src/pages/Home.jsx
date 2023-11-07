import { createContext, useContext, useEffect, useReducer } from "react";

const KEY = "4fefc778";

// 1. Create
const MovieContext = createContext();

const initialState = {
  query: "",
  movieList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setMovieList":
      return { ...state, movieList: action.payload };
    case "setQuery":
      return { ...state, query: action.payload };
    default:
      throw new Error("unknown action");
  }
}

function Home() {
  const [{ query, movieList }, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchMovieList() {
        try {
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!response.ok) throw new Error("Failed to fetch");

          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie not found");

          console.log(data.Search);
          dispatch({ type: "setMovieList", payload: data.Search });
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchMovieList();
    },
    [query]
  );

  return (
    <div className="p-10">
      {/* 2. Provide */}
      <MovieContext.Provider value={{ query, movieList, dispatch }}>
        <h1>Home</h1>
        <Search />
        <MovieList />
      </MovieContext.Provider>
    </div>
  );
}

function Search() {
  // 3. Consume
  const { query, dispatch } = useContext(MovieContext);

  return (
    <input
      type="text"
      placeholder="Search Movies..."
      value={query}
      onChange={(e) => dispatch({ type: "setQuery", payload: e.target.value })}
    />
  );
}

function MovieList() {
  // 3. Consume
  const { movieList } = useContext(MovieContext);

  return (
    <ul className="grid grid-cols-5">
      {movieList.map((movie) => {
        return <Movie movie={movie} key={movie.imdbID} />;
      })}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <h3>{movie.Year}</h3>
    </li>
  );
}

export default Home;
