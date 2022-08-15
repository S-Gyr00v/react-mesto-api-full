import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleDescriptionInput(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__profile-info">
        <input
          onChange={handleNameInput}
          value={name || ""}
          type="text"
          id="popup__name"
          className="popup__input popup__input_edit"
          name="name"
          placeholder="Имя"
          required=""
          minLength={2}
          maxLength={40}
        />
        <span className="popup__name-error" />
      </label>
      <label className="popup__profile-info">
        <input
          onChange={handleDescriptionInput}
          value={description || ""}
          type="text"
          id="popup__info"
          className="popup__input popup__input_edit"
          name="subtitle"
          placeholder="Кратко о себе"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span className="popup__info-error" />
      </label>
    </PopupWithForm>
  );
}
