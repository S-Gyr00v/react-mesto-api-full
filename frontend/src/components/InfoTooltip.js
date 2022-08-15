import React from "react";

import closeImage from "../../src/images/popup-close-icon.svg";

import NotUnion from "../../src/images/NotUnion.jpg";

import Union from "../../src/images/Union.jpg";

function InfoTooltip({ isOpen, onClose, isRegistered }) {
  return (
    <div className={`login__popup-box ${isOpen && "popup_opened"}`}>
     
      <img
        className="login__image "
        src={isRegistered ? Union : NotUnion}
        alt=""
      />

      <p className="login__text">
        {isRegistered
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </p>

      <button
        type="reset"
        className="popup__close-button popup__close-button_edit"
        onClick={onClose}
      >
        <img
          className={"popup__close-image"}
          src={closeImage}
          alt="закрыть"
        />
      </button>
    </div>
  );
}

export default InfoTooltip;
