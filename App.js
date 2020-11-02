import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Clipboard from "@react-native-community/clipboard"

export default function App() {
  const [url, setUrl] = useState("")
  const [name, setName] = useState("")
  const [urlFinal, setUrlFinal] = useState("")

  const short = async () => {
    Keyboard.dismiss()

    if (url.includes("https://") || url.includes("http://")) {//verificando se existe o https dentro da url digitada
      await fetch(`https://cutt.ly/api/api.php?key=f10b62deef7b35ec538cf1ca843888cd36f2f&short=${url}&name=${name}`)
        .then(async response => {
          const data = await response.json()

          if (data.url.status === 3) {
            alert("Esse nome já está em uso")
            return
          }
          if (data.url.status === 2) {
            alert("URL inválida!")
            return
          }

          setUrlFinal(data.url.shortLink)
        })
      return
    }

    alert("URL inválida!")
  }

  function copyUrl() {
    Clipboard.setString(urlFinal)
    alert("Copiado com sucesso!")
  }

  return (
    //TouchableWithoutFeedback para fechar o teclado quando clica fora do input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          onChangeText={(texto) => setName(texto)}
          value={name}
          placeholder="Nome personalizado"
        ></TextInput>

        <TouchableOpacity onPress={() => short()} style={styles.shortBtn}>
          <Text style={{ color: "#FFF" }}>Encurtar</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback onPress={urlFinal ? copyUrl : () => { }}>
          <Text style={styles.finalUrl}>{urlFinal}</Text>
        </TouchableWithoutFeedback>

      </View>
    </TouchableWithoutFeedback>
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
    borderColor: "#21243d",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fafafa",
    marginBottom: 20,
    fontSize: 20,
  },
  shortBtn: {
    backgroundColor: "#ff7c7c",
    borderRadius: 20,
    height: 40,
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  finalUrl: {
    height: 40,
    width: "80%",
    marginTop: 20,
    fontSize: 20,
    textAlign: "center"
  }
})
