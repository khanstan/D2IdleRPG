import { configureStore, combineReducers } from '@reduxjs/toolkit'
import enemyReducer from '../components/Enemy/enemySlice'
import characterReducer from '../components/CharacterPage/characterSlice'
import battleLogReducer from '../components/BattleLog/battleLogSlice'
import userReducer from '../components/Home/userSlice'
import throttle from 'lodash.throttle'


const preloadedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}

const combinedReducer = combineReducers({
  enemy: enemyReducer,
  character: characterReducer,
  battleLog: battleLogReducer,
  currentUser: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/reload') {
    let parsed = action.payload;
    state = parsed;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
})

const saveStateToCloud = () => {
  const uid = store.getState().currentUser.uid;
  const cid = store.getState().currentUser.cid;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  const payload = JSON.stringify({"reduxState": store.getState()});

  const requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: payload,
    redirect: 'follow'
  };

  try {
    console.log('Saving to cloud...');

    fetch(`https://d2idlerpg-default-rtdb.europe-west1.firebasedatabase.app/characters/${uid}/${cid}.json`, requestOptions)
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
const throttledSaveStateToCloud = throttle(() => saveStateToCloud(), 6000)
store.subscribe(() => {
  throttledSaveStateToLocalStorage();
  throttledSaveStateToCloud();
})

export default store;