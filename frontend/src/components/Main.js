import React from 'react'

import addImage from '../../src/images/profile-button-plus.svg'; 
import pencilImage from '../../src/images/profile-button-pen.svg'; 
import Card from './Card'
import {CurrentUserContext} from "../contexts/CurrentUserContext";


export default function Main({onEditProfile,onAddPlace,onEditAvatar, onCardClick,cards, setCards, onCardDelete,onCardLike}) {


  const currentUser = React.useContext(CurrentUserContext);
  

  return (

    <div className="content">
     <section className="profile">
      <button className="profile__avatar-box" onClick = {onEditAvatar} >
        <img
          className="profile__avatar"
          src={currentUser.user.avatar}
          alt={currentUser.user.name}
        />
         </button>
            <div className="profile__box">
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.user.name}</h1>
          <div className="profile__button">
            <button type="button" className="profile__edit" onClick = {onEditProfile} >
            <img alt='Редактировать' src={ pencilImage } className="profile__pencil" / >  
            </button>
          </div>
        </div>
        <p className="profile__subtitle">{currentUser.user.about}</p>
      </div>
      <div className="profile__add">
        <button type="button" className="profile__add-button" onClick = {onAddPlace}>
        <img alt='Добавить' src={addImage} className="profile__add-image"/>
        </button>
      </div>
    </section>

    <section className="newelements">
      {cards.map((card) => {
        return (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete = {onCardDelete}/>

          );
        })}
      </section>

</div>

  )}
