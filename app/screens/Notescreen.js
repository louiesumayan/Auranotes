import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteInputModal from '../components2/NoteInputModal';
import Note from '../components2/Note'; // Assuming you have a Note component
const Stack = createNativeStackNavigator();

const Notescreen = ({ user }) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const showAllNotes = () => {
    setShowBookmarkedOnly(false);
  };

  const showBookmarkedNotes = () => {
    setShowBookmarkedOnly(true);
  };

  const filteredNotes = showBookmarkedOnly
    ? notes.filter((note) => note.isBookmarked)
    : notes;

  const updateNoteCount = () => {
    navigation.setParams({ noteCount: notes.length });
  };

  const navigation = useNavigation();

  const updateNotes = async (updatedNotes) => {
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    // Update navigation parameters immediately after state update
    navigation.setParams({ noteCount: updatedNotes.length });
  };

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreet('Good Morning');
    else if (hrs < 17) setGreet('Good Afternoon');
    else setGreet('Good Evening');
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      const notesArray = JSON.parse(result);
      setNotes(notesArray);
      // Count how many are bookmarked
      const count = notesArray.filter((n) => n.isBookmarked).length;
      setBookmarkCount(count);
    }
  };

  const handleEditNote = (note) => {
    setCurrentNote(note); // Set the current note with all its data, including the id
    setModalVisible(true);
  };

  useEffect(() => {
    findGreet();
    findNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    updateNoteCount();
  };

  const handleOnSubmit = async (title, desc, id) => {
    let updatedNotes = [...notes];
    if (id) {
      updatedNotes = updatedNotes.map((note) =>
        note.id === id ? { ...note, title, desc } : note
      );
    } else {
      const newNote = { id: Date.now(), title, desc, time: Date.now() };
      updatedNotes.push(newNote);
    }
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    updateNoteCount();
    setCurrentNote(null);
    setModalVisible(false);
  };

  const handleBookmarkToggle = async (note) => {
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, isBookmarked: !n.isBookmarked } : n
    );
    setNotes(updatedNotes); // Update state
    setBookmarkCount(updatedNotes.filter((n) => n.isBookmarked).length); // Update bookmark count state
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)); // Update AsyncStorage
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fdf0d1" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() =>
                navigation.navigate('profile', {
                  user: user,
                  noteCount: notes.length,
                  bookmarkCount: bookmarkCount, // pass the bookmark count here
                })
              }
            >
              <MaterialIcons name="person" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.greeting}>Hello! , {user.email}</Text>
          </View>
          <Text style={styles.title}>My Notes</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScrollView}
          >
            <View>
              <View style={styles.filterContainer}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    !showBookmarkedOnly ? styles.firstChildFilter : {},
                    !showBookmarkedOnly ? styles.activeFilterButton : {},
                  ]}
                  onPress={showAllNotes}
                >
                  <Text
                    style={[
                      styles.filterText,
                      !showBookmarkedOnly ? styles.activeFilterText : {},
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    showBookmarkedOnly ? styles.activeFilterButton : {},
                  ]}
                  onPress={showBookmarkedNotes}
                >
                  <Text
                    style={[
                      styles.filterText,
                      showBookmarkedOnly ? styles.activeFilterText : {},
                    ]}
                  >
                    Bookmarked
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <FlatList
            data={filteredNotes}
            renderItem={({ item }) => (
              <Note
                item={item}
                onPress={() => console.log('Note pressed')}
                onPressEdit={() => handleEditNote(item)}
                onPressDelete={() => handleDeleteNote(item.id)}
                onPressBookmark={() => handleBookmarkToggle(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={[styles.fab, styles.addBtn]}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <NoteInputModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setCurrentNote(null); // Reset when the modal is closed
        }}
        onSubmit={handleOnSubmit}
        note={currentNote} // Pass the current note to the modal
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf0d1',
    alignItems: 'center', // Ensure that children are centered
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    width: '95%', // Set a specific width
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 10,
    paddingVertical: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold', // Changed from 'thin'
    color: '#643848',
    maxWidth: '100%', // Limit width to avoid overflow
  },
  title: {
    fontSize: 70, // Reduced for better fit
    color: 'black',
    marginLeft: 10,
    alignSelf: 'flex-start', // Center title in the available space
    marginBottom: 25,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#643848',
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 15,
  },
  filterScrollView: {
    width: '100%', // Ensure full width
  },
  activeFilterButton: {
    backgroundColor: '#643848',
  },
  activeFilterText: {
    color: '#fff',
  },
  filterText: {
    fontSize: 16,
    color: '#643848',
    fontWeight: 'bold',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center', // Ensure FABs are centered horizontally
    width: '100%', // Take full width to center content
  },
  fab: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#643848',
    borderRadius: 30,
    elevation: 4,
  },
  addBtn: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  micBtn: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoutBtnContainer: {
    position: 'absolute',
    bottom: 90,
    width: '100%', // Full width for easier centering
    justifyContent: 'center', // Center logout button
    paddingHorizontal: 20,
  },
  logoutText: {
    textAlign: 'center', // Center text within the button
  },
  menuButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 8,
  },
});

export default Notescreen;
