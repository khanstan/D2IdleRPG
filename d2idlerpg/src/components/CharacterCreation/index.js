import React from 'react';
import amazon from '../../assets/characters/ama.gif'
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';
 
const CharacterCreation = () => (
  <div>
    <h1>create a character here</h1>
    <img className="heroPortrait" src={amazon}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.ASASSIN.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.NECROMANCER.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.BARBARIAN.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.PALADIN.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.SORCERESS.portrait}></img>
    <img className="heroPortrait" src={HERO_CLASSES_MAP.DRUID.portrait}></img>
  </div>
);
 
export default CharacterCreation;