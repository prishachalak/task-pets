import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';

const questions = [
  {
    question: "What is considered the language of business used to communicate financial information?",
    options: ["Marketing", "Profit", "Pricing", "Accounting"],
    correctOption: "Accounting"
  },
  {
    question: "What is the main objective of management accounting?",
    options: ["To identify and analyse the result of business operations", "To study business transactions", "To check and maintain accounting records", "To remind the amount due to customers"],
    correctOption: "To identify and analyse the result of business operations"
  },
  {
	question : "Which personnel of a financial firm play a key role in management accounting?",
	options: ["Investors", "Managers", "Suppliers", "Customers"],
	correctOption: "Managers"
  },
  // Add more questions as needed
];

const QuizPage = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctOption) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  useEffect(() => {
    // Optional: Add a timer for each question
    let timer;
    if (!showResult) {
      timer = setTimeout(handleNextQuestion, 10000); // 10 seconds for each question
    }
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, showResult]);

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Result</Text>
        <Text style={styles.score}>Your Score: {score} / {questions.length}</Text>
        <Button title="Restart Quiz" onPress={handleRestartQuiz} />
        <Button title="Back to Quests" onPress={() => navigation.navigate('TempQuest')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentQuestion.question}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
              selectedOption === currentQuestion.correctOption && option === currentQuestion.correctOption && styles.correctOptionButton,
              selectedOption && selectedOption !== currentQuestion.correctOption && option === currentQuestion.correctOption && styles.correctOptionButton,
              selectedOption && selectedOption === option && selectedOption !== currentQuestion.correctOption && styles.wrongOptionButton
            ]}
            onPress={() => handleOptionPress(option)}
            disabled={!!selectedOption}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedOption && (
        <Button title="Next Question" onPress={handleNextQuestion} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedOptionButton: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  correctOptionButton: {
    backgroundColor: '#4CAF50',
  },
  wrongOptionButton: {
    backgroundColor: '#F44336',
  },
  optionText: {
    fontSize: 18,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default QuizPage;
