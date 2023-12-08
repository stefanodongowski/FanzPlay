import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { Game } from '../types/Game';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import { Team } from '../types/Team';

interface LobbyProps extends ViewProps {
    game: Game;
}

const LobbyScreen: React.FC<LobbyProps> = ({ game }) => {
    //const [teamSelected, setTeamSelected] = React.useState(false);
    const [team, setTeam] = React.useState('');
    return ( <Text>Lobby View</Text>
        // <View style={styles.container}>
        //     <Modal
        //         // I have a feeling that this is not the right way to do
        //         // this may need a boolean variable
        //         visible={team !== ''}
        //     >
        //         <Text>Choose a team</Text>
        //         {/* replace buttons with team logos */}
        //         <Button
        //             title={game.team1.name}
        //             onPress={() => setTeam(game.team1.name)}
        //         ></Button>
        //         <Button
        //             title={game.team1.name}
        //             onPress={() => setTeam(game.team1.name)}
        //         ></Button>
        //     </Modal>
        //     <Text> You're playing for {team}.</Text>
        //     <Text>Waiting for others to join...</Text>
        // </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//make this component available to the app
export default LobbyScreen;
