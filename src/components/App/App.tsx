import { useEffect } from 'react'
import { useTictactoeRules } from '../../hooks/useTictactoeRules'
import useChrono from '../../hooks/useChrono'
import { Cell, PLAYER1, PLAYER2 } from '../../types'
import Board from '../Board/Board'
import HonorP1 from '../Honor/HonorP1'
import HonorP2 from '../Honor/HonorP2'
import NoHonor from '../Honor/NoHonor'
import Info from '../Info/Info'
import './App.css'

function App() {

  const [
    board,
    nextPlayer,
    winner,
    onPlay,
    onReset
  ] = useTictactoeRules()
  const [chrono, start, , stop] = useChrono()

  const handlePlay = (cell: Cell) => onPlay(nextPlayer, cell)

  const handleReset = () => {
    (async () => {
      stop()
    })().then(async () => {
      onReset()
      start()
    })
  }

  useEffect(
    () => {
      if (winner !== null) {
        stop()
      }
    }, [winner]
  )

  if (winner === 'FULL') {
    return <div className="App">
      <NoHonor time={chrono} onRestart={handleReset} />
    </div>
  } else if (winner === PLAYER1) {
    return <div className="App">
      <HonorP1 time={chrono} onRestart={handleReset} />
    </div>
  } else if (winner === PLAYER2) {
    return <div className="App">
      <HonorP2 time={chrono} onRestart={handleReset} />
    </div>
  } else {
    return (
      <div className="App">
        <Board
          board={board}
          onPlay={handlePlay}
        />
        <Info
          time={chrono}
          currentPlayer={nextPlayer}
          onReset={handleReset}
        />
      </div>
    )
  }
}

export default App
