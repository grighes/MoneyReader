import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import { TfImageRecognition } from 'react-native-tensorflow';
import myModel from './assets/tensorflow_inception_graph.pb';
import myLabels from './assets/tensorflow_labels.txt';
import moneyImage from './assets/vintereais.jpg';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: null
    }
    this.state = { loaded: false }
    this.recognizeImage = this.recognizeImage.bind(this);
  }

  componentDidMount() {
  }
  recognizeImage = async () => {
    try {
      alert('recognizeImage1');
      const tfImageRecognition = new TfImageRecognition({
        model: myModel,
        labels: myLabels
      })
      
      const results = await tfImageRecognition.recognize({
        image: moneyImage
      })

      const resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`
      this.setState({ result: resultText })

      await tfImageRecognition.close()

    } catch (err) {
      alert(err)
    }
  }

  _onLoad = () => {
    console.warn('onload1');
    this.recognizeImage();
    this.setState(() => ({ loaded: true }))
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>{this.recognizeImage().toString()}</Text> */}
        <WebView  onLoad={this._onLoad} >
          <Text>Results: </Text>
          {!this.state.loaded ? <Text>{this.state.result}</Text> : <Text>no results</Text>}
        </WebView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
