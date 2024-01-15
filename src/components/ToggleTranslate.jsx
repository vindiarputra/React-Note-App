import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";

const ToggleTranslate = () => {
  const { toggleTranslate, selectLanguage } = useContext(LocaleContext);

  return <button onClick={toggleTranslate}>{selectLanguage({ id: "Indonesia", en: "English" })}</button>;
};

export default ToggleTranslate;
