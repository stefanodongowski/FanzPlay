import { View, ViewProps, Text } from "react-native";
import { Game } from "../types/Game";
import { Team } from "../types/Team";

interface LeaderboardScreenProps extends ViewProps {
    game: Game;
    team: Team;
    playerScore: number; //not sure if we want to display this here
    currentQuestion: number;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
    game,
    team,
    currentQuestion
}) => {

    return (
        <View>
            <Text>Leaderboard Page</Text>
            <Text>
                {game.team1.name} Score:{' '}
                {(game.team1score / game.team1responses) * 100}
            </Text>
            <Text>
                {game.team2.name} Score:{' '}
                {(game.team2score / game.team2responses) * 100}
            </Text>
        </View>
    );
}

export default LeaderboardScreen;