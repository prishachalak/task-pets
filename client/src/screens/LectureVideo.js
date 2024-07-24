import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Video from '../components/Video';

const LectureVideo = () => {

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
      <ScrollView contentContainerStyle={{
        padding: 20,
        alignItems: 'flex-start', 
      }}>
        <View style={{marginBottom: 15}}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Lecture Videos</Text>
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



