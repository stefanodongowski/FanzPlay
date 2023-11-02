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

// Currently using a static photo file, eventually will need to adapt to 
// render a photo from each team

const GameCard: React.FC<GameCardProps> = ({game}) => {
  const photo : string = '../assets/temp/uncVduke.png';
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {game.team1.name + ' vs. ' + game.team2.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.image} source={require(photo)}></Image>
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
  image: {
    width: 250,
    height: 93.75,
    marginLeft: 5,
    marginBottom: 10,
  }
});

export default GameCard;
