import React, { useContext } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

const SearchNote = ({ keyword, keywordChange }) => {
  const { selectLanguage } = useContext(LocaleContext);
  const handleKeywordChange = (event) => {
    keywordChange(event.target.value);
  };

  return (
    <div className="search-container">
      <input type="search" className="search-input" placeholder={selectLanguage({ id: "Cari Judul Catatan...", en: "Search Note Title..." })} value={keyword} onChange={handleKeywordChange} />
    </div>
  );
};

SearchNote.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchNote;
