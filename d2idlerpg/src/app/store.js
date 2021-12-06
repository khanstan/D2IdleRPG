import { configureStore, combineReducers } from '@reduxjs/toolkit'
import enemyReducer from '../components/Enemy/enemySlice'
import characterReducer from '../components/CharacterPage/characterSlice'
import battleLogReducer from '../components/BattleLog/battleLogSlice'

const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}

const combinedReducer = combineReducers({
  enemy: enemyReducer,
  character: characterReducer,
  battleLog: battleLogReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'counter/logout') { // check for action type 
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})

const saveToCloud = () => {
  
}

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store;