import React from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native'
import NotesList from './src/NotesList'

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>test</Text> */}
      <NotesList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
