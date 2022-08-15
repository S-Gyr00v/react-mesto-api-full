import React from "react";
import closeImage from '../../src/images/popup-close-icon.svg'; 


export default function PopupWithForm({name, title, isOpen, children, onClose, onSubmit}) {
  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} >
    <div className={`popup__container popup__container_${name}`}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={name}  onSubmit={onSubmit}>
         {children}   
        <button
          type="submit"
          name="submit"
          className="popup__submit-button"
        >
          Сохранить
        </button>
      </form>
      <button
        type="button"
        className="popup__close-button popup__close-button_edit"
        onClick = {onClose}
      >
        <img
          className="popup__close-image"
          src={closeImage}
          alt="закрыть"
        />
      </button>
    </div>
  </section>
  )}

