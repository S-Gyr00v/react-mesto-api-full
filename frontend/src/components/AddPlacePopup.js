
import React, {useState,useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen,onClose, onAddCard}) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        onAddCard({
          name,
          link,
        });
      }

      const handleNameInput = (e) => {
        e.preventDefault();
        setName(e.target.value)
      }
    
      const handleLinkInput = (e) => {
        e.preventDefault();
        setLink(e.target.value)
      }

      useEffect(() => {
        setName('');
        setLink('');
      }, [isOpen]);

    return (
        <PopupWithForm name="add" title="Новое место" isOpen={isOpen} onClose = {onClose} onSubmit={handleSubmit} >
        <label className="popup__profile-info">
          <input type="text" value ={name} id="popup__place" className="popup__input popup__input_add"
            name="name_add" placeholder="Название"  minLength={2} maxLength={40}
            required="" onChange={handleNameInput}
          />
          <span className="popup__place-error" />
        </label>
        <label className="popup__profile-info">
          <input type="url" value ={link} id="popup__src" className="popup__input popup__input_add" name="src_add"
            placeholder="Ссылка на картинку"  required="" onChange={handleLinkInput}
          />
          <span className="popup__src-error" />
        </label>   
        </PopupWithForm>
    )
}