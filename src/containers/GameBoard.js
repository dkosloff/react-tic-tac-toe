import React, { useState } from 'react';
import Cell from './../components/Cell';
import styles from './styles/GameBoard.module.css';

const EMPTY_BOARD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function GameBoard() {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentTurn, setCurrentTurn] = useState('X');
  const [gameActive, setGameActive] = useState(false);
  const [turn, setTurn] = useState(1);
  const [playGameMessage, setPlayGameMessage] = useState(
    'Would you like to play Tic Tac Toe?'
  );

  function handleCellClick(cellLocation) {
    const [r, c] = cellLocation.split('-');

    // Ignore click if a value already exists in that cell
    if (!gameActive || board[r][c]) return;

    const newBoard = [...board];
    newBoard[r][c] = currentTurn;
    setBoard(newBoard);

    checkForEndOfGame(r, c);
  }

  function checkForEndOfGame(r, c) {
    checkForWinner(r, c);

    if (gameActive) {
      if (turn > 9) {
        setPlayGameMessage(
          'That game was a tie. Would you like to play again?'
        );
        setGameActive(false);
        return;
      } else {
        setTurn((p) => ++p);
      }

      toggleTurn();
    }
  }

  function toggleTurn() {
    setCurrentTurn((prev) => (prev === 'X' ? 'O' : 'X'));
  }

  function checkForWinner(r, c) {
    if (isVerticalWin(c) || isHorizontalWin(r) || isDiagonalWin()) {
      setPlayGameMessage(`${currentTurn} Wins! Would you like to play again?`);
      setGameActive(false);
    }
  }

  function isVerticalWin(c) {
    for (const row of board) {
      if (row[c] !== currentTurn) return false;
    }
    return true;
  }

  function isHorizontalWin(r) {
    for (const value of board[r]) {
      if (value !== currentTurn) return false;
    }
    return true;
  }

  function isDiagonalWin() {
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[2][2] === currentTurn
    ) {
      return true;
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[2][0] === currentTurn
    ) {
      return true;
    }

    return false;
  }

  function resetGame() {
    const empty = board.map((row) => row.map(() => ''));
    setBoard(empty);
    setCurrentTurn('X');
    setTurn(1);
    setGameActive(true);
  }

  function resetGameHandler(e) {
    e.preventDefault();
    resetGame();
  }

  //if(!gameActive) render an overlay with a button that resets the game

  const renderedGame = (
    <>
      <div className={styles.gameBoard}>
        <h2>{currentTurn} goes next!</h2>
        <table>
          <tbody>
            {board.map((row, idx) => (
              <tr key={idx}>
                <td className={styles.td}>
                  <Cell
                    cellLocation={idx + '-0'}
                    onClick={handleCellClick}
                    value={row[0]}
                  />
                </td>
                <td className={styles.td}>
                  <Cell
                    cellLocation={idx + '-1'}
                    onClick={handleCellClick}
                    value={row[1]}
                  />
                </td>
                <td className={styles.td}>
                  <Cell
                    cellLocation={idx + '-2'}
                    onClick={handleCellClick}
                    value={row[2]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  if (!gameActive) {
    return (
      <>
        <div className={styles.overlay}>
          <h1 className={styles.overlayText}>{playGameMessage}</h1>
          <button className={styles.btn} onClick={resetGameHandler}>
            Yes
          </button>
        </div>
        {renderedGame}
      </>
    );
  } else {
    return renderedGame;
  }
}

export default GameBoard;
