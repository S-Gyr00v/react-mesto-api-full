import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

import { Route, Switch, Redirect, useHistory } from "react-router-dom"; // импортируем BrowserRouter
import Login from "./Login";
import Register from "./Register";

import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC
import * as Auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [isRegistered, setIsRegistered] = useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [tokenState, setTokenState] = useState("");
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    tokenCheck()
  }, []);

  useEffect(() => {
    if (tokenState) {
      Promise.all([api.getProfile(tokenState), api.getCards(tokenState)])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setEmail(user.user.email)
          setCards(cards)
          setLoader(false)
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  };
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about, tokenState)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar, tokenState)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser.user._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked, tokenState)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link, tokenState)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, tokenState)
      .then(() => {
        setCards((state) => state.filter((с) => с._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setTokenState(jwt)
            history.push("/");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  function handleLogin({ email, password }) {
    Auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setTokenState(res.token)
        history.push("/");
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleRegister({ email, password }) {
    Auth.register(email, password)
      .then(() => {
        setIsRegistered(true);
        history.push("/sign-in");
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRegistered(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <title>Mesto</title>

          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Header
                loggedIn={loggedIn}
                email={email}
                handleLogout={handleLogout}
                name="Выйти"
                path="/sign-in"
              />
              {!loader &&
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  setCards={setCards}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                />
              }

              <Footer className="footer" />
            </ProtectedRoute>

            <Route path="/sign-in">
              <Header name="Регистрация" path="/sign-up" />
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Header name="Войти" path="/sign-in" />
              <Register handleRegister={handleRegister} />
            </Route>

            <Route path="/">
              {loggedIn ? <Redirect to="/serj" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegistered={isRegistered}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
