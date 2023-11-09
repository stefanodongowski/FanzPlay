import {StyleSheet, View, Text, ViewProps, Image} from 'react-native';

export type Game = {
  team1: Team;
  team2: Team;
  date: string;
  time: string;
};

export type Team = {
  name: string;
  logo: string;
};

interface GameCardProps extends ViewProps {
  game: Game; 
}

const GameCard: React.FC<GameCardProps> = ({game}) => {
  const icon1 = (game.team1.name === 'UNC') 
  ? require('../assets/temp/unc_logo.png')
  : require('../assets/temp/uva_logo.png');

  const icon2 = (game.team2.name === 'Duke')
  ? require('../assets/temp/duke_logo.png')
  : require('../assets/temp/vt_logo.png');
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {game.team1.name + ' vs. ' + game.team2.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.logo} source={icon1}></Image>
          <View style={styles.divider}></View>
          <Image style={styles.logo} source={icon2}></Image>
          <View style={styles.timeAndDate}>
          <Text style={styles.dateTime}>
            {game.date}
          </Text>
          <Text style={styles.dateTime}>
            {game.time}
          </Text>
          </View>
        </View>
      </View>
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
    width: 70,
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
  }
});

export default GameCard;