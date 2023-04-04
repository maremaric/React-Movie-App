import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import Modal from './components/Modal';
import React from 'react';

const API_URL = `${process.env.REACT_APP_MOVIE_URL}?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const titles = ['spiderman', 'batman', 'Game of Thrones', 'superman'];

const App = () => {

  const [categories, setCategories] = useState([]);

  const fetchMovies = async () => {
    const promises = titles.map((item) => {
      return axios.get(`${API_URL}&s=${item}`);
    })
    Promise.all(promises).then((values) => {
      const categoriesElem = values.map((movi, index) => { return movi.data.Search })
      // console.log(categoriesElem);
      setCategories(categoriesElem);
    });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

 



  const [xIndex, setXIndex] = useState(0);
  const [yIndex, setYIndex] = useState(0);


 
 

  // current active elem:  categories[yIndex][xIndex]
  

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setYIndex((yIndex) =>
        yIndex === 0 ? yIndex : yIndex - 1
        );
        setXIndex(0);
      } else if (event.key === "ArrowDown") {
        setYIndex((yIndex) =>
        yIndex === categories.length - 1
            ? yIndex
            : yIndex + 1
        );
        setXIndex(0);
      } else if (event.key === "ArrowRight") {
        setXIndex((xIndex) =>
        xIndex === categories[yIndex].length - 1
            ? xIndex
            : xIndex + 1
        );
        
      } else if (event.key === "ArrowLeft") {
        setXIndex((xIndex) =>
        xIndex === 0 ? xIndex : xIndex - 1
        );
      } else if (event.key === "Enter") {
        handleShow();
        
      } else if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [categories, xIndex, yIndex]);






  return (
    <div className="app">
      {
        show === true ? (
          <div>
            <Modal title={categories[yIndex][xIndex]?.Title} image={categories[yIndex][xIndex]?.Poster} year={categories[yIndex][xIndex]?.Year} type={categories[yIndex][xIndex]?.Type} />
          </div>
        ) : (
          <div></div>
        )
      }
      <div></div>
      <h1>Movie App</h1>
      {
        categories.length > 0
          ? (
            categories.map((category, elYIndex) => (
              <div className='container' key={elYIndex}>
                <div className='app__movies-wrapper'>
                  {category.map((movie, elXIndex) => (
                    <MovieCard activeX={xIndex} activeY={yIndex} elemY={elYIndex} elemX={elXIndex} key={elXIndex} movie={movie} />
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
