import { Button, Modal, Text, View, SafeAreaView, Pressable, Image } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';

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

    // conditionally assign team logo assets
    const logo1 =
        game.team1.name === 'UNC'
            ? require('../assets/temp/unc_logo.png')
            : require('../assets/temp/uva_logo.png');

    const logo2 =
        game.team2.name === 'Duke'
            ? require('../assets/temp/duke_logo.png')
            : require('../assets/temp/vt_logo.png');

    return (
        <Modal visible={visible} onRequestClose={onClose} animationType="slide">
            <SafeAreaView style={styles.modalBackground}>
                {/* Top bar for game pages */}
                {team !== undefined && (
                    <View style={styles.container}>
                        <Pressable onPress={onClose}>
                            <MaterialCommunityIcons
                                name="window-close"
                                size={30}
                                color="white"
                            />
                        </Pressable>

                        <Text style={styles.question}>
                            Question {game.currentQuestion + 1} of{' '}
                            {game.questions.length}
                        </Text>

                        <Text style={styles.question}>
                            {playerScore} / {game.currentQuestion + 1}
                        </Text>
                    </View>
                )}

                {/* Popup for selecting a team */}
                <Modal visible={team === undefined}>
                    <SafeAreaView style={styles.modalBackground}>
                        <LinearGradient
                            colors={['#000000', '#253031']}
                            style={styles.gradient}
                        >
                            <Text style={styles.joinTeam}>Select a team: </Text>
                            {/* replace buttons with team logos */}
                            <View style={styles.card}>
                                <Pressable onPress={() => setTeam(game.team1)}>
                                    <Image
                                        style={styles.logo}
                                        source={logo1}
                                    ></Image>
                                    <Text style={styles.teamName}>
                                        {game.team1.name}
                                    </Text>
                                </Pressable>
                            </View>

                            <View style={styles.card}>
                                <Pressable onPress={() => setTeam(game.team2)}>
                                    <Image
                                        style={styles.logo}
                                        source={logo2}
                                    ></Image>
                                    <Text style={styles.teamName}>
                                        {game.team2.name}
                                    </Text>
                                </Pressable>
                            </View>
                        </LinearGradient>
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
                    />
                )}
                {gameState === 'finalLeaderboard' && team !== undefined && (
                    <FinalLeaderboardScreen
                        game={game}
                        team={team}
                        playerScore={playerScore}
                    />
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
    selectTeamPopup: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    gradient: {
        flex: 1,
        width: '100%',
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
    },
    joinTeam: {
        color: 'white',
        fontSize: 35,
        fontWeight: '500',
        textAlign: 'center',
        padding: 30
    },
    logo: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
        padding: 20
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
        width: 300,
        alignItems: 'center',
        margin: 20,
        paddingTop: 20
    },
    teamName: {
        color: '#253031',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '800',
        padding: 10
    }
});

export default GameModal;
