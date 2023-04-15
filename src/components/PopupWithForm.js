function PopupWithForm({ name, title, isOpen, onClose, children, btnText, onSubmit }) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button className="popup__close" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
        <form className="popup__form" id={name} name={name} autoComplete="off" method="get" onSubmit={onSubmit}>
          {children}
          <button className="popup__save" type="submit" aria-label="Сохранить">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
