import React from 'react';
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';
import Attack from '../AttackButton';
import BattleLog from '../BattleLog';
import Enemy from '../Enemy';
import CharacterPage from '../CharacterPage'
import { withAuthorization } from '../Session';
import { selectCharacter } from '../CharacterPage/characterSlice';
import { useSelector } from 'react-redux';

const charType = {
  "AMA": HERO_CLASSES_MAP.AMAZON.portrait,
  "ASA": HERO_CLASSES_MAP.ASASSIN.portrait,
  "NEC": HERO_CLASSES_MAP.NECROMANCER.portrait,
  "BAR": HERO_CLASSES_MAP.BARBARIAN.portrait,
  "PAL": HERO_CLASSES_MAP.PALADIN.portrait,
  "SOR": HERO_CLASSES_MAP.SORCERESS.portrait,
  "DRU": HERO_CLASSES_MAP.DRUID.portrait,
}

const Home = (props) => (
  <div id="mainScreen">
    <img id="heroPortrait" src={charType[props.type]}></img>
    <div><CharacterPage></CharacterPage></div>
    <div>
      <Attack></Attack>
      {/* <button id="idleButton" className="idleButton" type="button">Idle!</button> */}
    </div>
    <div><BattleLog></BattleLog></div>
    <div><Enemy></Enemy></div>
  </div>
);

export function HomePage() {
  const character = useSelector(selectCharacter);

  return(
    <Home type={character.type}></Home>
  )

}

export 

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);