import React from 'react';
import styles from './styles/Cell.module.css';

function Cell({ id, onClick, value }) {

    function handleCellClick(e) {
        e.preventDefault();
        onClick(id);
    }

    return <button 
        location={id}
        className={`${styles.button} ${value === 'O' && styles.oButton}  ${value === 'X' && styles.xButton}`} onClick={handleCellClick} />
}

export default Cell;