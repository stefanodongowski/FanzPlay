import { View, ViewProps, Text } from 'react-native';
import { Game } from '../types/Game';
import { Team } from '../types/Team';

interface FinalLeaderboardScreenProps extends ViewProps {
    game: Game;
    team: Team;
    playerScore: number; //not sure if we want to display this here
}

const FinalLeaderboardScreen: React.FC<FinalLeaderboardScreenProps> = ({
    game,
    team,
    playerScore
}) => {

    const team1Score = (game.team1score / game.team1responses) * 100;
    const team2Score = (game.team1score / game.team1responses) * 100;
    const finalPlayerScore = (playerScore / game.questions.length) * 100;
    const winner = team1Score > team2Score ? game.team1.name : game.team2.name;
    return (
        <View>
            <Text>Final Leaderboard Page</Text>
            <Text>
                {winner} won!!!!
            </Text>
            <Text>
                {game.team1.name} Score:{' '}
                {team1Score}
            </Text>
            <Text>
                {game.team2.name} Score:{' '}
                {team2Score}
            </Text>
            <Text>
                Final Player Score:{' '}
                {finalPlayerScore}
            </Text>
        </View>
    );
};

export default FinalLeaderboardScreen;
