import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export default function App() {
  const [url, setUrl] = useState("")
  const [name, setName] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Short
        <Text style={{ color: "#1076f7" }}>Link</Text>
      </Text>
      <TextInput
        style={styles.urlInput}
        onChangeText={(texto) => setUrl(texto)}
        value={url}
        placeholder="Digite a URL..."></TextInput>
      <TextInput
      style={styles.urlInput}
      onChangeText={ (texto) => setName(texto)}
      value={name}
      placeholder="Nome personalizado"
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: "#21243d",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20
  },
  urlInput: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fafafa",
    marginBottom: 20,
    fontSize: 20,
  }
})
