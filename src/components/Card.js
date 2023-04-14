import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    // Подписка на контекст (App > USER_INFO)
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отображение стиля лайка
    const cardLikeButtonClassName = ( 
        `elements__like ${isLiked && 'elements__like_active'}` 
    );

    // Обработчик клика
    function handleCardClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <article key={card._id} className="elements__item">
            <img 
                className="elements__image"
                src={card.link}
                alt={card.name}
                onClick={handleCardClick}
            />
            <button 
                className="elements__delete" 
                type="button"
                onClick={handleDeleteClick}
                aria-label="Удалить карточку"
            ></button>
            <div className="elements__container">
                <h2 className="elements__title">{card.name}</h2>
                <button 
                    className={cardLikeButtonClassName} 
                    onClick={handleLikeClick}
                    type="button"
                    aria-label="Оценить фото"
                ></button>
            </div>
            <span className="elements__like-number">{card.likes.length}</span>
        </article>
    )
}

export default Card;
