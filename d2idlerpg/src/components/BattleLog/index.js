import React, { Fragment } from 'react';
import { selectBattleLog } from './battleLogSlice';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const styleYellow = { color: 'yellow' };

function mapStateToProps(state) {
    const enemyState = state.enemy;

    return { enemyHp: enemyState.hp }
}


const BattleLogRow = (props) => {

};

const BattleLogDiv = (props) => (
    <div id="userInterface-battlelog-div">
        <p>
            <span style={styleYellow}>Battle log</span>
        </p>
        <div id="userInterface-battlelog-div-paragraphs">
            {props.text.map((row, key) => {
                if (row.type === 0) {
                    return <Fragment key={key}><p>Welcome to D2 Idle RPG (v. 0.0.1).</p><p>Click ATTACK! to start playing!</p></Fragment>
                } if (row.type === 3) {
                    return <p key={key}><span style={styleYellow}>{row.enemy}</span> is dead!</p>;
                    
                } else {
                    return <p key={key}>You hit <span style={styleYellow}>{row.enemy}</span> for <span className="normalDamage">{row.damage}</span></p>;
                }

            })
            }
        </div>
    </div>
);

export function BattleLog(props) {
    const battleLog = useSelector(selectBattleLog);
    return (
        <BattleLogDiv text={battleLog} enemyHp={props.enemyHp}></BattleLogDiv>
    )
}

export default connect(mapStateToProps)(BattleLog);