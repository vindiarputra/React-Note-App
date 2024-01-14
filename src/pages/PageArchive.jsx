import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchNote from "../components/SearchNote";
import { getArchivedNotes } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import LocaleContext from "../contexts/LocaleContext";

function ArsipPage({ notes, keyword, keywordChange }) {
  const { selectLanguage } = useContext(LocaleContext);

  const filteredNotes = notes.filter(({ title }) => title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <section className="ArsipPage">
      <h2>{selectLanguage({ id: "Catatan Arsip", en: "Archived Notes" })}</h2>
      <SearchNote keyword={keyword} keywordChange={keywordChange} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

ArsipPage.propTypes = {
  notes: PropTypes.array.isRequired,
  defaultKeyword: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

function PageArchiveWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const changeSearchParams = (newKeyword) => {
    setSearchParams({ keyword: newKeyword });
  };

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <ArsipPage notes={notes} defaultKeyword={defaultKeyword} keyword={keyword} keywordChange={setKeyword} onKeywordChange={changeSearchParams} />;
}

export default PageArchiveWrapper;
