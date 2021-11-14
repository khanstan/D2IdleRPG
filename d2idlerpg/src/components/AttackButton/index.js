import React from 'react';
import { Icon } from '@iconify/react';
import swordCross from '@iconify/icons-mdi/sword-cross';
import { useDispatch, useSelector } from 'react-redux';
import { receiveHit, selectEnemy } from '../Enemy/enemySlice';
import { selectCharacter, successfulKill } from '../CharacterPage/characterSlice';
import { playerHits, enemyDead } from '../BattleLog/battleLogSlice'
import { useEffect, useRef, useState, useLayoutEffect } from 'react';


const AttackButton = (props) => (
    <button onClick={props.attack} id="userInterface-attackButton"><Icon icon={swordCross} width="32" height="32" /> Attack!</button>
);

const IdleButton = (props) => (
    <button id="idleButton" className="idleButton" onClick={props.startLoop}>Idle!</button>
);



function randomDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Attack() {
    const characterDamage = useSelector(selectCharacter).attack;
    const enemy = useSelector(selectEnemy);
    let dmg = randomDamage(...characterDamage);
    const dispatch = useDispatch();
    const isInitialMount = useRef(true); // used as reference for initial render.

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // check if first render.
        }
        else {
            dispatch(enemyDead(enemy.name))
            dispatch(successfulKill(enemy.xp))
        }
    }, [enemy.killCheck]);

    const dispatchMulti = () => {
        dispatch(receiveHit(dmg))
        dispatch(playerHits([dmg, enemy.name]))
        dmg = randomDamage(...characterDamage)
    }

    //const idleButton = document.getElementById("idleButton");
    //idleButton.addEventListener('click', setInterval(dispatchMulti, 33))
    //gameLoop(dispatchMulti)
    const [isPaused, setIsPaused] = useState(true)


    useLayoutEffect(() => {
        if (!isPaused) {
            let timerId

            const f = () => {
                dispatchMulti();
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)

            return () => cancelAnimationFrame(timerId)
        }
    }, [isPaused])

    return (
        <><AttackButton attack={() => dispatchMulti()}></AttackButton><IdleButton startLoop={() => setIsPaused(!isPaused)}>
            {isPaused ? "Resume" : "Pause"}</IdleButton></>
    )
}


export default Attack;