/**App.jsx
 * @uthor Kaisel Alcantara  
 * From: https://react.dev/learn/tutorial-tic-tac-toe
 *
 */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function Square({ value, onSquareClick }) {
  // set state of each click
  //const [value, setValue] = useState(null)
  // function handleClick(){
  //   //console.log('clicked!');
  //   setValue(value);
  // }
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, SquareArray, onPlay }) {
  // define the onSquare function before using import
  // this create a copy of the SquareArray array
  function handleClick(i) {
    if (SquareArray[i] || calculateWinner(SquareArray)) {
      // if the square is set to true, return
      return;
    }
    // copy the SquareArray array
    const nextSquareArray = SquareArray.slice();
    if (xIsNext) {
      nextSquareArray[i] = "X";
    } else {
      nextSquareArray[i] = "O";
    }
    onPlay(nextSquareArray);
    // setSquareArray(nextSquareArray);
    // setXIsNext(!xIsNext);
  }
 
  // const [xIsNext, setXIsNext] = useState(true);
  // global state variable
  //const [SquareArray, setSquareArray] = useState(Array(9).fill(null));
  const winner = calculateWinner(SquareArray);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
 
  return (
    <>
      <div className="status"> {status} </div>
      <div className="board-row">
        <Square value={SquareArray[0]} onSquareClick={() => handleClick(0)} />
        <Square value={SquareArray[1]} onSquareClick={() => handleClick(1)} />
        <Square value={SquareArray[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={SquareArray[3]} onSquareClick={() => handleClick(3)} />
        <Square value={SquareArray[4]} onSquareClick={() => handleClick(4)} />
        <Square value={SquareArray[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={SquareArray[6]} onSquareClick={() => handleClick(6)} />
        <Square value={SquareArray[7]} onSquareClick={() => handleClick(7)} />
        <Square value={SquareArray[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Create a top level component called game to manage the board
export default function Game() {
  // array of history moves in state
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // to keep track of which step the user is viewing.
  // instead of rendering the final move, "const currentSquares = history[history.length - 1];"
  const currentSquares = history[currentMove]; // render the currently selected move
  // add state variables to track whose turn is next
  const [xIsNext, setxIsNext] = useState(true);
  //const xIsNext = currentMove % 2 ===0;
  
  function handlePlay(nextSquareArray) {
    // create a new array that contains all the items in history followed by nextSquareArray
    // this merges all the arrays into groups in only 1 array.
    // setHistory([...history, nextSquareArray]);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquareArray];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
    setxIsNext(!xIsNext);
  }

  // Transform history of moves into react elements representing buttons on the screen
  function jumpTo(nextMove) {
    // update currentMove
    setCurrentMove(nextMove);
    setxIsNext(nextMove % 2 === 0);
  }

  // SquareArray arg goes through each element in the array "history" , while "move" goes through each index of the array "history"
  const moves = history.map((SquareArray, move) => { // map over the history array to tranform it into another array of React elements representing buttons
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      // list of items tha contains buttons for the user to jump to previous moves
      // For each move, a list is created. 
      <li key={move}> {/**using the  the array index as key so each move will sequentially be assigned a number.  It's strongly recommended
       * to assign propoer keys when dealing with dynamic lists. */}
        {/*onClick call the function jumpTo */}
        <button onClick={() => jumpTo(move)}> {description} </button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} SquareArray={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol> {moves} </ol>
      </div>
    </div>
  );
}


// check for a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}