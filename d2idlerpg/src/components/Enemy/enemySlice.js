import { createSlice } from '@reduxjs/toolkit'
import { MONSTERS } from '../../constants/monsters/index'
import { battleLogSlice } from '../BattleLog/battleLogSlice';

const allMonstersCount = MONSTERS.length;

const getRandomMonster = () => {
  return Math.floor(Math.random() * MONSTERS.length);
}

export const enemySlice = createSlice({
  name: 'enemy',
  initialState: {
    currentMonsterId: 0,
    nextMonsterId: 0,
    name: "Fallen",
    maxHp: 20,
    hp: 20,
    attack: 1,
    defence: 10,
    xp: 1,
    killCheck: 0
  },
  reducers: {
    receiveHit: (state, action) => {
      state.hp -= action.payload;
      if (state.hp <= 0) {
        state.nextMonsterId = getRandomMonster()
        state.name = MONSTERS[state.nextMonsterId].name
        state.maxHp = MONSTERS[state.nextMonsterId].maxHp
        state.hp = MONSTERS[state.nextMonsterId].hp
        state.attack = MONSTERS[state.nextMonsterId].attack
        state.defence = MONSTERS[state.nextMonsterId].defence
        state.xp = MONSTERS[state.nextMonsterId].xp
        state.killCheck ^=1 //by flipping the bit 
      }
    },
  }
})

export const { receiveHit } = enemySlice.actions
export const selectEnemy = state => state.enemy

export default enemySlice.reducer