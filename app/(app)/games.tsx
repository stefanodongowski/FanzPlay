import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, ScrollView } from 'react-native';
import useGames from '../../services/gamesFetcher';
import useGame from '../../services/useGame'; // This is your hook for fetching a single game
import { Game } from '../../types/Game';

const GamesPage: React.FC = () => {
  const { games, loading: gamesLoading } = useGames();
  const [inputGameId, setInputGameId] = useState<string>('');
  const { game, loading: gameLoading } = useGame(inputGameId);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearchGame = () => {
    setSearched(true);
  };

  const handleReloadGames = () => {
    setSearched(false);
    setInputGameId(''); // Clear the input to show all games again
  };

  // Render the details of a single game
  const renderGameDetails = (game: Game) => (
    <View style={styles.gameContainer}>
      <Text>Question Time: {game.questionTime}</Text>
      <Text>Start Time: {game.startTime.toDate().toLocaleString()}</Text>
      <Text>Team 1: {game.team1.name}</Text>
      <Text>Team 2: {game.team2.name}</Text>
      <Text>Questions:</Text>
      {game.questions.map((question, qIndex) => (
        <View key={qIndex}>
          <Text>Q{qIndex + 1}: {question.question}</Text>
          {question.answers.map((ans, aIndex) => (
            <Text key={aIndex}>Answer {aIndex + 1}: {ans}</Text>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputGameId}
        value={inputGameId}
        placeholder="Enter Game ID"
      />
      <Button onPress={handleSearchGame} title="Search Game" />

      {searched ? (
        gameLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : game ? (
          <>
            {renderGameDetails(game)}
            <Button onPress={handleReloadGames} title="Reload All Games" />
          </>
        ) : (
          <Text>No game found with that ID.</Text>
        )
      ) : gamesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        games.map((game, index) => (
          <View key={index}>
            {renderGameDetails(game)}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gameContainer: {
    marginBottom: 20,
    // Add any additional styling for the game container here
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  // ... other styles
});

export default GamesPage;
