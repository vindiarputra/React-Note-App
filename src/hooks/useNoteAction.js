// useNoteAction.js
import { useNavigate, useLocation } from "react-router-dom";

export default function useNoteAction(action, id, redirectPath) {
  const navigate = useNavigate();
  return async function () {
    try {
      await action(id);
      navigate(redirectPath);
    } catch (error) {
      console.error(error);
    }
  };
}
