import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { off, onValue } from "firebase/database";

let characterSelected = null;

const INITIAL_STATE = {
    name: '',
    character: '',
    characters: [],
    loading: true,
};

function selectCharacter(e, char) {
    let characters = document.querySelectorAll('img.heroPortrait');
    characters.forEach(element => {
        element.style.borderBottom = 'none'
    });
    characterSelected = e.target.dataset.class;
    e.target.style.borderBottom = "2px solid white";
    //return e.target.dataset.class;
}

const CharacterCreation = (props) => (
    <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
    <div>
        <h1>create a character here</h1>
        <img data-class="AMA" onClick={selectCharacter} className="heroPortrait" src={HERO_CLASSES_MAP.AMAZON.portrait}></img>
        <img data-class="ASA" onClick={selectCharacter} className="heroPortrait" src={HERO_CLASSES_MAP.ASASSIN.portrait}></img>
        <img data-class="NEC" onClick={selectCharacter} className="heroPortrait" src={HERO_CLASSES_MAP.NECROMANCER.portrait}></img>
        <img data-class="BAR" onClick={selectCharacter} className="heroPortrait" src={HERO_CLASSES_MAP.BARBARIAN.portrait}></img>
        <img data-class="PAL" onClick={selectCharacter} className="heroPortrait" src={HERO_CLASSES_MAP.PALADIN.portrait}></img>
        <img data-class="SOR" onClick={selectCharacter} className="heroPortrait" src={HERO_CLASSES_MAP.SORCERESS.portrait}></img>
        <img data-class="DRU" onClick={selectCharacter} className="heroPortrait" src={HERO_CLASSES_MAP.DRUID.portrait}></img>
        <CharacterCreationForm />
    </div>
    </Grid>
);



class CharacterCreationFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        if (!characterSelected) {
            alert('Please select a character first.')
        } else {

        const { name } = this.state;

        this.props.firebase
            .createCharacter(name, characterSelected)
            .then(() => {
                //this.setState({ ...INITIAL_STATE });
                //this.props.history.push(ROUTES.CHARACTER_CREATION);
            })
            .catch(error => {
                this.setState({ error });
            });
        }


        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    playCharacter(e) {
        this.props.history.push(ROUTES.HOME);
    };

    renderCharacters() {
        const characters = this.state.characters;
        return characters.map((character, index) => {
            const { characterName, characterType } = character;
            return (
                <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{characterName}</td>
                    <td>{characterType}</td>
                    <td><button onClick={this.playCharacter.bind(this)}>Play!</button></td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(user => {
            if (user) {
                onValue(this.props.firebase.charactersRef(user.uid), (snapshot) => {
                    if (!snapshot.val()) {
                        console.log("No characters present")
                        return
                    }
                    const charactersObject = snapshot.val();
                    const charactersList = Object.keys(charactersObject).map(key => ({
                        ...charactersObject[key],
                        uid: key,
                    }));

                    this.setState({
                        characters: charactersList,
                        loading: false,
                    });
                });
            } else {
                console.log('Something went wrong. Not logged in.')
                this.setState({
                    loading: false,
                });
            }
        });
    }

    componentWillUnmount() {
        off(this.props.firebase.charactersRef());
    }

    render() {
        const { name, character, error } = this.state;

        const isInvalid = name === '';

        return (
            <>
            
            <form onSubmit={this.onSubmit}>
                <input
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Choose your name" />
                <button disabled={isInvalid} type="submit">
                    Create Character
                </button>

                {error && <p>{error.message}</p>}
            </form>

            <table>
                <tbody>
                    {this.renderCharacters()}
                </tbody>
            </table>
            </>
        );
    }
}

const CharacterCreationForm = compose(
    withRouter,
    withFirebase,
)(CharacterCreationFormBase);



export default CharacterCreation;

export { CharacterCreationForm };
