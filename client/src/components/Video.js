import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';

const Video = ({number, title, id}) => {
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

