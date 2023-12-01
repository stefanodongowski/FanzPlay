import {StyleSheet, View, Text, ViewProps, Image, Pressable} from 'react-native';
import { Game } from '../types/Game';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

interface GameCardProps extends ViewProps {
  game: Game; 
  isAdmin?: boolean;
  onPress?: () => void;
}

const formatDate = (timestamp: { toDate: () => any; }) => {
  const date = timestamp.toDate();
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const GameCard: React.FC<GameCardProps> = ({game, isAdmin = false, onPress}) => {
  const icon1 = (game.team1.name === 'UNC') 
  ? require('../assets/temp/unc_logo.png')
  : require('../assets/temp/uva_logo.png');

  const icon2 = (game.team2.name === 'Duke')
  ? require('../assets/temp/duke_logo.png')
  : require('../assets/temp/vt_logo.png');
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {game.team1.name + ' vs. ' + game.team2.name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.logo} source={icon1}></Image>
            <View style={styles.divider}></View>
            <Image style={styles.logo} source={icon2}></Image>
            <View style={styles.timeAndDate}>
            <Text style={styles.dateTime}>
            {formatDate(game.startTime)}
            </Text>
            </View>
          </View>
          {isAdmin && (
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.startButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Start</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.updateButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Update</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.deleteButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
},
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
    width: 360,
  },
  title: {
    color: '#000',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '400',
    padding: 10,
  },
  dateTime: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '300',
    width: 85,
  },
  timeAndDate: {
    flexShrink: 0,
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 65,
    resizeMode: 'contain',
    marginLeft: 5,
    marginBottom: 10,
  },
  divider: {
    height: '90%',
    width: 2,
    marginHorizontal: 10,
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOpacity: 0.6,
    shadowRadius: 7,
    elevation: 2,
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80, 
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: 'green',
  },
  updateButton: {
    backgroundColor: 'orange',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});

export default GameCard;