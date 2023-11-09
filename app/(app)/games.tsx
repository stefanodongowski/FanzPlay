import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import useGames from '../../services/gamesFetcher';
import useQuestions from '../../services/questionsFetcher';
import useTeams from '../../services/teamsFetcher';
import useUsers from '../../services/usersFetcher';

// recall needed data from the db from the fetch components
const GamesPage: React.FC = () => {
  const { games, loading: gamesLoading } = useGames(); // the loading state with games only because we will only print games
  const { questions } = useQuestions();
  const { teams } = useTeams();
  const { users } = useUsers();

  // display the data in the console for testing
  useEffect(() => {
    if (!gamesLoading) { 
      console.log("Games:", games)
      console.log("Questions:", questions);
      console.log("Teams:", teams);
      console.log("Users:", users);
    }
  }, [gamesLoading, questions, teams, users]);

  // print games data for testing
  return (
    <View style={styles.container}>
      {gamesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // temporary loading circle untill data is displayed
      ) : (
        <>
          <Text>Games Page</Text>
          <Text>Games:</Text>
          {games.map((game, index) => (
            <View key={index}>
              <Text>Game {index + 1}</Text>
              <Text>Question Time: {game.questionTime}</Text>
              <Text>Start Time: {game.startTime.toDate().toLocaleString()}</Text>
              {/* References are omitted and was unable to print */}
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
});

export default GamesPage;