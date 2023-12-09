import React, { useState, ReactElement } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    ViewProps
} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import useGame from '../services/useGame';
import { Team } from '../types/Team';
import { Game } from '../types/Game';

interface QuestionScreenProps extends ViewProps {
    game: Game;
    team?: Team;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ game, team }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    // Save current question as vb
    const currentQuestion = game.questions[game.currentQuestion];

    const handleAnswerSelect = (index: number) => {
        // Logic to handle when an answer choice is selected
        if (game.gameState === 'question') {
            setSelectedAnswer(index);
        }
    };

    // const isCorrectAnswer = (index: number) => {
    //   return index === currentQuestion.correctAnswer;
    // };

    const answerButtonStyle = (index: number) => {
        // Styles logic for selected answer
        game.gameState = 'question';
        if (game.gameState === 'question' && selectedAnswer === index) {
            console.log('Selected Answer:', selectedAnswer);
            return [styles.answerButton, styles.selectedAnswer];
        }
        return styles.answerButton;
    };

    const handleSubmit = () => {
        // Answer submission handled here
        let winner: number = -1; // For testing purposes
        if (
            game.gameState === 'question' &&
            selectedAnswer === currentQuestion.correctAnswer
        ) {
            if (team?.teamID === game.team1.teamID) {
                game.team1score += currentQuestion.points;
                winner = game.team1score;
                console.log('points added to team 1');
            } else if (team?.teamID === game.team2.teamID) {
                game.team2score += currentQuestion.points;
                winner = game.team2score;
                console.log('points added to team 2');
            }
            console.log('submitted, winner score is: ', winner);
        }
        // Handle when it's not in question state
    };

    return (
        <View style={[styles.container, styles.dark]}>
            <CountdownCircleTimer
                isPlaying
                duration={10}
                colors="#A30000"
                onComplete={() => {
                    // If didn't press submit, answer not saved to database
                    game.gameState = 'leaderboard';
                    // Route to leaderboard page
                }}
            >
                {({ remainingTime }) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>

            <Text style={styles.questionNumber}>
                Question {game.currentQuestion + 1} of {game.questions.length}
            </Text>

            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            {/* {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleAnswerSelect(index)}
          style={answerButtonStyle(index)}
          disabled={game.gameState !== 'question'}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))} */}

            {currentQuestion.answers.map((answer, index) => (
                <Pressable
                    key={index}
                    onPress={() => handleAnswerSelect(index)}
                    style={({ pressed }) => [
                        styles.answerButton,
                        pressed && styles.selectedAnswer,
                        answerButtonStyle(index)
                    ]}
                    disabled={game.gameState !== 'question'}
                >
                    <Text style={styles.answerText}>{answer}</Text>
                </Pressable>
            ))}

            <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                    styles.submitButton,
                    pressed && styles.submitButtonPressed
                ]}
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
        marginBottom: 10
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
    }
});

export default QuestionScreen;
