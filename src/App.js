import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
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



  

 /* const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setActiveIndex((activeIndex) =>
          activeIndex === 0 ? activeIndex : activeIndex - 1
        );
      } else if (event.key === "ArrowDown") {
        setActiveIndex((activeIndex) =>
          activeIndex === containerDivs.length - 1
            ? activeIndex
            : activeIndex + 1
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const containerDivs = document.querySelectorAll(".container");

  useEffect(() => {
    containerDivs.forEach((div, index) => {
      if (index === activeIndex) {
        div.classList.add("active");
        div.focus();
      } else {
        div.classList.remove("active");
      }
    });
  }, [activeIndex, containerDivs]);
*/





const [activeIndex, setActiveIndex] = useState(0);
const containerDivs = document.querySelectorAll(".container");
const activeDivRef = useRef(null);

useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setActiveIndex((activeIndex) =>
        activeIndex === 0 ? activeIndex : activeIndex - 1
      );
    } else if (event.key === "ArrowDown") {
      setActiveIndex((activeIndex) =>
        activeIndex === containerDivs.length - 1
          ? activeIndex
          : activeIndex + 1
      );
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [activeIndex, containerDivs]);

useEffect(() => {
  containerDivs.forEach((div, index) => {
    if (index === activeIndex) {
      div.classList.add("active");
      activeDivRef.current = div;
      div.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      div.classList.remove("active");
    }
  });
}, [activeIndex, containerDivs]);







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
