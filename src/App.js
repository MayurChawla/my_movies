import React, {useEffect, useState} from 'react';
import GetMovie from './components/GetMovie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {
  const [movies_array, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    GetMovies(FEATURED_API);
  }, []);
  
  const GetMovies = (API) => {
    fetch(API).then(res => res.json()).then(data => {
      setMovies(data.results);
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(searchTerm)
    {
      GetMovies(SEARCH_API+searchTerm);
      setSearchTerm("");
    }
  };
  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <>
    
    <header>
        <h2 className="site-name">My Movies</h2>
        <form action="" onSubmit={onSubmitHandler}>
          <input type="search" placeholder="search..." className="searchbar"
            value={searchTerm} onChange={onChangeHandler}
          ></input>

        </form>
      </header>
    <div className="movie-container">
      
      {movies_array.length>0 && movies_array.map((movie)=>(
        <GetMovie key={movie.id} {...movie}/>
      ))}
    </div>
    <footer>
      <a> "prev" </a>
          pagenumber
      <a> "next" </a>
    </footer>
    </>
  );
}

export default App;
