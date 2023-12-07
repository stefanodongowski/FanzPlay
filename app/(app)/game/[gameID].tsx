import LobbyScreen from '../../../screens/LobbyScreen';
import { ActivityIndicator, View, ViewProps } from 'react-native';
import useTeams from '../../../services/teamsFetcher';
import { Team } from '../../../types/Team';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useGame from '../../../services/useGame';
import { RouteProp } from '@react-navigation/native';
import { Game } from '../../../types/Game';

type GameProps = {
    route: RouteProp<{ Game: { gameID: string } }, 'Game'>;
};

const GamePage: React.FC<GameProps> = ({ route }) => {
    const gameID = route.params.gameID;
    //fetch game information
    const {game, loading: gameLoading} = useGame(gameID);
    //probably need two separate cases here, but for now this lets us use lobbyscreen
    if(gameLoading || game === null){
        return 
        (<ActivityIndicator
                size="large"
                color="#0000ff"
                />);
    } 
    
    return <LobbyScreen game={game}></LobbyScreen>;
};


