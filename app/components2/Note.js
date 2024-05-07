import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure this import is added

const { width } = Dimensions.get('window');

const Note = ({
  item,
  onPress,
  onPressEdit,
  onPressDelete,
  onPressBookmark,
}) => {
  const { title, desc, isBookmarked } = item; // Destructure isBookmarked from item

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {desc}
        </Text>
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => onPressEdit(item)}>
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressBookmark(item)}>
          <MaterialIcons
            name="bookmark"
            size={24}
            color={isBookmarked ? 'gold' : 'grey'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressDelete(item)}
          style={styles.deleteIcon}
        >
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdf0d1',
    width: '95%', // Slightly less width for better margin
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#643848',
    elevation: 2,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure space between text and icons
    alignSelf: 'center', // Center the note container
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#643848',
  },
  description: {
    color: '#643848',
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Ensure icons are not too spread out
  },
  deleteIcon: {
    marginLeft: 16,
  },
});

export default Note;
