import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BiArchiveIn } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import LocaleContext from "../contexts/LocaleContext";

const NoteHeader = ({ logout, name }) => {
  const { selectLanguage } = useContext(LocaleContext); 

  return (
    <header className="note-header">
      <h1>
        <Link to="/">{selectLanguage({ id: "Catatan", en: "Notes" })}</Link>
      </h1>
      {logout && (
        <>
          <nav className="navBar">
            <ul>
              <li>
                <Link to="/archives">
                  <BiArchiveIn />
                </Link>
              </li>
            </ul>
          </nav>
          <button className="button-logout" onClick={logout} title="Logout">
            <FiLogOut /> {name}
          </button>
        </>
      )}
    </header>
  );
};

NoteHeader.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default NoteHeader;
