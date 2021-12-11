import { configureStore, combineReducers } from '@reduxjs/toolkit'
import enemyReducer from '../components/Enemy/enemySlice'
import characterReducer from '../components/CharacterPage/characterSlice'
import battleLogReducer from '../components/BattleLog/battleLogSlice'
import throttle from 'lodash.throttle'

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

const saveStateToLocalStorage = () => {
  try {
    console.log('Saving to local storage...');
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    console.log('Saved.');
  } catch (err) {
    throw new Error('There was an error while trying to save the state to localStorage')
  }
}

const throttledSaveToLocalStorage = throttle(() => saveStateToLocalStorage(), 1000);

store.subscribe(() => {
  throttledSaveToLocalStorage();
})

export default store;