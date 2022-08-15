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
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [isRegistered, setIsRegistered] = useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [tokenState, setTokenState] = useState("");

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
    const token = localStorage.getItem("jwt");
    api
      .editProfile(name, about, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    const token = localStorage.getItem("jwt");
    api
      .updateAvatar(avatar, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if ([loggedIn]) {
      console.log("res")
    api
      .getProfile(token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))}
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    api
      .getCards(token)
      .then((renderCard) => {
        setCards(renderCard);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect (() => {
    if (tokenState) {
      tokenCheck()
    }
      }, [tokenState])

  function handleCardLike(card) {
    const token = localStorage.getItem("jwt");
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    const token = localStorage.getItem("jwt");
    api
      .addCard(name, link, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem("jwt");
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCards((state) => state.filter((с) => с._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (tokenState) {
      tokenCheck()
    }
  }, []);



  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    // console.log("jwt", jwt)
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          console.log(res);
          if (res) {
            setEmail(res.user.email);
            setLoggedIn(true);
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
        history.push("/");
        // tokenCheck();
        setTokenState(res.token)
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
