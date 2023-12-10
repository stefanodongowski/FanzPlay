import { View, ViewProps, Text, StyleSheet } from "react-native";
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
        <View style={[styles.container, styles.dark]}>
            <View
                style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 2,
                    marginBottom: 5
                }}
            >
                <Text style={styles.leaderboardText}>Leaderboard</Text>
            </View>
            <Text style={styles.answerText}>
                The correct answer to the previous question was... 
            </Text>
            <Text style={styles.answer}>
                {game.questions[currentQuestion].answers[game.questions[currentQuestion].correctAnswer]}!
            </Text>
            <Text style={styles.currentScoreText}>The current standings are...</Text>
            <Text style={styles.scoreText}>
                {game.team1.name}:{' '}
                {(game.team1score / game.team1responses) * 100}
            </Text>
            <Text style={styles.scoreText}>
                {game.team2.name}:{' '}
                {(game.team2score / game.team2responses) * 100}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dark: {
        backgroundColor: '#253031'
    },
    leaderboardText: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        padding: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        width: 360
    },
    answerText: {
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        fontWeight: '400'
    },
    answer: {
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '400',
        marginBottom: 30,
        fontSize: 20
    },
    currentScoreText: {
        color: 'white',
        textAlign: 'center',
        padding: 10,
        width: 360,
        fontSize: 20,
        marginBottom: 20
    },
    scoreText: {
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        fontWeight: '400'
    },
});

export default LeaderboardScreen;