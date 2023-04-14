import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose, onCloseClick }) {
  // Стейты значений
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  // Сбросим форму при открытии
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseClick={onCloseClick}
    >
      <input
        type="text"
        id="title"
        className="popup__input popup-card__input popup-card__input_type_title"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        onChange={handleNameChange}
        value={name || ""}
      />
      <span id="title-error" className="error error_visible" />
      <input
        type="url"
        id="link"
        className="popup__input popup-card__input popup-card__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link || ""}
      />
      <span id="link-error" className="error error_visible" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
