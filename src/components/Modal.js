import React from "react";

const Modal = ({ title, image, year, type }) => {
  
    return (
      <div className="modal">
        <div className="modal__container">
            <div className="modal__info">
                <h2 className="modal__title">{title}</h2>
                <h4 className="modal__year">Year: {year}</h4>
                <h4 className="modal__type">Type: {type}</h4>
            </div>
            <div><img className="modal__image" src={image} alt="" /></div>
        </div>
      </div>
    );
  }

export default Modal