import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

function NoteList({ notes }) {
  const [noteList, setNoteList] = useState(notes);
  const { selectLanguage } = useContext(LocaleContext);

  useEffect(() => {
    setNoteList(notes);
  }, [notes]);

  const renderNotes = () => {
    return noteList.map(({ id, title, body, createdAt, archived }) => <NoteItem key={id} id={id} title={title} body={body} createdAt={createdAt} archived={archived} setNoteList={setNoteList} />);
  };

  return (
    <div className="noteContainer">
      {noteList.length > 0 ? (
        <ul className="noteList">{renderNotes()}</ul>
      ) : (
        <div className="noteList-empty">
          <p className="noteList-emptyMessage">{selectLanguage({ id: "Tidak ada Catatan", en: "No notes" })}</p>
        </div>
      )}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default NoteList;
