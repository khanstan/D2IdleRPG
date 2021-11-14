import React from 'react';
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';
import Attack from '../AttackButton';
import BattleLog from '../BattleLog';
import Enemy from '../Enemy';
import CharacterPage from '../CharacterPage'
import { withAuthorization } from '../Session';


const HomePage = () => (
  <div id="mainScreen">
    <img id="heroPortrait" src={HERO_CLASSES_MAP.DRUID.portrait}></img>
    <div><CharacterPage></CharacterPage></div>
    <div>
      <Attack></Attack>
      {/* <button id="idleButton" className="idleButton" type="button">Idle!</button> */}
    </div>
    <div><BattleLog></BattleLog></div>
    <div><Enemy></Enemy></div>
  </div>

);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);