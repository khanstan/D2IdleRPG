import { createSlice } from '@reduxjs/toolkit'


export const characterSlice = createSlice({
    name: 'character',
    initialState: {
        name: "Necromancer",
        level: 1,
        xpToLevelUp: 100,
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
            if (state.xp >= state.xpToLevelUp) {
                state.level += 1;
                state.xp = 0;
                state.xpToLevelUp = state.level * 100 * 1.15;
                state.hp = state.hp + state.hp/10;
                state.attack = [state.attack[0] + 1*state.level, state.attack[1] + 1*state.level];
                state.defence = state.defence + 5;
                state.speed = state.speed + 1;

            }
        },
        levelUp: (state, action) => {
            state.xp = state.level * 100 * 1.25;
        }

    },

}
)

export const { receiveHit, successfulKill } = characterSlice.actions
export const selectCharacter = state => state.character

export default characterSlice.reducer