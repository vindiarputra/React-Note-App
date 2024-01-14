// DetailPageWrapper.jsx
import React, { useState, useEffect } from "react";
import NoteDetail from "../components/NoteDetail";
import { useNavigate, useParams } from "react-router-dom";
import { getNote } from "../utils/api";
import PageNotFound from "./PageNotFound";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }

        const { data } = await getNote(id);
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
        setNote(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <section>
      {loading && <p>Loading...</p>}
      {id === undefined && <PageNotFound />}
      {note !== null && !loading && (
        <>
          <NoteDetail {...note} />
        </>
      )}
    </section>
  );
}

export default DetailPageWrapper;
