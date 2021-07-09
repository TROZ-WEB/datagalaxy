import React from "react";
import styles from './Popup.css';

const Popup = () => {
  return <div className={styles.root}>{chrome.i18n.getMessage("welcomeMessage")}</div>;
}

export default Popup;