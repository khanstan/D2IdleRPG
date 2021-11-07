import {combineReducers} from 'redux';
import inventoryReducer from '../redux/inventorySlice';

export default combineReducers({
    inventory: inventoryReducer,
});