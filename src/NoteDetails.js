import { View, Text, TextInput } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import data from '../data.json'
export default NotesDetail = ({ note, onSetNote }) => {
  return (
    <View>
      <Text>Category</Text>
      <SelectDropdown
        data={data.categories}
        searchPlaceHolder='Select Category'
        defaultValue={note.category ? note.category : null}
        onSelect={(value) => onSetNote({ ...note, category: value })}
      />
      <Text>Client</Text>
      <SelectDropdown
        data={data.clients}
        searchPlaceHolder='Select Client'
        defaultValue={note.client ? note.client : null}
        onSelect={(value) => onSetNote({ ...note, client: value })}
      />
      <Text>contents</Text>
      <View
        style={{
          width: 200,
          backgroundColor: 'white',
          borderRadius: 1,
          borderStyle: 'solid',
          borderColor: 'red',
        }}
      >
        <TextInput
          style={{
            color: '#000',
          }}
          value={note.contents}
          onChangeText={(value) => {
            onSetNote({ ...note, contents: value })
          }}
        />
      </View>
    </View>
  )
}
