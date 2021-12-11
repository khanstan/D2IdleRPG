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

const saveStateToCloud = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  const payload = btoa(JSON.stringify(store.getState()));
  const raw = `{\"base64\":\"${payload}\"}`;

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  try {
    const data = JSON.stringify(store.getState());
    console.log('Saving to cloud...');

    fetch("https://d2idlerpg-default-rtdb.europe-west1.firebasedatabase.app/characters/sUfrTQhmbzdMqEDn08cFchoD6ql2/-MqVKvfWjUfIOaRO4-Sl.json", requestOptions)
    .then(response => response.text())
    .then(result => console.log('Saved to cloud'))
    .catch(error => console.log('Error while saving to cloud', error));
  } catch (err) {
    throw new Error('There was an error while trying to save the state to cloud')
  }
}

const saveStateToLocalStorage = () => {

  try {
    console.log('Saving to local storage...');
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  } catch (err) {
    throw new Error('There was an error while trying to save the state to localStorage')
  }
}

const throttledSaveStateToLocalStorage = throttle(() => saveStateToLocalStorage(), 1000);
const throttledSaveStateToCloud = throttle(() => saveStateToCloud(), 10000)
store.subscribe(() => {
  throttledSaveStateToLocalStorage();
  throttledSaveStateToCloud();
})

export default store;