import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useNavigation } from '@react-navigation/native';

const QuestPage = () => {
  const [quests, setQuests] = useState([
    { id: 1, title: 'Quest 1', description: 'Read the first chapter and complete the quiz to earn 100 points.', progress: 50, completed: false },
    { id: 2, title: 'Quest 2', description: 'Watch the lecture video and take notes to earn 50 points.', progress: 20, completed: false },
  ]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const navigation = useNavigation();

  const markAsCompleted = (id) => {
    setQuests(quests.map(quest =>
      quest.id === id ? { ...quest, progress: 100, completed: true } : quest
    ));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleQuestPress = (id) => {
    setSelectedQuest(quests.find(quest => quest.id === id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievement Quests</Text>
      <ScrollView contentContainerStyle={styles.questList}>
        {quests.map((quest, index) => (
          <Animatable.View
            key={quest.id}
            style={styles.quest}
            animation="fadeInUp"
            duration={1000}
            delay={index * 200}
          >
            <TouchableOpacity style={styles.questContent} onPress={() => handleQuestPress(quest.id)}>
              <LinearGradient
                colors={['#ff9a9e', '#fad0c4']}
                style={styles.questBackground}
              >
                <Icon name={quest.completed ? 'check-circle' : 'circle-o'} size={30} color={quest.completed ? '#4caf50' : '#ccc'} />
                <Text style={styles.questTitle}>{quest.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
      {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
      <Modal visible={!!selectedQuest} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedQuest && (
              <>
                <Text style={styles.modalTitle}>{selectedQuest.title}</Text>
                <Text style={styles.modalDescription}>{selectedQuest.description}</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progress, { width: `${selectedQuest.progress}%` }]}>
                    <Text style={styles.progressText}>{selectedQuest.progress}%</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.button, selectedQuest.completed && styles.buttonDisabled]}
                  onPress={() => {
                    markAsCompleted(selectedQuest.id);
                    setSelectedQuest(null);
                  }}
                  disabled={selectedQuest.completed}
                >
                  <Text style={styles.buttonText}>{selectedQuest.completed ? 'Completed' : 'Mark as Completed'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setSelectedQuest(null);
                    navigation.navigate('Quiz');
                  }}
                >
                  <Text style={styles.buttonText}>Take Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedQuest(null)}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  questList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  quest: {
    width: '45%',
    marginVertical: 10,
  },
  questContent: {
    alignItems: 'center',
  },
  questBackground: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBar: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    height: 20,
    marginBottom: 15,
    width: '100%',
  },
  progress: {
    backgroundColor: '#4caf50',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ff6666',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
});

export default QuestPage;
