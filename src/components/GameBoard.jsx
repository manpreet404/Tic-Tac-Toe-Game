
 export default function Gameboard( {onSelectPlayer,board}) {


//     const[gameBoard,setGameBoard]=useState(initialGameboard);
//     function handleSelectSquare(rowIndex,colIndex){
//         setGameBoard((prevGameboard)=>{
//            const updatedGameBoard=[...prevGameboard.map(innerarray=>[...innerarray])];
//             updatedGameBoard[rowIndex][colIndex]=activePlayerSymbol
//           return updatedGameBoard;
//         });
       
//      onSelectPlayer();
//     }


  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
           <ol>
            {row.map((PlayerSymbol,colIndex)=><li key={colIndex}>
            <button onClick={()=>onSelectPlayer(rowIndex,colIndex)} disabled={PlayerSymbol!== null}>{PlayerSymbol}</button>
           </li>)}
         </ol>      
        </li>
      ))}
    </ol>
  );
}
