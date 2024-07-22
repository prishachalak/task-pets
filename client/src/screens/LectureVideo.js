import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Video from '../components/Video';

const LectureVideo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Lecture Videos</Text>
        </View>
        <Video number={1} title='Introduction to Java' id = 'bm0OyhwFDuY'/>
        <Video number={2} title='Java Development Kit' id = 'WRISYpKhIrc'/>
        <Video number={3} title='First Code in Java' id = 'tSqNBjGacYk'/>
        <Video number={4} title='How Java Works' id = 'NHrsLjhjmi4'/>
        <Video number={5} title='Variables in Java' id = '9RCuKrze_-k'/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LectureVideo

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'flex-start', // Align items to the start to avoid centering
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});


