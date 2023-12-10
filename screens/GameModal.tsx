import { Button, Modal, StatusBar, Text, View, SafeAreaView, Pressable } from 'react-native';
import { Game } from '../types/Game';
import { useEffect, useState } from 'react';
import LobbyScreen from './LobbyScreen';
import { StyleSheet } from 'react-native';
import { Team } from '../types/Team';
import QuestionScreen from './QuestionScreen';
import LeaderboardScreen from './LeaderboardScreen';
import FinalLeaderboardScreen from './FinalLeaderboardScreen';
import useGame from '../services/useGame';

interface GameModalProps {
    visible: boolean;
    onClose: () => void;
    gameID: string;
}

const GameModal: React.FC<GameModalProps> = ({ visible, onClose, gameID }) => {
    const {game, loading: gameLoading } = useGame(gameID);
    const [team, setTeam] = useState<Team>();
    const [playerScore, setPlayerScore] = useState(0);

   
    const updatePlayerScore = (points : number) => {
        setPlayerScore(playerScore + points);
    }

    // go back to home page if missing game or game state
    if (game === null || game.gameState === undefined) {    // this is needed to remove a react native error that happens when useEffect is removed 
        return (                                                          //and close is not triggered by the user
            <Modal visible={visible} onRequestClose={onClose} animationType="slide">
                <SafeAreaView style={styles.modalBackground}>
                    <Text>Game data is unavailable.</Text>
                    <Pressable onPress={onClose}>
                        <Text>Close</Text>
                    </Pressable>
                </SafeAreaView>
            </Modal>
        );
    }

    return (
        <Modal visible={visible} onRequestClose={() => onClose} animationType="slide">
            <SafeAreaView style={styles.modalBackground}>
                <Pressable style={({ pressed }) => [styles.button, styles.leaveButton, pressed && styles.buttonPressed]} onPress={onClose}>
                   <Text style={styles.buttonText}>Leave Game</Text>
               </Pressable>
                {/* force users to select a team if they haven't already */}
                <Modal visible={team === undefined}>
                    <SafeAreaView style={styles.modalBackground}>
                        <Text>Choose a team</Text>
                        {/* replace buttons with team logos */}
                        <Button
                            title={game.team1.name}
                            onPress={() => setTeam(game.team1)}
                        ></Button>
                        <Button
                            title={game.team2.name}
                            onPress={() => setTeam(game.team2)}
                        ></Button>
                    </SafeAreaView>
                </Modal>
                {game.gameState === 'inactive' && team !== undefined && (
                    <View>
                        <Text>This game hasn't started yet. </Text>
                    </View>
                )}
                {game.gameState === 'lobby' && team !== undefined && (
                    <LobbyScreen game={game} team={team}></LobbyScreen>
                )}
                {game.gameState === 'question' && team !== undefined && (
                    <QuestionScreen
                        game={game}
                        team={team}
                        updatePlayerScore={updatePlayerScore}
                        currentQuestion={game.currentQuestion}
                    ></QuestionScreen>
                )}
                {game.gameState === 'leaderboard' && team !== undefined && (
                    <LeaderboardScreen 
                        game={game}
                        team={team}
                        playerScore={playerScore}
                        currentQuestion={game.currentQuestion}
                    /> )}
                {game.gameState === 'finalLeaderboard' && team !== undefined && (
                    <FinalLeaderboardScreen
                        game={game}
                        team={team}
                        playerScore={playerScore}/>
                )}
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        backgroundColor: '#DDE819',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        minWidth: 80,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 19,
        fontWeight: '500',
    },
    leaveButton: {
        backgroundColor: 'red',
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.96 }],
    },

});

export default GameModal;
