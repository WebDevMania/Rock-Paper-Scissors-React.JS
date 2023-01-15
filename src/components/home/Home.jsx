import React from 'react'
import { useState } from 'react'
import classes from './home.module.css'

const Home = () => {
   const [selectedIdx, setSelectedIdx] = useState(0)

   const [yourScore, setYourScore] = useState(0)
   const [compScore, setCompScore] = useState(0)

   const [playing, setPlaying] = useState(false)
   const [isDraw, setIsDraw] = useState(false)
   const [computerWon, setComputerWon] = useState(false)
   const [youWon, setYouWon] = useState(false)

   const [youLastlyPlayed, setYouLastlyPlayed] = useState(null)
   const [computerLastlyPlayed, setComputerLastlyPlayed] = useState(null)

    const scenarios = [
        {
          type: 'rock',
          emoji: '✊',
          winsAgainst: 'scissors'
        },
        {
          type: 'paper',
          emoji: '✋',
          winsAgainst: 'rock'
        },
        {
          type: 'scissors',
          emoji: '✌',
          winsAgainst: 'paper'
        }
      ]

    
    const generateRandomIndex = () => {
        return Math.floor(Math.random() * 3) // gives us a result between 0 and 2
    }

    const playGame = () => {
        setPlaying(prev => true)
        const compSelection = scenarios[generateRandomIndex()]
        const playerSelection = scenarios[selectedIdx]
        setComputerLastlyPlayed(prev => playerSelection.emoji)
        setYouLastlyPlayed(prev => compSelection.emoji)

        if(compSelection.winsAgainst === playerSelection.type){
            setCompScore(prev=> prev + 1)

            setComputerWon(prev => true)
            setTimeout(() => {
                setComputerWon(prev => false)
               }, 1000)
        } else if(playerSelection.winsAgainst === compSelection.type){
            setYourScore(prev => prev + 1)

            setYouWon(prev => true)
            setTimeout(() => {
                setYouWon(prev => false)
               }, 1000)
        } else {
            setIsDraw(prev => true)
            setTimeout(() => {
              setIsDraw(prev => false)
            }, 1000)
        }

        setTimeout(() => {
          setPlaying(prev => false)
        }, 1000)
    }

  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2>Let's play Rock, Paper, Scissors!</h2>
            <div className={classes.lastlyPlayed}>
                {computerLastlyPlayed && <div className={classes.col}>Computer lastly played: {computerLastlyPlayed}</div>}
                {youLastlyPlayed && <div className={classes.col}>You lastly played: {youLastlyPlayed}</div>}
            </div>
            <div className={classes.row}>
                <div className={classes.col}>You {yourScore}</div>
                <div className={classes.col}>Computer {compScore}</div>
            </div>
            <div className={classes.types}>
                <div className={`${classes.type} ${selectedIdx === 0 && classes.active}`} onClick={() => setSelectedIdx(prev=> 0)}>✊</div>
                <div className={`${classes.type} ${selectedIdx === 1 && classes.active}`} onClick={() => setSelectedIdx(prev=> 1)}>✋</div>
                <div className={`${classes.type} ${selectedIdx === 2 && classes.active}`} onClick={() => setSelectedIdx(prev=> 2)}>✌</div>
            </div>
            <button disabled={playing} onClick={playGame} className={classes.playBtn}>Play!</button>
            {isDraw && <span className={classes.drawMsg}>Draw! <br /> You both played the same type.</span>}
            {computerWon && <span className={classes.drawMsg}>Computer Won!</span>}
            {youWon && <span className={classes.drawMsg}>You Won!</span>}
        </div>
    </div>
  )
}

export default Home