import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Team } from '../types/Team';
import { Game } from '../types/Game';
import { FIRESTORE } from '../FirebaseConfig';
import { doc, increment, updateDoc } from 'firebase/firestore';

interface QuestionScreenProps {
    game: Game;
    team: Team;
    updatePlayerScore: (points: number) => void;
    currentQuestion: number;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
    game,
    team,
    updatePlayerScore,
    currentQuestion
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
    const [answered, setAnswered] = useState(false);
    const questionPointValue = game.questions[currentQuestion].points;

    const updateGameState = async (newState: string) => {
        const gameRef = doc(FIRESTORE, 'games', game.gameID);
        await updateDoc(gameRef, { gameState: newState });
    };

    const updateResponses = async () => {
        const gameRef = doc(FIRESTORE, 'games', game.gameID);
        if (team.teamID === game.team1.teamID) {
            await updateDoc(gameRef, {
                team1responses: increment(1)
            });
        } else if (team.teamID === game.team2.teamID) {
            await updateDoc(gameRef, {
                team2responses: increment(1)
            });
        }
    };

    const submitAnswer = async () => {
        setAnswered(true);
        // increment number of responses from that player's team
        updateResponses();
        if (selectedAnswer === game.questions[currentQuestion].correctAnswer) {
            // add points to indiviual player score, a variable in the GameModal
            updatePlayerScore(questionPointValue);

            // add points to team score in firestore collection
            const gameRef = doc(FIRESTORE, 'games', game.gameID);
            if (team.teamID === game.team1.teamID) {
                await updateDoc(gameRef, {
                    team1score: increment(questionPointValue)
                });
            } else if (team.teamID === game.team2.teamID) {
                await updateDoc(gameRef, {
                    team2score: increment(questionPointValue)
                });
            }
        }
    };

    const answerButtonStyle = (index: number) => {
        // Styles logic for selected answer
        game.gameState = 'question';
        if (game.gameState === 'question' && selectedAnswer === index) {
            // console.log('Selected Answer:', selectedAnswer);
            return [styles.answerButton, styles.selectedAnswer];
        }
        return styles.answerButton;
    };

    return (
        <View style={[styles.container, styles.dark]}>
            <View style={styles.timerBox}>
                <CountdownCircleTimer
                    isPlaying
                    duration={game.questions[currentQuestion].questionTime}
                    colors={['#DDE819', '#FF0000']}
                    colorsTime={[
                        game.questions[currentQuestion].questionTime,
                        0
                    ]}
                    size={125}
                    onComplete={() => {
                        updateGameState('leaderboard');
                    }}
                >
                    {({ remainingTime }) => (
                        <Text style={styles.remainingTime}>
                            {remainingTime}
                        </Text>
                    )}
                </CountdownCircleTimer>
            </View>

            <Text style={styles.questionText}>
                {game.questions[currentQuestion].question}
            </Text>

            {game.questions[currentQuestion].answers.map((answer, index) => (
                <Pressable
                    key={index}
                    onPress={() => setSelectedAnswer(index)}
                    style={({ pressed }) => [
                        styles.answerButton,
                        pressed && styles.selectedAnswer,
                        answerButtonStyle(index)
                    ]}
                    // prevents users from changing answer once they click submit
                    disabled={answered}
                >
                    <Text style={styles.answerText}>{answer}</Text>
                </Pressable>
            ))}
            <Pressable
                onPress={submitAnswer}
                style={({ pressed }) => [
                    styles.submitButton,
                    pressed && styles.submitButtonPressed
                ]}
                disabled={answered}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
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
    questionNumber: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
        fontWeight: '200'
    },
    questionText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20
    },
    answerButton: {
        // backgroundColor: 'DDE819',
        // padding: 15,
        // borderRadius: 5,
        // marginVertical: 5,
        // width: '100%',
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
        width: 360,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20
    },
    selectedAnswer: {
        // backgroundColor: 'lightblue',
        opacity: 0.8,
        transform: [{ scale: 0.96 }]
    },
    answerText: {
        // color: 'black',
        // textAlign: 'center',
        // fontSize: 24,
        color: '#253031',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '500'
    },
    remainingTime: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: '#DDE819',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
        width: 360,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20
    },
    submitButtonText: {
        fontSize: 24,
        color: '#253031',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '500'
    },
    submitButtonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.96 }]
    },
    timerBox: {
        padding: 20
    }
});

export default QuestionScreen;
