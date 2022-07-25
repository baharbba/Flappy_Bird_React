import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdleft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  const [obstaclesleft, setObstacLeft] = useState(ScreenWidth)
  const [obstaclesleftTwo, setObstacLeftTwo] = useState(ScreenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [score, setScore] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const gravity = 3 
  let gameTimerId
  let obstaclesleftTimerId
  let obstaclesleftTimerIdTwo
  let [isGameOver, setIsGameOver] = useState(false)

//start bird falling

  useEffect(() => {
    if (birdBottom > 0 ) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity )
    }, 30)

    return () => {
      clearInterval(gameTimerId)
    }
  }
}, [birdBottom])
console.log(birdBottom) 

const jump = () => {
  if (!isgameover && (birdBottom < screenHeight)) {
    setBirdBottom(birdBottom => birdBottom + 50)
    console.log('jumped')
  }
}

//start first obstacles
useEffect(() => {
  if(obstaclesleft > -obstacleWidth) {
    obstaclesleftTimerId = setInterval(() => {
      setObstacLeft(obstaclesleft => obstaclesleft - 5)
    }, 30)
    return () => {
      clearInterval(obstaclesleftTimerId)
    }
  } else {
    setObstaclesleft(screenWidth)
    setObstaclesNegHeight( - Math.random() * 100 )
  }

}, [obstaclesleft])


 //start second obstacles
  useEffect(() => {
    if(obstaclesleftTwo > -obstacleWidth) {
      obstaclesleftTimerIdTwo = setInterval(() => {
        setObstacLeft(obstaclesleftTwo => obstaclesleftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesleftTimerIdTwo)
      }
    } else {
      setObstaclesleftTwo(screenWidth)
      setObstaclesNegHeightTwo ( - Math.random() * 100 )
      setScore(score => score + 1)
    }
  }, [obstaclesleft])

//check for collisons
  useEffect(() => {
    if (
    ((birdBottom < (obstaclesNegHeight + obstaclesHeight + 30 ) ||
    birdBottom > (obstaclesNegHeight + obstaclesHeight + gap - 30)) && 
    (obstaclesleft > screenWidth/2 - 30 && obstaclesleft < screenWidth/2 + 30)
    )
    || 
    ((birdBottom < (obstaclesNegHeightTwo + obstaclesHeight + 30 ) ||
    birdBottom > (obstaclesNegHeightTwo + obstaclesHeight + gap - 30)) && 
    (obstaclesleftTwo > screenWidth/2 - 30 && obstaclesleftTwo < screenWidth/2 + 30)
    )
    )
    {
      console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesleftTimerId)
    clearInterval(obstaclesleftTimerIdTwo)
    setIsGameOver(true)


  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      {isGameOver && <Text>{score}</Text>}
      <Bird
      birdBottom={birdBottom}
      birdleft={birdleft}
      />
      <Obstacles
      color = {'green'}
      obstaclesWidth={obstacleWidth}
      obstacleHeight={obstacleHeight}
      randomBottom = {obstaclesNegHeight}
      gap={gap}
      obstaclesLeft={obstaclesleft}
      />
      <Obstacles
      color={'yellow'}
      obstaclesWidth={obstacleWidth}
      obstacleHeight={obstacleHeight}
      randomBottom = {obstaclesNegHeightTwo}
      gap={gap}
      obstaclesLeft={obstaclesleftTwo}
      />
    </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
})
