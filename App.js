import React from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  AsyncStorage,
} from 'react-native';

const STORAGE_KEY = '@MyState:currentTurn';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.initializeTurnState();
  }

  state = {
    totalTurns: 2,
    turn: 1
  }

  initializeTurnState = () => {
    AsyncStorage.getItem(STORAGE_KEY).then((item) => {
      if (item !== null){
        console.log("got item:", item);
        this.setState(JSON.parse(item));
      } else {
        console.log("initializing turns");
        this.saveState(this.state);
      }
    }).catch((err) => {
      console.log(`getItem error: ${err}`);
    })
  }

  saveState = (update) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(update)).then((item) => {
      console.log("saveState:", update);
      this.setState(update);
    }).catch((err) => {
      console.log(`setItem error: ${err}`);
    });
  }

  onButtonPress = () => {
    let turn = this.state.turn
    if (turn >= this.state.totalTurns) {
      turn = 1
    } else {
      turn += 1
    }
    console.log(`next turn: ${turn}`);
    this.saveState(Object.assign(this.state, {turn: turn}));
  }

  render() {
    let textStyle, boxStyle, buttonText;
    if (this.state.turn == 1) {
      textStyle = styles.lightText;
      boxStyle = styles.darkBox;
      buttonText = 'My Turn'
    } else {
      textStyle = styles.darkText;
      boxStyle = styles.lightBox;
      buttonText = 'Your Turn'
    }
    console.log(`It's ${buttonText}.`);

    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <View style={[styles.boxRow]}>
          <Text style={[styles.lightText, { borderBottomWidth: 11 }]}>
            {"It's..."}
          </Text>
          <View style={[styles.box, boxStyle]}>
            <Button title={buttonText} onPress={this.onButtonPress} />
          </View>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 50,
    width: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightText: { fontWeight: 'bold', fontSize: 22, color: 'white' },
  lightBox: { backgroundColor: 'white' },
  darkText: { fontWeight: 'bold', fontSize: 22, color: 'red' },
  darkBox: { backgroundColor: 'red' }
});
