import { useState, useEffect } from 'react'

import NoteDetails from './NoteDetails'

import {
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default NoteList = ({}) => {
  //read file
  const [note, selectNote] = useState({
    index: null,
    category: '',
    client: '',
    contents: '',
  })
  const [notes, setNotes] = useState([])
  const [noteModalVisible, setNoteModalVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const notesData = await AsyncStorage.getItem('notes')
      if (!notesData) console.log('failed to load notes or none exist')
      else setNotes(JSON.parse(notesData))
    }
    fetchData()
  }, [])

  //write file func
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notes))
        selectNote({
          index: null,
          category: '',
          client: '',
          contents: '',
        })
        console.log(notes)
      } catch (error) {
        console.log('failed to save notes')
      }
    }
    saveData()
  }, [notes])

  const NoteItem = ({ index, category, client, contents }) => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: '#BBB',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: '#BBB',
          }}
        >
          <Text style={{ color: 'red' }}>{category}</Text>
          <Text style={{ color: 'green' }}>{client}</Text>
        </View>
        <Text style={{ color: 'black' }}>{contents}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            selectNote({ index, category, client, contents })
            setNoteModalVisible(!noteModalVisible)
          }}
        >
          <Text style={styles.textStyle}>Edit Note</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            console.log('ind', index)
            console.log('before', notes)
            console.log(
              'after',
              notes.filter((_note, noteIndex) => noteIndex !== index)
            )
            setNotes(notes.filter((_note, noteIndex) => noteIndex !== index))
          }}
        >
          <Text style={styles.textStyle}>Delete Note</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {notes?.length > 0 && (
        <View
          style={{
            width: '100%',
            backgroundColor: '#BBB',
          }}
        >
          <Text style={{ color: '#000' }}>Notes: </Text>
          <FlatList
            data={notes}
            renderItem={({ item, index }) => (
              <NoteItem
                index={index}
                category={item.category}
                client={item.client}
                contents={item.contents}
              />
            )}
            keyExtractor={(_item, itemIndex) => itemIndex}
          />
        </View>
      )}
      {notes?.length === 0 && (
        <View>
          <Text style={{ color: '#000' }}>No notes available</Text>
        </View>
      )}
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setNoteModalVisible(!noteModalVisible)}
      >
        <Text style={styles.textStyle}>Create Note</Text>
      </Pressable>
      <Modal
        animationType='slide'
        transparent={true}
        visible={noteModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setNoteModalVisible(!noteModalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {note.index === null ? 'Create' : 'Edit'} Note
            </Text>
            <NoteDetails note={note} onSetNote={selectNote} />
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                disabled={!note.contents || !note.category || !note.client}
                onPress={() => {
                  setNoteModalVisible(!noteModalVisible)
                  const { index, category, client, contents } = note
                  console.log('note', note)
                  if (index === null)
                    setNotes([...notes, { category, client, contents }])
                  else {
                    const updatedNotes = notes.map((item, itemIndex) =>
                      itemIndex === index
                        ? { category, client, contents }
                        : item
                    )
                    setNotes(updatedNotes)
                  }
                }}
              >
                <Text style={styles.textStyle}>Save Note</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setNoteModalVisible(!noteModalVisible)
                  selectNote({
                    index: null,
                    category: '',
                    client: '',
                    contents: '',
                  })
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
