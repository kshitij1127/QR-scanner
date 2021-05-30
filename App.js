import * as React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Image } from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }

  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.button;
    
    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned()}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      console.log(buttonState)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.displayText}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : "Request Camera Permission"}
          </Text>
          <Image 
          style={styles.image}
          source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg'
          }}
          />
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermission}
            title="bar code scanner"
          >
            <Text syle={styles.displayText}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  displayText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },

  scanButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    margin: 10,
  },

  image: {
      width: 150,
      height: 150,
      marginLeft: 95,
      marginTop: 50
  }
});
