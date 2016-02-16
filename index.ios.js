/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var ScrollView = require('./ScrollView.js');
var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;
var  {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  TextInput,
  AlertIOS,
  TouchableOpacity,
  View
} = React;

class ScrollViewSample extends Component {

  constructor (props, context){
      super(props, context)

      this.state = {
        username: '',
        password: '',
        dynamicButtonName:'Save',
        keyboardSpace: 0
      }

    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  updateKeyboardSpace(frames) {
     this.setState({keyboardSpace: frames.end.height});
   }

   resetKeyboardSpace() {
     this.setState({keyboardSpace: 0});
   }

   componentDidMount() {
     KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
     KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
   }

   componentWillUnmount() {
     KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
     KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
   }

  Login(){
    this.setState({dynamicButtonName:'Update'});
    alert(this.state.username);
  }

  // Scroll a component into view. Just pass the component ref string.
inputFocused (refName) {
  setTimeout(() => {
    let scrollResponder = this.refs.scrollView.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.refs[refName]),
      110, //additionalOffset
      true
    );
  }, 50);
}

  render() {
    // scrollView
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer} >
        <View style={{height: this.state.keyboardSpace}}>
        <Text style={styles.labelText}>Username:</Text>
        <TextInput style={styles.textField} placeholder="username"  onChangeText ={(text) => this.setState({username: text})}/>
        </View>
        <View style={styles.viewScrollView}>
        <Text style={styles.labelText}>Password: </Text>
        <TextInput style= {styles.textField} placeholder="password" onChangeText = {(text) => this.setState({password: text})} onFocus={this.inputFocused.bind(this, 'password' )}/>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.Login()}>
          <Text style={styles.buttonText}>{this.state.dynamicButtonName}</Text>
        </TouchableHighlight>

        </ScrollView>
      </View>
  );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5FCFF',
  },

  viewScrollView: {
    //alignItems: 'center'
    flexDirection:'row',
    flex: 10,
    paddingTop: 20,
    paddingBottom: 20
  },

  contentContainer: {
    //alignItems: 'center',
    //alignSelf:'center',
     paddingVertical: 300,
     backgroundColor: 'white',
  },
  textField: {
    alignItems:'center',
    width: 200,
    margin: 5,
    height: 30,
    fontSize: 12,
    borderWidth: 1
  },
  button: {
    padding: 10,
    width: 200,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'yellow',
    margin: 50
  },
  buttonText: {
    textAlign:'center',
  },
  labelText: {
    paddingTop:10
  }
});

AppRegistry.registerComponent('ScrollViewSample', () => ScrollViewSample);
