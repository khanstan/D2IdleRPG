import React from 'react';
<<<<<<< HEAD
=======
import amazon from '../../assets/characters/ama.gif'
>>>>>>> 38922015195cfc06902b2eb101f410109802e784
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';
 
const CharacterCreation = () => (
  <div>
    <h1>create a character here</h1>
<<<<<<< HEAD
    <img className="heroPortrait" src={HERO_CLASSES_MAP.AMAZON.portrait}></img>
=======
    <img className="heroPortrait" src={amazon}></img>
>>>>>>> 38922015195cfc06902b2eb101f410109802e784
    <img className="heroPortrait" src={HERO_CLASSES_MAP.ASASSIN.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.NECROMANCER.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.BARBARIAN.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.PALADIN.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.SORCERESS.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.DRUID.portrait}></img>
  </div>
);
 
export default CharacterCreation;