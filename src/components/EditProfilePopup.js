import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Стейты значений инпутов
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Обработчики для формы инпутов
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      btnText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onCloseClick={props.onCloseClick}
    >
      <input
        type="text"
        id="name"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        onChange={handleNameChange}
        value={name || ""}
      />
      <span id="name-error" className="error error_visible" />
      <input
        type="text"
        id="info"
        className="popup__input popup__input_type_info"
        name="info"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        required
        onChange={handleDescriptionChange}
        value={description || ""}
      />
      <span id="info-error" className="error error_visible" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
