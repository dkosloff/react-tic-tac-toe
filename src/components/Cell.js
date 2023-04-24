import React from 'react';
import styles from './styles/Cell.module.css';

function Cell({ cellLocation, onClick, value }) {
  function handleCellClick(e) {
    e.preventDefault();
    onClick(cellLocation);
  }

  return (
    <button
      className={`${styles.button} ${value === 'O' ? styles.oButton : ''}  
        ${value === 'X' ? styles.xButton : ''}`}
      onClick={handleCellClick}
    />
  );
}

export default Cell;
