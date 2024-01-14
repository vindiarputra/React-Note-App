import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { showFormattedDate } from "./../utils/index";
import { Link } from "react-router-dom";
import ButtonAction from "./NoteActionButton";
import { deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import { FiTrash2 } from "react-icons/fi";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import LocaleContext from "../contexts/LocaleContext";

function NoteItem({ id, title, body, createdAt, archived, setNoteList }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const { selectLanguage } = useContext(LocaleContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  async function deleteNoteHandler() {
    const { error } = await deleteNote(id);
    if (!error) {
      setNoteList((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  }

  async function archiveNoteHandler() {
    setLoading(true);
    const { error } = await archiveNote(id);
    setLoading(false);
    if (!error) {
      setNoteList((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  }

  async function unarchiveNoteHandler() {
    setLoading(true);
    const { error } = await unarchiveNote(id);
    setLoading(false);
    if (!error) {
      setNoteList((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <article className="noteItem">
      <h3 className="noteItem-title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="noteItem-createdAt">{selectLanguage({ id: showFormattedDate(createdAt, "id-ID"), en: showFormattedDate(createdAt, "en-US") })}</p>
      <p className="noteItem-body">{parser(body)}</p>
      <div className="noteItem-action">
        {location.pathname === "/archives" ? <ButtonAction title="Unarchive" onClick={unarchiveNoteHandler} icon={<BiArchiveOut />} /> : <ButtonAction title="Archive" onClick={archiveNoteHandler} icon={<BiArchiveIn />} />}
        <ButtonAction title="Delete" onClick={deleteNoteHandler} icon={<FiTrash2 />} />
      </div>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  setNoteList: PropTypes.func.isRequired,
};

export default NoteItem;
