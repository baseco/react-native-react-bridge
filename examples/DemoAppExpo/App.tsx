import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import WebView from "react-native-webview";
import { useBridge } from "react-native-react-bridge";
import webApp from "./WebApp";

export default function App() {
  const [data, setData] = useState("This is React Native");
  const { ref, source, onMessage, emit } = useBridge<string>(
    webApp,
    (message) => {
      if (message.type === "hi") {
        setData(message.data);
      }
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <WebView ref={ref} source={source} onMessage={onMessage} />
      </View>
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setData(text)}
          value={data}
        />
        <Pressable
          onPress={() => emit({ type: "hello", data: data })}
          style={styles.button}
        >
          <Text>send to Web</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    borderWidth: 4,
    borderColor: "gray",
  },
  bottom: {
    padding: 4,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: "lightgray",
  },
});
