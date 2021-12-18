import React, { Component } from 'react';
import { getDatabase, off, onValue } from "firebase/database";
import { withFirebase } from '../Firebase';
import './Landing.css';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'rgb(18, 18, 18)',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};


class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      loading: false,
      open: false,
      setOpen: false,
      modalCharacterName: '',
      modalCharacterClass: '',
      modalCharacterLevel: 1,
      modalCharacterXp: 2,
    };
  }

  handleOpen = (row) => {
    this.setState({ modalCharacterName: row[0] });
    this.setState({ modalCharacterClass: row[1] });
    this.setState({ modalCharacterLevel: row[2] });
    this.setState({ modalCharacterXp: row[3] });
    this.setState({ open: true });
  }

  handleClose = () => this.setState({ open: false });

  renderAllCharacters() {
    const characters = this.state.characters;
    if (characters.length > 0) {

      const mergedArray = Object.assign(...characters);
      return Object.keys(mergedArray).map((item, key) => {
        const { name, type, level, xp } = mergedArray[item]['reduxState']['character'];
        return (
          <tr key={key}>
            <td>{key + 1}.</td>
            <td>{name}</td>
            <td>{type}</td>
            <td>{level}</td>
            <td>{xp}</td>
            <td><button onClick={this.handleOpen.bind(this, [name, type, level, xp])}>Details!</button></td>
          </tr>
        )
      })
    }


  }

  componentDidMount() {
    this.setState({ loading: true });

    onValue(this.props.firebase.allCharactersRef(), (snapshot) => {
      if (snapshot.exists()) {
        const charactersObject = snapshot.val();
        const charactersList = Object.keys(charactersObject).map(key => ({
          ...charactersObject[key]
        }));
        this.setState({
          characters: charactersList,
          loading: false,
        });
      } else {
        console.log('no characters');
      }
    });
  }

  componentWillUnmount() {
    off(this.props.firebase.allCharactersRef());
  }

  render() {
    return (
      <><table>
        <thead>
          <tr>
            <th colSpan="50">D2IdleRPG Ranklist</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#</td>
            <td>Character name</td>
            <td>Class</td>
            <td>Level</td>
            <td>Exp</td>
            <td>Details</td>

          </tr>
          {this.state.characters.length > 0 ? this.renderAllCharacters() : <tr><td>Fetching database...</td></tr>}
        </tbody>
      </table>

        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          BackdropComponent={Backdrop}
        >
          <Box sx={style}>
            <h2 id="unstyled-modal-title">Name: <span className="purple">{this.state.modalCharacterName}</span></h2>
            <h3>Class: <span className="purple">{this.state.modalCharacterClass}</span></h3>
            <p id="unstyled-modal-description">Level: {this.state.modalCharacterLevel}</p>
            <p id="unstyled-modal-description">XP: {this.state.modalCharacterXp}</p>

          </Box>
        </StyledModal>
      </>
    )
  }
}


export default withFirebase(LandingPage);