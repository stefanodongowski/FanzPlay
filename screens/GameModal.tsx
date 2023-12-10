import { Button, Modal, Text, View, SafeAreaView, Pressable } from 'react-native';
import { Game } from '../types/Game';
import { useEffect, useState } from 'react';
import LobbyScreen from './LobbyScreen';
import subscribeToGameChanges from '../services/subscribeToGameState';
import { StyleSheet } from 'react-native';
import { Team } from '../types/Team';
import QuestionScreen from './QuestionScreen';
import LeaderboardScreen from './LeaderboardScreen';
import FinalLeaderboardScreen from './FinalLeaderboardScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface GameModalProps {
    visible: boolean;
    onClose: () => void;
    game: Game;
}

const GameModal: React.FC<GameModalProps> = ({ visible, onClose, game }) => {
    const [team, setTeam] = useState<Team>();
    const [gameState, setGameState] = useState<string>(game.gameState);
    const [currentQuestion, setCurrentQuestion] = useState(game.currentQuestion);
    const [playerScore, setPlayerScore] = useState(0);

    useEffect(() => {
        if (game.gameID) {
            const unsubscribeGameState = subscribeToGameChanges(
                game.gameID,
                (newGameState, newCurrentQuestion) => {
                    setGameState(newGameState);
                    setCurrentQuestion(newCurrentQuestion);
                }
            );

            return () => {
                // Clean up the subscription when the modal is unmounted
                unsubscribeGameState();
            };
        }
    }, [game.gameID]);

    const updatePlayerScore = (points : number) => {
        setPlayerScore(playerScore + points);
    }

    // go back to home page if missing game or game state
    if (game === null || gameState === undefined) {
        onClose();
        return null;
    }

    return (
        <Modal visible={visible} onRequestClose={onClose} animationType="slide">
            <SafeAreaView style={styles.modalBackground}>
                <View style={styles.container}>
                    <Pressable onPress= {onClose}>
                        <MaterialCommunityIcons
                            name="window-close"
                            size={30}
                            color="white"
                        />
                    </Pressable>

                    <Text style={styles.question}>Question {game.currentQuestion+1} of {game.questions.length}</Text>

                    <Text style={styles.question}>{playerScore} / {game.currentQuestion+1}</Text>
                    </View>
                
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
                {gameState === 'inactive' && team !== undefined && (
                    <View>
                        <Text>This game hasn't started yet. </Text>
                    </View>
                )}
                {gameState === 'lobby' && team !== undefined && (
                    <LobbyScreen game={game} team={team}></LobbyScreen>
                )}
                {gameState === 'question' && team !== undefined && (
                    <QuestionScreen
                        game={game}
                        team={team}
                        updatePlayerScore={updatePlayerScore}
                        currentQuestion={currentQuestion}
                    ></QuestionScreen>
                )}
                {gameState === 'leaderboard' && team !== undefined && (
                    <LeaderboardScreen 
                        game={game}
                        team={team}
                        playerScore={playerScore}
                        currentQuestion={currentQuestion}
                    /> )}
                {gameState === 'finalLeaderboard' && team !== undefined && (
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
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#253031',
        width: '100%'
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    question: {
        fontSize: 25,
        color: 'white',
        fontWeight: '200'
    }
});

export default GameModal;
