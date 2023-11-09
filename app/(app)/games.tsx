import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import useGames from '../../services/gamesFetcher';

const GamesPage: React.FC = () => {
  const { games, loading: gamesLoading } = useGames(); // useGames hook should now include team data

  return (
    <View style={styles.container}>
      {gamesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>Games Page</Text>
          {games.map((game, index) => (
            <View key={index} style={styles.gameContainer}>
              <Text>Game {index + 1}</Text>
              <Text>Question Time: {game.questionTime}</Text>
              <Text>Start Time: {game.startTime.toDate().toLocaleString()}</Text>
              <Text>Team 1: {game.team1ID.name}</Text> 
              <Text>Team 2: {game.team2ID.name}</Text> 
              <Text>Questions:</Text>
              {game.questions.map((question, qIndex) => (
                <View key={qIndex}>
                  <Text>Q{qIndex + 1}: {question.question}</Text>
                  {question.answer.map((ans, aIndex) => (
                    <Text key={aIndex}>Answer {aIndex + 1}: {ans}</Text>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    marginBottom: 20,
    // Add any additional styling for the game container here
  },
  // You can add styles for questions and answers if needed
});

export default GamesPage;
