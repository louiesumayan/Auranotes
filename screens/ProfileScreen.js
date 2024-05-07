import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import profilePic from '../assets/images/profile.png'; // Adjust the path as necessary
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => {
  const [localNoteCount, setLocalNoteCount] = useState(0);
  const [localBookmarkCount, setLocalBookmarkCount] = useState(0);

  useEffect(() => {
    if (route.params?.noteCount !== undefined) {
      setLocalNoteCount(route.params.noteCount);
    }
    if (route.params?.bookmarkCount !== undefined) {
      // Get bookmark count from params
      setLocalBookmarkCount(route.params.bookmarkCount);
    }
  }, [route.params]);

  const navigation = useNavigation(); // Hook to access navigation object
  const Logout = async () => {
    await signOut(auth);
  };

  const { user } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Navigate back on press
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={24} color="#643848" />
      </TouchableOpacity>
      <View style={styles.ProfileContainer}>
        <Image source={profilePic} style={styles.profilePic} />
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.title}>Professional React Developer</Text>
      </View>
      <View style={styles.activitiesContainer}>
        <Text style={styles.activitiesTitle}>ACTIVITIES</Text>
        <View style={styles.activityItems}>
          <View style={styles.activityItem}>
            <MaterialIcons name="note" size={24} color="black" />
            <Text style={styles.activityText}>NOTE</Text>
            <Text style={styles.activityText}>{localNoteCount}</Text>
          </View>
          <View style={styles.activityItem}>
            <MaterialIcons name="bookmark" size={24} color="black" />
            <Text style={styles.activityText}>BOOKMARK</Text>
            <Text style={styles.activityText}>{localBookmarkCount}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={Logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fdf0d1',
  },
  ProfileContainer: {
    alignItems: 'center',
    backgroundColor: '#f7d88f',
    width: '100%',
    padding: 35,
    borderBottomLeftRadius: 50, // Adds 50px radius to the Bottom-left corner
    borderBottomRightRadius: 50, // Adds 50px radius to the Bottom-right corner
  },
  backButton: {
    position: 'absolute', // Positioning it at the top-left
    top: 50, // Distance from the top
    left: 20, // Distance from the left
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    color: '#643848',
    marginBottom: 5,
    fontWeight: 'bold', // Add if you need the email to be bold
  },
  activitiesContainer: {
    width: '95%', // Reduce from 80% if needed
    alignItems: 'center',
    backgroundColor: '#ffffff', // Add background color if needed
    borderRadius: 10, // Add border radius for rounded corners
    padding: 20, // Add padding inside the container
    shadowColor: '#000', // Adding shadow for elevation effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#643848',
    marginBottom: 10,
  },
  activityItems: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingTop: 20, // Padding to space out the icons from the title
  },
  activityItem: {
    alignItems: 'center',
    flex: 1, // Ensures equal spacing
  },
  activityText: {
    fontSize: 16,
    color: '#643848',
    marginTop: 5, // Space between the icon and number
  },
  logoutButton: {
    backgroundColor: '#643848',
    paddingVertical: 12, // Increase vertical padding
    paddingHorizontal: 30, // Increase horizontal padding for a wider button
    borderRadius: 30, // More pronounced rounded corners
    marginTop: 20, // Add space above the button if necessary
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold', // Ensure text is bold
  },
});

export default ProfileScreen;
