import React, { useContext, useState } from "react";
import NoteInput from "../components/NoteInput";
import ButtonAction from "../components/NoteActionButton";
import { addNote } from "../utils/api"; 
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import LocaleContext from "../contexts/LocaleContext";


function NewPageWrapper() {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", body: "" });
  const {selectLanguage} = useContext(LocaleContext)

  async function saveNoteHandler() {
    const result = await addNote(note); 
    if (!result.error) {
      navigate("/");
    }
  }

  return (
    <section className="add-new-note">
      <h2>{selectLanguage({ id: "Catatan Baru", en: "New Note" })}</h2>
      <NoteInput state={note} onTitleChange={(e) => setNote({ ...note, title: e.target.value })} onBodyInput={(e) => setNote({ ...note, body: e.target.innerHTML })} />
      <div className="add-new-note-action">
        <ButtonAction title="Simpan" onClick={saveNoteHandler} icon={<FiCheck />} />
      </div>
    </section>
  );
}

export default NewPageWrapper;
