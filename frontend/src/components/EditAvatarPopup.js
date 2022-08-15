import React, {useEffect,useRef} from 'react'
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen,onClose,onUpdateAvatar}) {
    const linkRef = useRef();  
    useEffect(() => {
        linkRef.current.value = "";
      });
     
      function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: linkRef.current.value
        });
      }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар"  isOpen={isOpen} onClose = {onClose} onSubmit={handleSubmit}>
        <label className="popup__profile-info">
          <input ref={linkRef} type="url" id="popup__avatar" className="popup__input popup__input_avatar" name="avatar_input"
            placeholder="Ссылка на картинку" defaultValue="https://cdn.getyourguide.com/img/location/5457947d8d6b8.jpeg/88.jpg"
            required=""
          />
          <span className="popup__avatar-error" />
        </label>
        </PopupWithForm>
    )
}