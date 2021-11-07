import React from 'react';
import { useSelector } from 'react-redux';
import { selectEnemy } from './enemySlice';
import HealthBar from '../HealthBar';

const styleYellow = { color: 'yellow' };


const EnemyDiv = (props) => (
    <div id="userInterface-enemy-stats">
        <span style={styleYellow}>Enemy</span>
        <p>Name: {props.name}</p>
        <p>HP: {props.hp}</p>
        <p>Attack: {props.attack}</p>
        <p>Defence: {props.defence}</p>
    </div>
);

export function Enemy(props) {
    const enemy = useSelector(selectEnemy);

    return (
        <div id="userInterface-enemy-div">
            <EnemyDiv name={enemy.name} maxHp={enemy.maxHp} hp={enemy.hp} attack={enemy.attack} defence={enemy.defence}></EnemyDiv>
            <HealthBar percentage={enemy.hp/enemy.maxHp * 100} width={230} height={24}></HealthBar>
        </div>
    )
}

export default Enemy;