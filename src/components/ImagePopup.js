function ImagePopup({ card, onClose, onCloseClick }) {
    return (
        <div className={`popup popup-photo ${card ? "popup_is-opened" : ""}`} onClick={onCloseClick}>
            <div className="popup-photo__container">
                <button 
                    className="popup__close popup-photo__close" 
                    type="button"
                    aria-label="Закрыть окно"
                    onClick={onClose}
                ></button>
                <img 
                    className="popup-photo__image" 
                    src={card?.link}
                    alt={card?.name}
                />
                <p className="popup-photo__title">{card?.name}</p>
            </div>
        </div>
    )
    
}

export default ImagePopup;