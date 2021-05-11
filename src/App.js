import React, {useEffect, useState} from 'react';
import GetMovie from './components/GetMovie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API =  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {
  const [movies_array, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
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
      setPageNumber(1);
    }
  };
  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  }
  const prevPage = () => {
    if(pageNumber >1)
    {
      const pg = pageNumber-1;
      setPageNumber(pg);
      GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
    }
  }
  const nextPage = () => {
    const pg = pageNumber+1;
    setPageNumber(pg);
    GetMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page="+pg);
  }
  const siteClicked = () => {
    GetMovies(FEATURED_API);
    setPageNumber(1);
  }
  return (
    <>
    <header>
        <h2 className="site-name"><span onClick={siteClicked}>My Movies</span></h2>
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
    <div className="bars-to-pages">
      <div className="movie-pages">
        <button className="page-change" onClick={prevPage}>&lt;&nbsp;&lt;&nbsp;</button>
            <span className="pgnumber">{pageNumber}</span>
        <button className="page-change" onClick={nextPage}>&nbsp;&gt;&nbsp;&gt;</button>
      </div>
    </div>
    <footer className="footer">
      © 2021 All rights reserved
    </footer>
    </>
  );
}

export default App;
