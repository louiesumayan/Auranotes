import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import note from './Note';

const NoteInputModal = ({ visible, onClose, onSubmit, note }) => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
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
      await AsyncStorage.setItem(
        'bookmarkState',
        JSON.stringify(newBookmarkState)
      );
    } catch (error) {
      console.error('Failed to save the bookmark state', error);
    }
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescChange = (text) => {
    setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    onSubmit(title, desc, note ? note.id : null); // Pass the id back to the onSubmit
    setTitle('');
    setDesc('');
    onClose();
  };

  const closeModal = () => {
    setTitle('');
    setDesc('');
    onClose();
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
                <TouchableOpacity style={styles.iconButton}>
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
            <View style={styles.actionButtonContainerWrapper}>
              <View style={styles.actionButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.iconButton,
                    styles.largeIconButton,
                    styles.blackButton,
                  ]}
                >
                  <MaterialIcons name="content-cut" size={28} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.iconButton,
                    styles.largeIconButton,
                    styles.blackButton,
                  ]}
                >
                  <MaterialIcons name="content-paste" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
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
              >
                <MaterialIcons name="mic" size={24} color="#fff" />
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
