import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



// Create a top level component called game to manage the board
export default function Game() {
  // add state variables to track whose turn is next
  const [xIsNext, setXIsNext] = useState(true);
  // array of history moves in state
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // to keep track of which step the user is viewing.
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // create a new array that contains all the items in history followed by nextSquares
    // this merges all the arrays into groups in only 1 array.
    // setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
    setXIsNext(!xIsNext);
  }
  // Transform history of moves into react elements representing buttons on the screen
  function jumpTo(nextMove) {
    // update currentMove
    setCurrenteMove(nextMove);
    setXIsNext(nextMove % 2 === 0); // if "nextMove" is even, setXIsNext to nextMove
  }
  // squares arg goes through each element in the array "history" , while "move" goes through each index of the array "history"
  const moves = history.map((squares, move) => { // map over the history array to tranform it into another array of React elements representing buttons
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol> {moves} </ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // global state variable
  //const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  // define the onSquare function before using import
  // this create a copy of the squares array
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      // if the square is set to true, return
      return;
    }
    // copy the squares array
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
  }
  return (
    <>
      <div className="status"> {status} </div>
      <div className="board-row">
        <SquareFunction value={squares[0]} onSquareClick={() => handleClick(0)} />
        <SquareFunction value={squares[1]} onSquareClick={() => handleClick(1)} />
        <SquareFunction value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <SquareFunction value={squares[3]} onSquareClick={() => handleClick(3)} />
        <SquareFunction value={squares[4]} onSquareClick={() => handleClick(4)} />
        <SquareFunction value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <SquareFunction value={squares[6]} onSquareClick={() => handleClick(6)} />
        <SquareFunction value={squares[7]} onSquareClick={() => handleClick(7)} />
        <SquareFunction value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function SquareFunction({ value, onSquareClick }) {
  // set state of each click
  //const [value, setValue] = useState(null)
  // function handleClick(){
  //   //console.log('clicked!');
  //   setValue(value);
  // }
  return (
    <button className="Square" onClick={onSquareClick}>
      {value}
    </button>
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