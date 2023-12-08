import { Button, Modal, Text, View } from "react-native";
import { Game } from "../types/Game";
import { useEffect, useState } from "react";
import LobbyScreen from "./LobbyScreen";
import subscribeToGameStateChanges from "../services/subscribeToGameState";
import useGame from "../services/useGame";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

interface GameModalProps {
    visible: boolean;
    onClose: () => void;
    game: Game;
  }

const GameModal: React.FC<GameModalProps> = ({visible, onClose, game}) => {
    // const {game, loading: gameLoading} = useGame(gameID);
    const [gameState, setGameState] = useState<string>(game.gameState);
    console.log('Game state is: ' + gameState)

    useEffect(() => {
      if (game.gameID) {
        const unsubscribeGameState = subscribeToGameStateChanges(game.gameID, (newGameState) => {
          setGameState(newGameState);
        });
  
        return () => {
          // Clean up the subscription when the modal is unmounted
          unsubscribeGameState();
        };
      }
    }, [game.gameID]);
  
    if (game === null) {
      onClose();
      return null; // or return a loading state
    }
  
    return (
        <Modal visible={visible} onRequestClose={onClose} animationType="slide" >  
            <SafeAreaView style={styles.modalBackground}>
            {gameState===undefined && 
                    (<Text>Undefined</Text>)}
                {gameState==='inactive' && 
                    (<View>
                        <Text>Inactive Page</Text>
                    </View>)}
                {gameState==='lobby' && 
                    (<LobbyScreen game={game}></LobbyScreen> )}
                {gameState==='question' && 
                    (<Text>Question Page</Text>)}
                {gameState==='leaderboard' && 
                    (<Text>Leaderboard Page</Text>)}
                {gameState==='finalLeaderboard' &&
                    (<Text>Final Leaderboard Page</Text>)}
                <Button title='Leave Game' color={'red'} onPress={onClose}/>
            </SafeAreaView> 
        </Modal>)
            
};

const styles = StyleSheet.create({
    modalBackground: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
    });

export default GameModal; 

