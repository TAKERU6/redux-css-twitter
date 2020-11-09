import React from "react";
import "../styles.css";
import Form from "./Form";
import Posts from "./Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function App() {
  const iconStyle = { padding: 5, fontSize: 44 };
  return (
    <div className="App">
      <h1 className="main_tittel">
        Twitter
        <FontAwesomeIcon style={iconStyle} icon={faTwitter} />
      </h1>
      <Form />
      <Posts />
    </div>
  );
}
