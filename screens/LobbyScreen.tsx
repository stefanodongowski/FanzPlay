import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { Game } from '../types/Game';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import { Team } from '../types/Team';

interface LobbyProps extends ViewProps {
    game: Game;
    team?: Team;
}

const LobbyScreen: React.FC<LobbyProps> = ({ game, team }) => {
    //const [teamSelected, setTeamSelected] = React.useState(false);
    const opponent =
        team?.teamID === game.team1.teamID ? game.team2.name : game.team1.name;
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Welcome to FanzPlay! You're in.
            </Text>
            <Text>
                Get ready to beat {opponent}!
            </Text>
            <Text>Waiting for others to join...</Text>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

//make this component available to the app
export default LobbyScreen;
