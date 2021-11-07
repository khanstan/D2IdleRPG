import { configureStore } from '@reduxjs/toolkit'
import enemyReducer from '../components/Enemy/enemySlice'
import characterReducer from '../components/CharacterPage/characterSlice'
import battleLogReducer from '../components/BattleLog/battleLogSlice'

const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}

const store = configureStore({
  reducer: {
    enemy: enemyReducer,
    character: characterReducer,
    battleLog: battleLogReducer,
  },
  preloadedState,
})

const saveToCloud = () => {

}


store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;