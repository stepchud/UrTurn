import { StyleSheet } from 'react-native'

export default Const = {
  StorageKey: '@MyState:currentTurn',
  Styles: StyleSheet.create({
    boxRow: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      height: 50,
      width: 150,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lightText: { fontWeight: '900', fontSize: 22, color: 'white' },
    lightBox: { backgroundColor: 'burlywood' },
    darkText: { fontWeight: '900', fontSize: 22, color: 'red' },
    darkBox: { backgroundColor: 'coral' }
  }),
}
