import { Button, Modal, Text, View } from 'react-native';
import { Game } from '../types/Game';
import { useEffect, useState } from 'react';
import LobbyScreen from './LobbyScreen';
import subscribeToGameStateChanges from '../services/subscribeToGameState';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Team } from '../types/Team';
import QuestionScreen from './QuestionScreen';

interface GameModalProps {
    visible: boolean;
    onClose: () => void;
    game: Game;
}

const GameModal: React.FC<GameModalProps> = ({ visible, onClose, game }) => {
    const [team, setTeam] = useState<Team>();
    const [gameState, setGameState] = useState<string>(game.gameState);
    
    useEffect(() => {
        if (game.gameID) {
            const unsubscribeGameState = subscribeToGameStateChanges(
                game.gameID,
                (newGameState) => {
                    setGameState(newGameState);
                }
            );

            return () => {
                // Clean up the subscription when the modal is unmounted
                unsubscribeGameState();
            };
        }
    }, [game.gameID]);

    if (game === null || gameState === undefined) {
        onClose();
        return null;
    }

    return (
        <Modal visible={visible} onRequestClose={onClose} animationType="slide">
            <SafeAreaView style={styles.modalBackground}>
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
                {gameState === undefined && <Text>Undefined</Text>}
                {gameState === 'inactive' && (
                    <View>
                        <Text>This game hasn't started yet. </Text>
                    </View>
                )}
                {gameState === 'lobby' && (
                    <LobbyScreen game={game} team={team}></LobbyScreen>
                )}
                {gameState === 'question' && (
                    <QuestionScreen game={game} team={team}></QuestionScreen>
                )}
                {gameState === 'leaderboard' && <Text>Leaderboard Page</Text>}
                {gameState === 'finalLeaderboard' && (
                    <Text>Final Leaderboard Page</Text>
                )}
                <Button title="Leave Game" color={'red'} onPress={onClose} />
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameModal;
