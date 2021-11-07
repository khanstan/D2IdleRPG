import { createSlice } from '@reduxjs/toolkit'

//types explanation
//0 - regular text,
//1 - player deals damage
//2 - enemy deals damage
//3 - enemy dies
//4 - player dies?
//5 - enemy drops equipment?
//6 - level up?


export const battleLogSlice = createSlice({
    name: 'battleLog',
    initialState: {
        actions: [
            {
                type: 0
            },
        ],
    },
    reducers: {
        playerHits: (state, action) => {
            // state.text.unshift(<small>You hit {action.payload[1]} for: <span className="normalDamage">{action.payload[0]}</span></small>);
            state.actions.unshift({
                type: 1,
                enemy: action.payload[1],
                damage: action.payload[0]
            })
            if (state.actions.length > 5) {
                state.actions.pop()
            }
        },
        enemyDead: (state, action) => {
            state.actions.unshift({
                type: 3,
                enemy: action.payload
            })
            if (state.actions.length > 5) {
                state.actions.pop()
            }
        }
    },
}
)

export const { playerHits, enemyDead } = battleLogSlice.actions


export const selectBattleLog = state => state.battleLog["actions"]

export default battleLogSlice.reducer