import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar,
  Share,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';

const NoteInputModal = ({ visible, onClose, onSubmit, note }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [result, setResult] = useState([]);
  const [desc, setDesc] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    console.log('Speech has started', e);
    setStarted('Listening...');
  };

  const onSpeechEnd = (e) => {
    console.log('Speech has ended', e);
    setEnded('Stop Listening...');
  };

  const onSpeechResults = (event) => {
    console.log('onSpeechResults:', event.value);
    setResult(event.value); // Assuming event.value is the array of strings
    if (event.value && event.value.length > 0) {
      setDesc(event.value.join(' ')); // Update description with the spoken text
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-Us');
      setStarted('');
      setEnded('');
      setResult([]);
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
      setStarted('');
      setEnded('');
      setResult([]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const loadBookmarkState = async () => {
      try {
        const value = await AsyncStorage.getItem('bookmarkState');
        if (value !== null) {
          setIsBookmarked(JSON.parse(value));
        }
      } catch (error) {
        console.error('Failed to load the bookmark state', error);
      }
    };

    loadBookmarkState();
    if (note) {
      setTitle(note.title);
      setDesc(note.desc);
    } else {
      setTitle('');
      setDesc('');
    }
  }, [note]);

  const toggleBookmark = async () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    try {
      let allNotes = await AsyncStorage.getItem('notes');
      allNotes = allNotes ? JSON.parse(allNotes) : [];
      const updatedNotes = allNotes.map((n) =>
        n.id === note.id ? { ...n, isBookmarked: newBookmarkState } : n
      );
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to save the bookmark state', error);
    }
  };

  const handleTitleChange = (text) => setTitle(text);
  const handleDescChange = (text) => setDesc(text);
  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    onSubmit(title, desc, note ? note.id : null);
    setTitle('');
    setDesc('');
    onClose();
  };

  const shareNote = () => {
    Share.share({
      message: `TITLE: ${title}\n${desc}`,
      title: 'Share AuraNote',
    });
  };

  return (
    <>
      <StatusBar />
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => navigation.push('notescreen')}
                style={styles.iconButton}
              >
                <MaterialIcons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.headerRightButtons}>
                <TouchableOpacity
                  onPress={shareNote} // Call the shareNote function on press
                  style={styles.iconButton}
                >
                  <MaterialIcons name="share" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleBookmark}
                  style={[
                    styles.iconButton,
                    isBookmarked ? styles.bookmark : {},
                  ]}
                >
                  <MaterialIcons name="bookmark" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              value={title}
              style={styles.titleInput}
              onChangeText={handleTitleChange}
              placeholder="Title"
              placeholderTextColor="#643848"
            />
            <View style={styles.actionButtonContainerWrapper}></View>
            <View style={styles.descInputContainer}>
              <TextInput
                value={desc}
                style={styles.descInput}
                multiline
                placeholder="Note"
                placeholderTextColor="#643848"
                onChangeText={handleDescChange}
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  styles.largeIconButton,
                  styles.blackButton,
                ]}
                onPress={handleSubmit}
              >
                <MaterialIcons name="check" size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  styles.largeIconButton,
                  styles.blackButton,
                ]}
                onPress={() => {
                  startRecognizing();
                }}
              >
                <MaterialIcons name="mic" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconButton,
                  styles.largeIconButton,
                  styles.blackButton,
                ]}
                onPress={() => {
                  stopRecognizing();
                }}
              >
                <MaterialIcons name="mic-off" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bookmark: {
    backgroundColor: '#f1c232',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(253, 240, 209, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 0.9, // Reduce the flex to make the modal smaller
    width: '95%', // Reduce width to make it less wide
    backgroundColor: '#fdf0d1',
    borderRadius: 20, // Optional: add borderRadius for aesthetics
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRightButtons: {
    flexDirection: 'row',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  blackButton: {
    backgroundColor: '#000',
  },
  largeIconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#643848',
  },
  wordCount: {
    fontSize: 16,
    color: '#643848',
    marginBottom: 20,
  },
  actionButtonContainerWrapper: {
    marginBottom: 20,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  descInputContainer: {
    flex: 1,
    marginBottom: 10, // Reduced from 20
    borderWidth: 1,
    borderColor: '#643848',
    borderRadius: 10,
  },
  descInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});

export default NoteInputModal;
