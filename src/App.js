import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import React from 'react';

const API_URL = `${process.env.REACT_APP_MOVIE_URL}?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const titles = ['spiderman', 'batman', 'Game of Thrones', 'superman'];

const App = () => {

  const [categories, setCategories] = useState('');

  const fetchMovies = async () => {
    const promises = titles.map((item) => {
      return axios.get(`${API_URL}&s=${item}`);
    })
    Promise.all(promises).then((values) => {
      const categoriesElem = values.map((movi, index) => {return { name: titles[index], data: movi.data.Search }})
      console.log(categoriesElem);
      setCategories(categoriesElem);
    });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <h1>Movie App</h1>
      {
        categories.length > 0
        ? (
          categories.map((category, index) => (
          <div className='container' key={index}>
            <div className='app__movies-wrapper'>
              {category.data.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>
          </div>
        ))
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
