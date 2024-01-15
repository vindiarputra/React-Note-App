// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NoteHeader from "./components/NoteHeader";
import HomePageWrapper from "./pages/HomePage";
import PageArchiveWrapper from "./pages/PageArchive";
import NewPageWrapper from "./pages/NewNote";
import DetailPageWrapper from "./pages/DetailPage";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import UserRegistrationPage from "./pages/RegisterPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import { ThemeProvider } from "./contexts/ThemeContext";
import ToggleTheme from "./components/ToggleTheme";
import ToggleTranslate from "./components/ToggleTranslate";
import { LocaleProvider } from "./contexts/LocaleContext";
import Loading from "./components/Loading";

const HOME_PATH = process.env.PUBLIC_URL + "/";
const ARCHIVES_PATH = process.env.PUBLIC_URL + "/archives";
const NEW_NOTE_PATH = process.env.PUBLIC_URL + "/notes/new";
const DETAIL_NOTE_PATH = process.env.PUBLIC_URL + "/notes/:id";
const LOGIN_PATH = process.env.PUBLIC_URL + "/";
const REGISTER_PATH = process.env.PUBLIC_URL + "/register";


function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [locale, setLocale] = React.useState(localStorage.getItem("locale") || "id");
  const navigate = useNavigate();

  React.useEffect(() => {
    getUserLogged()
      .then(({ data }) => {
        setLoggedInUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setLoading(false);
      });
  }, []);

  const onSuccessfulLogin = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setLoggedInUser(data);
  };

  const onLogout = () => {
    setLoggedInUser(null);
    putAccessToken("");
  };

  // Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Change Languange
  const toggleTranslate = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  const selectLanguage = ({ id, en }) => {
    if (id === undefined || en === undefined) {
      return "language options is empty";
    }
    return locale === "id" ? id : en;
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleTranslate,
      selectLanguage,
    };
  }, [locale]);

  if (loading) {
    return <Loading />;
  }

  if (loggedInUser === null) {
    return (
      <div className="app-form-input">
        <main>
          <Routes>
            <Route path={LOGIN_PATH} element={<LoginPage loginSuccess={onSuccessfulLogin} />} />
            <Route path={REGISTER_PATH} element={<UserRegistrationPage />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <LocaleProvider value={localeContextValue}>
      <ThemeProvider value={{ theme, toggleTheme }}>
        <div className="app-container">
          <header>
            <NoteHeader logout={onLogout} name={loggedInUser.name} />
          </header>
          <main>
            <Routes>
              <Route path={HOME_PATH} element={<HomePageWrapper />} />
              <Route path={ARCHIVES_PATH} element={<PageArchiveWrapper />} />
              <Route path={NEW_NOTE_PATH} element={<NewPageWrapper />} />
              <Route path={DETAIL_NOTE_PATH} element={<DetailPageWrapper />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>

          <div className="Context-theme">
            <ToggleTheme />
          </div>

          <div className="Context-locale">
            <ToggleTranslate />
          </div>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
