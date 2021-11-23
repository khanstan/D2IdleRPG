import React, { Component } from 'react';
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { off, onValue } from "firebase/database";


const CharacterCreation = () => (
    <div>
        <h1>create a character here</h1>
        <img className="heroPortrait" src={HERO_CLASSES_MAP.AMAZON.portrait}></img>
        <img className="heroPortrait" src={HERO_CLASSES_MAP.ASASSIN.portrait}></img>
        <img className="heroPortrait" src={HERO_CLASSES_MAP.NECROMANCER.portrait}></img>
        <img className="heroPortrait" src={HERO_CLASSES_MAP.BARBARIAN.portrait}></img>
        <img className="heroPortrait" src={HERO_CLASSES_MAP.PALADIN.portrait}></img>
        <img className="heroPortrait" src={HERO_CLASSES_MAP.SORCERESS.portrait}></img>
        <img className="heroPortrait" src={HERO_CLASSES_MAP.DRUID.portrait}></img>
        <CharacterCreationForm />
    </div>
);

const INITIAL_STATE = {
    name: '',
    character: '',
    characters: [],
    loading: false
};

class CharacterCreationFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { name, character } = this.state;

        this.props.firebase
            .createCharacter(name, character)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        this.setState({ loading: true });

        onValue(this.props.firebase.charactersRef(), (snapshot) => {
            if (snapshot.exists()) {
                const charactersObject = snapshot.val();
                const charactersList = Object.keys(charactersObject).map(key => ({
                    ...charactersObject[key],
                    uid: key,
                }));
    
                this.setState({
                    characters: charactersList,
                    loading: false,
                });
    
                console.log(this.state.characters)
            } else {
                console.log('no characters')
            }

        });
    }

    componentWillUnmount() {
        console.log(off(this.props.firebase.charactersRef()));
    }

    render() {
        const { name, character, error } = this.state;

        const isInvalid = name === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Character name"
                />
                <button disabled={isInvalid} type="submit">
                    Create Character
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const CharacterCreationForm = compose(
    withRouter,
    withFirebase,
)(CharacterCreationFormBase);



export default CharacterCreation;

export { CharacterCreationForm };
