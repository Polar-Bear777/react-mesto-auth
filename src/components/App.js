import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import * as auth from "../utils/auth";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import resolve from "../images/resolve.svg";
import reject from "../images/reject.svg";

function App() {
  // Переменные состояния (useState)
  // NAVIGATE
  const navigate = useNavigate();
  // PROFILE
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // AVATAR
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // ADD_PHOTO
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // OPEN_IMG_CARD
  const [selectedCard, setSelectedCard] = useState(null);
  // DELETE
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  // CARD_DELETE
  const [selectCardDelete, setSelectCardDelete] = useState({});
  // USER_INFO
  const [currentUser, setCurrentUser] = useState({});
  // CARDS
  const [cards, setCards] = useState([]);
  // СТЕЙТЫ ДЛЯ АВТОРИЗАЦИИ/РЕГИСТРАЦИИ
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  // РЕГИСТРАЦИЯ
  function onRegister(email, password) {
    auth
      .registerUser(email, password)
      .then(() => {
        setPopupImage(resolve);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  // ВХОД
  function onLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch(() => {
        setPopupImage(reject);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  // ПОСЛЕ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ, НЕ ТРЕБУЕТСЯ АВТОРИЗАЦИЯ
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.data.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  // ПРОВЕРКА НА ТОКЕН
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Обновление после каждого получения массива с данными
  useEffect(() => {
    // Получим данные с сервера, если loggedIn = true
    if (isLoggedIn === false) {
      return;
    }
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res.map((card) => card));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [isLoggedIn]);

  // Попап PROFILE
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Обработчик PROFILE
  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Попап AVATAR
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Обработчик AVATAR
  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Попап PHOTO
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Обработчик PHOTO
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Попап DELETE
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectCardDelete(card);
  }
  // Обработчик DELETE
  function handleCardDelete(card) {
    api
      .handleDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Попап ФУЛЛСКРИН (клик на карточку)
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обработка ЛАЙКОВ
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  // Выход из авторизованного аккаунта
  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  // ОКНО С УСПЕШНОЙ/НЕУСПЕШНОЙ РЕГИСТРАЦИЕЙ
  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          {/* ВХОД */}
          <Route
            path="/sign-in"
            element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            }
          />

          {/* РЕГИСТРАЦИЯ */}
          <Route
            path="/sign-up"
            element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            }
          />

          {/* АВТОРИЗАЦИЯ */}
          <Route
            exact
            path="/"
            element={
              <>
                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  component={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleDeleteCardClick}
                  onCardLike={handleCardLike}
                  isLogged={isLoggedIn}
                />
                <Footer />
              </>
            }
          />

          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
        </Routes>

        {/* PROFILE */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onCloseClick={handlePopupCloseClick}
        />

        {/* AVATAR */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onCloseClick={handlePopupCloseClick}
        />

        {/* ADD_PHOTO */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onCloseClick={handlePopupCloseClick}
        />

        {/* DELETE */}
        <ConfirmDeletePopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={selectCardDelete}
          onCardDelete={handleCardDelete}
          onCloseClick={handlePopupCloseClick}
        ></ConfirmDeletePopup>

        {/* POPUP OPEN IMG  */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          image={popupImage}
          title={popupTitle}
          onClose={closeAllPopups}
          isOpen={infoTooltip}
          onCloseClick={handlePopupCloseClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
