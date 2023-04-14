// Блок Main
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import profileEditLogo from "./../images/edit.svg";
import profileAddLogo from "./../images/add.svg";

import Card from "./Card";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {
  // Подписка на контекст (App > USER_INFO)
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      {/* Секция Profile */}
      <section className="profile">
        <img 
          src={currentUser.avatar} 
          className="profile__avatar" 
          alt="Портрет Жак-Ив Кусто"
        />
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" onClick={onEditProfile}>
            <img src={profileEditLogo} className="profile__edit" alt="Кнопка 'Редактировать'" />
          </button>
          <h2 className="profile__subtitle">{currentUser.about}</h2>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}>
          <img src={profileAddLogo} className="profile__add" alt="Кнопка 'Добавить'" />
        </button>
        <button
          className="profile__avatar-button"
          onClick={onEditAvatar}
          type="button"
          aria-label="Редактировать аватар профиля"
        ></button>
      </section>

      {/* Секция Elements */}
      <section className="elements">
          {cards.map((card) => {
            return (
              <Card 
                card={card} 
                key={card._id}
                link={card.link}
                name={card.name}
                likes={card.likes}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              ></Card>
            );
          })}
      </section>
    </main>
  );
}

export default Main;
