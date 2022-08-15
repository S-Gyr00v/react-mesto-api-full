import React from "react";
import closeImage from "../../src/images/popup-close-icon.svg";

export default function ImagePopup({ card, onClose }) {
  
  return (
    <section className={`popup ${card && "popup_opened"}`}>
      <div className="popup__container_image">
        <img
          className="popup__card-image"
          src={`${card && card.link}`}
          alt={`${card && card.name}`}
        ></img>

        <h2 className="popup__card-text">{`${card && card.name}`}</h2>
        <button
          type="button"
          className="popup__close-button popup__close-button_image"
        >
          <img
            className="popup__close-image"
            src={closeImage}
            alt="закрыть"
            onClick={onClose}
          />
        </button>
      </div>
    </section>
  );
}
