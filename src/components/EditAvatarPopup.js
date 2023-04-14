import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onCloseClick }) {
  // Реф
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      btnText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseClick={onCloseClick}
    >
      <input
        type="url"
        id="url"
        className="popup__input popup__input_type_avatar-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span id="url-error" className="error error_visible" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
