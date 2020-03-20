import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground } from "react-native";
import Forecast from './Forecast';
import OpenWeatherMap from "./open_weather_map";
import Button from "./PressDemo"
import PanResponderExample from "./panResponder";

class WeatherProject extends Component {

constructor(props) {
    super(props);
    this.state = {  zip: "",
                    forecast: {temp: 50}
                  };
    this._handleTextChange=this._handleTextChange.bind('this');
    this.imageUrl = {
      sunny: require('./frozen.jpg'),
      frozen: require('./raining.jpg'),
      raining: require('./sunny.jpg')
    }
    }


    _handleTextChange = event => {
      let zip = event.nativeEvent.text;
      if(zip.length === 5){
      OpenWeatherMap.fetchForecast(zip).then(forecast => {
        console.log(forecast);
        this.setState({zip: zip, 
          forecast : forecast});
      })     
    } else {
      alert('Please introduce a five digits valid zipcode')
    }
  };
  

    render(){

      let content = null;
      if (this.state.forecast !== null){
        content = (
          <Forecast
            main={this.state.forecast.main}    
            description={this.state.forecast.description}
            temp={this.state.forecast.temp}
          />
        );
      }


      return(
       
        <View style={styles.container}>
        
            <PanResponderExample/>
          
        </View>
      );
    }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30
        },
    backdrop: {
      flex: 1, 
      flexDirection: "column",
      width: 700 
    }, 
    overlay: {
      flex: 1, 
      backgroundColor: '#000000',
      opacity: 0.5,
      flexDirection: "column", 
      alignItems: "center",
      },
    row: {
      flexDirection: "column",
      flexWrap: "nowrap",
      alignItems: "flex-start", 
      padding: 30
      },
    zipContainer: {
      height: 50,
      borderBottomColor: "#DDDDDD",
      borderBottomWidth: 1,
      marginLeft: 5,
      marginTop: 3
    },
    zipCode: { 
      flex: 1, 
      flexBasis: 1, 
      width: 50, 
    },
    mainText: {
      fontSize: baseFontSize, 
      color: "#FFFFFF"
    }
    });

    export default WeatherProject;