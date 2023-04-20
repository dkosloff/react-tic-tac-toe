import React, { useState } from 'react';
import Cell from './../components/Cell';
import styles from './styles/GameBoard.module.css'

const EMPTY_BOARD = [['', '', ''], ['', '', ''], ['', '', '']];

function GameBoard() {
    const [board, setBoard] = useState(EMPTY_BOARD);

    function handleCellClick(cellLocation) {
        const [r, c] = cellLocation.split('-');

        // Skip if a value already exists
        if (board[r][c]) return;

        setBoard( (prev) => {
            prev[r][c] = 'X';
            return prev;
        });

        alert(`new board: ${board}`);
    }

    function resetGame() {
        setBoard(EMPTY_BOARD);
    }

    return (
        <div className={styles.gameBoard}>
            <table>
                <tbody>
                    {
                        board.map((row, idx) =>
                            <tr>
                                <td className={styles.td}><Cell id={idx + '-0'} onClick={handleCellClick} value={row[0]} /></td>
                                <td className={styles.td}><Cell id={idx + '-1'} onClick={handleCellClick} value={row[1]} /></td>
                                <td className={styles.td}><Cell id={idx + '-2'} onClick={handleCellClick} value={row[2]} /></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default GameBoard;
