import Player from "./components/Player.jsx";
import Gameboard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./gameOver.jsx";




const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function helper(playerTurn) {
  let currPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function App() {
  let gameBoard = initialGameboard.map((row) => [...row]);

  //const [activePlayer, setActivePlayer] = useState("X"); i can derived this state from player turn state

  const [playerTurn, setPlayerTurn] = useState([]);
  const [name,setInName]=useState({
    X:'player 1',
    O:'player 2',
  })


  const activePlayer = helper(playerTurn);

  for (const turn of playerTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = name[firstSquare];
      

      break;
    }
  }

  function restart(){
    setPlayerTurn([]);
  }
  function setName(symbol,newName){
    setInName(prevName=>{
      return{
        ...prevName,
        [symbol]:newName
      }
    })
  }

  const hasDraw = playerTurn.length===9 && !winner;

  function handleSelectPlayer(rowIndex, colIndex) {
    // setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

    if (winner || gameBoard[rowIndex][colIndex]) {
      return;
    }

    setPlayerTurn((prevTurn) => {
      const currPlayer = helper(prevTurn);

      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurn,
      ];
      return updateTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={setName}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={setName}
          />
        </ol>
        {(winner || hasDraw )&& (<GameOver winner={winner}  onRestart={restart}/>)}
        <Gameboard onSelectPlayer={handleSelectPlayer} board={gameBoard}  />
      </div>
      <Log turns={playerTurn} />
    </main>
  );
}

export default App;
