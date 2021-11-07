import { createSlice } from '@reduxjs/toolkit'


export const characterSlice = createSlice({
    name: 'character',
    initialState: {
        name: "Necromancer",
        level: 1,
        xp: 0,
        hp: 100,
        attack: [1, 5],
        defence: 5,
        speed: 1
    },
    reducers: {
        receiveHit: (state, action) => {
            state.hp -= action.payload;
        },    
        successfulKill: (state, action) => {
            state.xp += action.payload;
            if (state.xp >= 100) {
                state.level += 1;
                state.xp = state.xp - 100;
            }
        }
    },

}
)

export const { receiveHit, successfulKill } = characterSlice.actions
export const selectCharacter = state => state.character

export default characterSlice.reducer