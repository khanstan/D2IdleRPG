import { createSlice } from '@reduxjs/toolkit';
import { WEAPONS } from '../constants/items/weapons';

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        weapon: WEAPONS[0].srcIcon,
        shield: null,
        helmet: null,
        armor: null,
        gloves: null,
        boots: null,
        belt: null,
        ring1: null,
        ring2: null,
        amulet: null,
    },
    reducers: {
        drop(state, action) {
            state[action.payload] = null;
        },
        pickUp(state, action) {
            state[action.payload] = action.payload.id;
        }
    }
});

export const { drop, pickUp } = inventorySlice.actions;

export default inventorySlice.reducer;