import React, { useState, useEffect, useContext } from "react";
import NoteList from "../components/NoteList";
import SearchNote from "../components/SearchNote";
import ButtonAction from "../components/NoteActionButton";
import { getActiveNotes } from "../utils/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
import LocaleContext from "../contexts/LocaleContext";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const keyword = searchParams.get("keyword");

  const navigate = useNavigate();
  const addButtonHandler = () => {
    navigate("/notes/new");
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return <HomePage defaultKeyword={keyword} keywordChange={(newKeyword) => setSearchParams({ keyword: newKeyword })} onAddButtonHandler={addButtonHandler} notes={notes} loading={loading} />;
}

function HomePage({ defaultKeyword, keywordChange, onAddButtonHandler, notes, loading }) {
  const [keyword, setKeyword] = useState(defaultKeyword || "");
  const { selectLanguage } = useContext(LocaleContext);
  const onKeywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    keywordChange(newKeyword);
  };

  const filteredNotes = notes ? notes.filter(({ title }) => title.toLowerCase().includes(keyword.toLowerCase())) : [];

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="homepage">
      <h2>{selectLanguage({ id: "Catatan Aktif", en: "Active Notes" })}</h2>
      <SearchNote keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className="homepage-action">
        <ButtonAction title="Tambah" onClick={onAddButtonHandler} icon={<FiPlus />} />
      </div>
    </section>
  );
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  onAddButtonHandler: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default HomePageWrapper;
