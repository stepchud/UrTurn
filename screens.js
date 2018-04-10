import React from 'react';

import {
  Text,
  Button,
  View,
  AsyncStorage,
} from 'react-native';

import Const from './constants';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: "UrTurn"
  }

  constructor(props) {
    super(props);
    this.initializeTurnState();
  }

  state = {
    totalTurns: 2,
    turn: 1
  }

  initializeTurnState = () => {
    AsyncStorage.getItem(Const.StorageKey).then((item) => {
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
    AsyncStorage.setItem(Const.StorageKey, JSON.stringify(update)).then((item) => {
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
    this.saveState({...this.state, turn: turn});
  }

  render() {
    const styles = Const.Styles;
    let boxStyle, buttonText;
    if (this.state.turn == 1) {
      boxStyle = styles.darkBox;
      buttonText = 'My Turn'
    } else {
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

class SettingsScreen extends React.Component {
  render() {
    return <View style={{flex: 1, backgroundColor: 'blue'}} />
  }
}

export { HomeScreen, SettingsScreen }
