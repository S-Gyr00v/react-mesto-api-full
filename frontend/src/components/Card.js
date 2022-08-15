import React from 'react'
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
export default function Card({card,onCardClick, onCardLike, onCardDelete}) 

{
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
const currentUser = React.useContext(CurrentUserContext);

// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner._id === currentUser._id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `card__delete-button ${isOwn ? 'card__delete-button_active' : ''}`);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i._id === currentUser._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ''}`; 

return (
<article className="card" >
  <img
    className="card__image"
     src={card.link}
     alt={card.name}
     onClick={handleClick} 
  />
  <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
  <div className="card__container">
    <h2 className="card__name">{card.name}</h2>
    <div className="card__like-box">
      <button className={cardLikeButtonClassName} onClick={handleLikeClick}  type="button" />
      <span className="card__like-count"> {card.likes.length}  </span> 
    </div>
  </div>
</article>
      )}

