import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';
import { CheckBox } from 'react-native-elements';

const Video = ({number, title, id}) => {
    const [checked, setChecked] = useState(false);
  return (
    <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.videoTitleHeading}>Lecture {number}: 
            <Text style={styles.videoTitleSubheading}> {title} </Text>
          </Text>
        </View>
        <View style={{alignSelf: 'center', marginBottom: 15}}>
          <YoutubeIframe
            height={230}
            width={400}
            play={false}
            videoId={id}
          />
        </View>
        {/* <View style={{alignSelf: 'center', marginBottom: 5}}>
          <CheckBox
              title="Completed"
              checked={checked}
              onPress={() => setChecked(!checked)}
              containerStyle={styles.checkBoxContainer}
            />
        </View> */}
    </ScrollView>
  )
}

export default Video

const styles = StyleSheet.create({
    titleContainer: {
      marginBottom: 12,
    },
    videoTitleHeading: {
      fontSize: 17,
      color: 'darkred',
      fontWeight: 'bold'
    },
    videoTitleSubheading: {
      fontSize: 17,
      color: 'black',
      fontWeight: 'normal',
    }
  });

