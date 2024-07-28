import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuestPage = ({ route }) => {
  const { userId } = route.params || {}; // Destructure userId from route.params

  useEffect(() => {
    console.log('Received route params:', route.params); // Debug log
    if (!userId) {
      console.error("No userId provided");
    }
  }, [route.params]);

  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Quest 1",
      description: "Read the first chapter and complete the quiz.",
      attempts: [],
      bestScore: 0,
      maxScore: 3,
    },
    {
      id: 2,
      title: "Quest 2",
      description: "Read the second chapter and complete the quiz.",
      attempts: [],
      bestScore: 0,
      maxScore: 3,
    },
    {
      id: 3,
      title: "Quest 3",
      description: "Read the third chapter and complete the quiz.",
      attempts: [],
      bestScore: 0,
      maxScore: 3,
    },
    {
      id: 4,
      title: "Quest 4",
      description: "Read the fourth chapter and complete the quiz.",
      attempts: [],
      bestScore: 0,
      maxScore: 3,
    },
    {
      id: 5,
      title: "Quest 5",
      description: "Read the fifth chapter and complete the quiz.",
      attempts: [],
      bestScore: 0,
      maxScore: 3,
    },
  ]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userId) {
      console.log("QuestPage mounted with userId:", userId);
      loadQuests();
    }
  }, [userId]);

  useEffect(() => {
    if (route.params?.questId && route.params?.score !== undefined) {
      recordAttempt(route.params.questId, route.params.score);
    }
  }, [isFocused, route.params?.questId, route.params?.score]);

  const loadQuests = async () => {
    try {
      if (!userId) {
        console.error("No userId provided");
        return;
      }
      const savedQuests = await AsyncStorage.getItem(`quests_${userId}`);
      if (savedQuests) {
        const parsedQuests = JSON.parse(savedQuests);
        console.log("Loaded quests for userId:", userId, parsedQuests);
        setQuests(parsedQuests);
      } else {
        console.log("No saved quests found for userId:", userId);
        setQuests([
          {
            id: 1,
            title: "Quest 1",
            description: "Read the first chapter and complete the quiz.",
            attempts: [],
            bestScore: 0,
            maxScore: 3,
          },
          {
            id: 2,
            title: "Quest 2",
            description: "Read the second chapter and complete the quiz.",
            attempts: [],
            bestScore: 0,
            maxScore: 3,
          },
          {
            id: 3,
            title: "Quest 3",
            description: "Read the third chapter and complete the quiz.",
            attempts: [],
            bestScore: 0,
            maxScore: 3,
          },
          {
            id: 4,
            title: "Quest 4",
            description: "Read the fourth chapter and complete the quiz.",
            attempts: [],
            bestScore: 0,
            maxScore: 3,
          },
          {
            id: 5,
            title: "Quest 5",
            description: "Read the fifth chapter and complete the quiz.",
            attempts: [],
            bestScore: 0,
            maxScore: 3,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to load quests from storage", error);
    }
  };

  const saveQuests = async (questsToSave) => {
    try {
      if (!userId) {
        console.error("No userId provided");
        return;
      }
      await AsyncStorage.setItem(
        `quests_${userId}`,
        JSON.stringify(questsToSave)
      );
      console.log("Saved quests for userId:", userId, questsToSave);
    } catch (error) {
      console.error("Failed to save quests to storage", error);
    }
  };

  const recordAttempt = (id, score) => {
    const updatedQuests = quests.map((quest) => {
      if (quest.id === id) {
        const newAttempts = [...quest.attempts, score];
        const newBestScore = Math.max(...newAttempts);
        if (newBestScore === quest.maxScore) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        return { ...quest, attempts: newAttempts, bestScore: newBestScore };
      }
      return quest;
    });
    setQuests(updatedQuests);
    saveQuests(updatedQuests);
  };

  const handleQuestPress = (id) => {
    setSelectedQuest(quests.find((quest) => quest.id === id));
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
            <TouchableOpacity
              style={styles.questContent}
              onPress={() => handleQuestPress(quest.id)}
            >
              <LinearGradient
                colors={["#ff9a9e", "#fad0c4"]}
                style={styles.questBackground}
              >
                <Icon
                  name={
                    quest.bestScore === quest.maxScore
                      ? "check-circle"
                      : "times-circle"
                  }
                  size={30}
                  color={
                    quest.bestScore === quest.maxScore ? "#4caf50" : "#f44336"
                  }
                />
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questScore}>
                  Best Score: {quest.bestScore} / {quest.maxScore}
                </Text>
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
                <Text style={styles.modalDescription}>
                  {selectedQuest.description}
                </Text>
                <Text style={styles.questScore}>
                  Best Score: {selectedQuest.bestScore} /{" "}
                  {selectedQuest.maxScore}
                </Text>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    setSelectedQuest(null);
                    navigation.navigate("QuizPage", {
                      questId: selectedQuest.id,
                      userId: userId, // Pass userId to QuizPage
                    });
                  }}
                >
                  <Text style={styles.buttonText}>Take Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedQuest(null)}
                >
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
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  questList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  quest: {
    width: "45%",
    marginVertical: 10,
  },
  questContent: {
    alignItems: "center",
  },
  questBackground: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  questTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  questScore: {
    fontSize: 14,
    color: "#666",
marginTop: 5,
},
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
},
modalContent: {
  width: "80%",
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 10,
  alignItems: "center",
},
modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
},
modalDescription: {
  fontSize: 16,
  marginBottom: 20,
  textAlign: "center",
},
actionButton: {
  backgroundColor: "#4caf50",
  padding: 10,
  borderRadius: 5,
  marginVertical: 5,
  alignItems: "center",
  width: "100%"
},
buttonText: {
  color: "#fff",
  fontWeight: "bold",
},
closeButton: {
  backgroundColor: "#ff6666",
  padding: 10,
  borderRadius: 5,
  marginVertical: 5,
  alignItems: "center",
  width: "100%",
},
});

export default QuestPage;