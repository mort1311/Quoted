import { StyleSheet } from "react-native"

export const DreamyBrownTheme = StyleSheet.create({
  modal: {
    backgroundColor: '#faae7b',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#9f6976'
  },
  title: {
    fontWeight: "bold"
  },
  bookIcon: {
    width: 600,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  bookItemContainer: {
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faae7b',
    paddingBottom: 10,
    paddingTop: 10
  },
  bookContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconTextInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addButton: {
    alignSelf: 'center',
    bottom: 20,
    width: 60,
    position: 'absolute',
    height: 60,
    borderRadius: 30,
    backgroundColor: '#432371'
  },
  optionsButton: {
    backgroundColor: 'transparent',
    width: 60,
    height: 50
  },
  emptyScrollView: {
    height: 100
  },
  bookTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20
  },
  bookAuthor: {
    color: 'black',
    fontWeight: '300',
    fontSize: 13
  },
  emptyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  emptyView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: { color: 'black' },
  bookIconColor: {
    color: 'white',
  },
  headerColor: {
    color: '#714674'
  },
  gradientColor1: {
    color: '#cc8b79'
  },
  gradientColor2: {
    color: '#714674'
  }
})

export const LightTheme = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'lightgrey'
  },
  title: {
    fontWeight: "bold"
  },
  bookIcon: {
    width: 600,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  bookItemContainer: {
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 10
  },
  bookContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconTextInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  optionsButton: {
    backgroundColor: 'transparent',
    width: 60,
    height: 50
  },
  emptyScrollView: {
    height: 100
  },
  bookTitle: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 20
  },
  bookAuthor: {
    color: 'black',
    fontWeight: '300',
    fontSize: 13
  },
  emptyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  emptyView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: { color: 'black' },
  bookIconColor: {
    color: 'tomato',
  },
  headerColor: {
    color: 'white'
  },
  gradientColor1: {
    color: 'white'
  },
  gradientColor2: {
    color: 'lightgrey'
  }
})