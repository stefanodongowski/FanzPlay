import { View, Text, StyleSheet } from "react-native";
import { Game } from "../types/Game";
import { Team } from "../types/Team";

import React from 'react';
import { BarChart, Grid } from 'react-native-svg-charts';

interface LeaderboardScreenProps{
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
    const team1Score = (game.team1score / game.team1responses) * 100;
    const team2Score = (game.team2score / game.team2responses) * 100;

    const data = [
        {
            value: team1Score,
            svg: {
                fill: game.team1.color1,
            },
            label: game.team1.name,
        },
        {
            value: team2Score,
            svg: {
                fill: game.team2.color1,
            },
            label: game.team2.name,
        },
    ];

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
                The correct answer to the previous question was:
            </Text>
            <Text style={styles.answer}>
                {game.questions[currentQuestion].answers[game.questions[currentQuestion].correctAnswer]}
            </Text>
            <Text style={styles.currentScoreText}>Current Standings:</Text>

            <BarChart
                style={{ height: 200, width: 300 }}
                data={data}
                yAccessor={({ item }) => item.value}
                svg={{ fill: 'grey' }}
                contentInset={{ top: 20, bottom: 20 }}
                // spacing={0.2}
                gridMin={0}
            >
                <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>

            <View style={styles.scoreLabels}>
                {data.map((item, index) => (
                    <Text key={index} style={styles.scoreText}>
                        {item.label}: {item.value.toFixed(2)}%
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
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
        padding: 20,
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
        fontSize: 40
    },
    currentScoreText: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        width: 260,
        fontSize: 30,
        paddingTop: 40,
        fontWeight: '500'
    },
    scoreText: {
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        fontWeight: '500'
    },
    scoreLabels: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10
    }
});

export default LeaderboardScreen;