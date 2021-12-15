import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import { HERO_CLASSES_MAP } from '../../constants/gameConstants';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { off, onValue } from "firebase/database";
import './CharacterCreation.css';
import { withAuthorization } from '../Session';
import { play, reload } from './../Home/userSlice';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';


let characterSelected = null;

const INITIAL_STATE = {
    name: '',
    character: '',
    characters: [],
    loading: true,
    open: false,
    vertical: 'top',
    horizontal: 'center',
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
            <h1>create new character here</h1>
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
        this.uid = null;
    }

    onSubmit = event => {
        if (!characterSelected) {
            alert('Please select a character first.')
        } else {
            const { name } = this.state;
            this.props.firebase
                .createCharacter(name, characterSelected)
                .then(() => {
                    this.setState({
                        name: '',
                        character: '',
                    })
                    //this.setState({ ...INITIAL_STATE });
                    //this.props.history.push(ROUTES.HOME);
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

    handleClick = () => () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    loadCharacter = (uid, cid) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://d2idlerpg-default-rtdb.europe-west1.firebasedatabase.app/characters/${uid}/${cid}.json`, requestOptions)
            .then(response => response.json())
            //.then(data=> console.log(data['reduxState']))
            .then(data => this.props.reload(data['reduxState']))
            .catch(error => console.log('Error: ', error));
    }

    playCharacter(e) {
        this.loadCharacter(this.uid, e.target.dataset.charid);
        this.props.playDispatch([this.uid, e.target.dataset.charid]);
        this.props.history.push(ROUTES.HOME);
    };

    deleteCharacter(e) {
        let uid = this.uid;
        let cid = e.target.dataset.charid;
        var raw = "";

        var requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://d2idlerpg-default-rtdb.europe-west1.firebasedatabase.app/characters/${uid}/${cid}.json`, requestOptions)
            .then(this.handleClick())
            .catch(error => console.log('Error while deleting character: ', error));
    }

    renderCharacters() {
        const characters = this.state.characters;
        return characters.map((character, index) => {
            const { name, type, level, cid } = character;
            return (
                <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{level}</td>
                    <td><button data-charid={cid} data-chartype={type} data-charname={name} onClick={this.playCharacter.bind(this)}>Play!</button></td>
                    <td><button data-charid={cid} onClick={this.deleteCharacter.bind(this)}>Delete!</button></td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;
                onValue(this.props.firebase.charactersRef(user.uid), (snapshot) => {
                    if (!snapshot.val()) {
                        console.log("No characters present")
                        return
                    }
                    const charactersObject = snapshot.val();
                    const charactersList = Object.keys(charactersObject).map(key => ({
                        ...charactersObject[key]['reduxState']['character'],
                        cid: key
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
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { name, error, open } = this.state;

        const isInvalid = name === '';

        return (
            <>
                <div>
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                        message="Character deleted!"
                    />
                </div>
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
                    <h2>or play with an existing one...</h2>
                    {error && <p>{error.message}</p>}
                </form>

                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Character name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCharacters()}
                    </tbody>
                </table>
            </>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        playDispatch: (arg) => dispatch(play(arg)),
        reload: (arg) => dispatch(reload(arg))
    };
}

const condition = authUser => !!authUser;

const CharacterCreationForm = compose(
    withRouter,
    withFirebase,
    connect(null, mapDispatchToProps),
)(CharacterCreationFormBase);



export default withAuthorization(condition)(CharacterCreation);

export { CharacterCreationForm };