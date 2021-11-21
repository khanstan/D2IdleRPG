import React from 'react';
import { withAuthorization } from '../Session';
import { useSelector } from 'react-redux';
import { selectCharacter } from './characterSlice';


const Character = (props) => (
  <div id="userInterface-character-stats">
    <p>Name: {props.name}</p>
    <p>Level: {props.level} ({props.xp} XP)</p>
    <p>Attack: {props.attack[0]}-{props.attack[1]}</p>
    <p>Defence: {props.defence}</p>
    <p>Life: {props.hp}</p>
    <p>AS/FCR: {props.speed}</p>
  </div>
);

export function CharacterPage() {
  const character = useSelector(selectCharacter);

  return (
    <Character name={character.name} level={character.level} xp={character.xp} attack={character.attack} defence={character.defence} hp={character.hp} speed={character.speed}></Character>
  )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CharacterPage);