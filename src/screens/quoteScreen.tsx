import { Button, Modal } from 'native-base'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
// import { launchImageLibrary } from 'react-native-image-picker';
// import TextRecognition from 'react-native-text-recognition'
// import { RNCamera } from 'react-native-camera'
// import { useCamera } from 'react-native-camera-hooks'
// import ImagePicker from 'react-native-image-crop-picker';
import Header from '../components/Header';
import { useQuotes } from '../hooks/useQuotes'
import { v4 as uuid } from 'uuid';
import { Quote } from '../models/models';
import { updateBookOperation } from '../operations/bookOperations/book-operations';
import { updateQuote } from '../operations/quoteOperations/quote-operations';

const QuoteScreen = ({ navigation, route }: any) => {

  const book = route.params.book;

  const {quotes, addQuote, deleteQuote, updateQuote} = useQuotes(route.params.book)

  const [isOptionsEnabled, setIsOptionsEnabled] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<Quote>({id:'', quote:'', person: ''})

  const [inputQuote, setInputQuote] = useState({quote: '', person: ''})
  const [isModalOpened, setIsModalOpened] = useState(false)

  const [isEditing, setIsEditing] = useState(false)

  const emptyQuote = {quote: '', person: ''}

  const [isCameraActive, setIsCameraActive] = useState(false)

  const [isTextLoading, setIsTextLoading] = useState(false)
  const [isJustOpened, setIsJustOpened] = useState(false)



  return (

    

    <LinearGradient colors={['#cc8b79', '#714674']} style={styles.mainContainer}>
      <Header navigation={navigation} isBackButtonShown={true} title='Quotes' />
      <ScrollView>
        <Button onPress={()=>{navigation.goBack()}}>goback</Button>
        {book &&
          <View>
            <LinearGradient colors={['#714674', '#cc8b79']} style={styles.bookView}>
              {/* <View style={styles.bookIcon}><Icon name='book' size={90} color="white" /></View> */}
              <Image style={{width: 80, height: 80}} source={require('../assets/demobook/demobook-gif.gif')}/>
              <Text style={styles.bookTitle}>{book.name}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
            </LinearGradient>
            <View>
              {quotes && quotes?.map((q: any, index: number) => {
                return (
                  <TouchableOpacity 
                  onLongPress={() => {
                    isOptionsEnabled ?
                      currentQuote === q && setIsOptionsEnabled(false)
                      :
                      setIsOptionsEnabled(true)
                    setCurrentQuote(q)

                  }}
                    onPress={() => {
                      // setIsPreviewModalOpened(true)
                      setCurrentQuote(q)
                    }}
                    delayLongPress={300}
                    key={index}
                    style={styles.quoteContainer}
                  >

                    {q.quote !== '' && <Text style={styles.smallText}>{q.quote}</Text>}
                    <View style={styles.titleView}>
                      {q.title !== '' && <Text style={{ color: 'black' }}>- {q.person}</Text>}
                    </View>
                    {isOptionsEnabled && currentQuote.id === q.id &&

                      <View style={styles.optionsView}>

                        <Button
                          onPress={() => {
                            

                            setInputQuote({quote: q.quote, person: q.person})

                      

                            setIsEditing(true)
                            setIsModalOpened(true)

                          }}
                          style={styles.optionsButton}><Icon name='pencil' size={25} color="white" /></Button>
                        <Button
                          onPress={() => {
                            deleteQuote(q.id)
                            setIsOptionsEnabled(false)
                          }}
                          style={styles.optionsButton}><Icon name='trash' size={25} color="white" /></Button>
                      </View>}
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        }

        <Modal closeOnOverlayClick={true} isOpen={isModalOpened}>
          <Modal.Content>
            <View style={styles.modal}>
              <View>
                <View style={styles.iconTextInput}>
                  <Icon name='chatbox-sharp' size={25} color="white" style={styles.quoteIcon} />
                  {
                    isTextLoading &&
                    <View style={styles.spinnerView}>
                      <ActivityIndicator style={styles.spinner} size='large'></ActivityIndicator>
                    </View>}
                  <TextInput style={styles.quoteInputField} multiline={true} numberOfLines={15} placeholder={!isTextLoading ? 'Quote' : ''} value={inputQuote.quote} onChangeText={(quote) => setInputQuote({...inputQuote, quote:quote})}></TextInput>
                </View>

                <View style={styles.iconPersonTextInput}>
                  <Icon name='person' size={25} color="white" style={styles.quoteIcon} />
                  <TextInput style={styles.quoteInputField} placeholder='Who said it?' value={inputQuote.person} onChangeText={(person) => setInputQuote({...inputQuote, person: person})}></TextInput>
                </View>

                <View style={styles.flexRow}>

                  <Button
                    style={styles.modalButton}
                    // onPress={
                    //   () => {
                    //     openLibrary()
                    //   }
                    // }
                  ><Icon name='folder' size={25} color="white" /></Button>
                  <Button
                    style={styles.modalButton}
                    onPress={
                      () => {
                        setIsCameraActive(true)
                        setIsModalOpened(false)
                      }
                    }
                  ><Icon name='camera' size={25} color="white" /></Button>
                  <Button onPress={async () => {
                    if (inputQuote.quote !== '' || inputQuote.person !== '') {

                    
                      let newQuote = {quote: inputQuote.quote, person: inputQuote.person}
                      setIsModalOpened(false)

                      isEditing ?
                        await updateQuote({id: currentQuote.id, quote: inputQuote.quote, person: inputQuote.person})
                        :
                        await addQuote(newQuote)
                      setIsEditing(false)
             
                      setIsOptionsEnabled(false);
                 
                    
                      setInputQuote(emptyQuote)
                      
                    }
                  }}
                    style={styles.modalButton}>{
                    isEditing ? <Icon name='pencil' size={25} color="white" /> : <Icon name='checkmark-sharp' size={25} color="white" />}</Button>

                  <Button onPress={() => {
                    setIsModalOpened(false)
                    setInputQuote(emptyQuote)
                    setIsEditing(false)
                  }}
                    style={styles.modalButton}
                  ><Icon name='close' size={25} color="white" /></Button>
                </View>
               
              </View>
            </View>
          </Modal.Content>
        </Modal>

        {/* <Modal closeOnOverlayClick={true} isOpen={isPreviewModalOpened}>
          <Modal.Content>
            <View style={styles.modal}>
              <View>
                <ScrollView style={styles.quotePreviewScrollView}>
                  <Text style={styles.quoteInputField} >{currentQuote.quote}</Text>
                </ScrollView>
                <View style={styles.alignCenter}>
                  <Button onPress={() => {
                    setIsPreviewModalOpened(false)
                  }}
                    style={styles.modalButton}
                  ><Icon name='close' size={25} color="white" /></Button>
                </View>
              </View>
            </View>
          </Modal.Content>
        </Modal> */}

        <View style={styles.emptyScrollView}></View>
      </ScrollView>
      <View>
        <Button onPress={() => {
          setIsModalOpened(true)
        }}
          style={styles.addButton}
        ><Icon name='add' size={40} color="white" /></Button>

      </View>
      {/* {isCameraActive && !isTextLoading &&
        <RNCamera
          ref={cameraRef}
          captureAudio={false}
          style={styles.rnCamera}
        >
          <Button onPress={async () => {
            setIsJustOpened(true)
            let data
            try {
              data = await takePicture()
              setIsTextLoading(true)
              setCameraImage(data)
            } catch { console.log('Could not get data from takePicture') }
          }}
            style={styles.rnCameraPhotoButton}></Button>
        </RNCamera>

      } */}
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#faae7b',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  bookView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 5,
    paddingBottom: 15
  },
  quoteInputField: {
    textAlignVertical: 'top',
    fontWeight: '700',
    width: '87%',
    color: 'black'
  },
  optionsView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  quoteContainer: {
    backgroundColor: '#faae7b',
    margin: 5,
    padding: 20
  },
  addButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#432371'
  },
  mainContainer: {
    flex: 1
  },
  flexRow: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: 'transparent',
    width: '25%'
  },
  optionsButton: {
    backgroundColor: 'transparent',
    width: 60,
    height: 40
  },
  bookIcon: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  emptyScrollView: {
    height: 100
  },
  iconTextInput: {
    flexDirection: 'row',
    width: '100%',
    height: 300
  },
  iconPersonTextInput: {
    flexDirection: 'row',
    width: '100%',

  },
  quoteIcon: {
    top: 10
  },
  bookTitle: { color: 'white', fontWeight: 'bold', fontSize: 25 },
  bookAuthor: { color: 'white', fontWeight: '300', fontSize: 13 },
  alignCenter: {

    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  quotePreviewScrollView: {
    height: 300
  },
  smallText: { fontWeight: '700', color: 'black' },
  rnCamera: { position: 'absolute', flex: 1, width: '100%', height: '100%' },
  rnCameraPhotoButton: { position: 'absolute', bottom: 30, alignSelf: 'center', width: 50, height: 50, backgroundColor: 'lightgrey' },
  spinnerView: { width: '80%', justifyContent: 'center' },
  spinner: { position: 'absolute', bottom: 100, zIndex: 1, alignSelf: 'center' }

})

export default QuoteScreen