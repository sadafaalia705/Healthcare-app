import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

interface LifestyleData {
  activityLevel: string;
  sleepHours: string;
  dietPreference: string;
}

interface LifestyleFormProps {
  onNext?: (data: LifestyleData) => void;
  onBack?: () => void;
}

const LifestyleForm: React.FC<LifestyleFormProps> = ({ onNext, onBack }) => {
  const [selectedActivityLevel, setSelectedActivityLevel] = useState<string>('');
  const [selectedSleepHours, setSelectedSleepHours] = useState<string>('');
  const [selectedDietPreference, setSelectedDietPreference] = useState<string>('');
  const [showWarning, setShowWarning] = useState(false);

  const activityLevels = [
    { id: 'Sedentary', label: 'SEDENTARY', icon: <MaterialCommunityIcons name="account" size={22} color="#0cb6ab" /> },
    { id: 'Lightly Active', label: 'LIGHTLY ACTIVE', icon: <Feather name="activity" size={22} color="#0cb6ab" /> },
    { id: 'Moderately Active', label: 'MODERATELY ACTIVE', icon: <MaterialCommunityIcons name="run" size={22} color="#0cb6ab" /> },
    { id: 'Very Active', label: 'VERY ACTIVE', icon: <MaterialCommunityIcons name="weight-lifter" size={22} color="#0cb6ab" /> },
  ];

  const sleepOptions = [
    { id: '4', label: '<5 HOURS', icon: <Feather name="moon" size={22} color="#0cb6ab" /> },
    { id: '5', label: '5-6 HOURS', icon: <Feather name="clock" size={22} color="#0cb6ab" /> },
    { id: '7', label: '6-8 HOURS', icon: <MaterialCommunityIcons name="sleep" size={22} color="#0cb6ab" /> },
    { id: '9', label: '>8 HOURS', icon: <MaterialCommunityIcons name="emoticon-happy-outline" size={22} color="#0cb6ab" /> },
  ];

  const dietPreferences = [
    { id: 'Vegetarian', label: 'VEGETARIAN', icon: <MaterialCommunityIcons name="food-apple-outline" size={22} color="#0cb6ab" /> },
    { id: 'Vegan', label: 'VEGAN', icon: <MaterialCommunityIcons name="leaf" size={22} color="#0cb6ab" /> },
    { id: 'Omnivore', label: 'OMNIVORE', icon: <MaterialCommunityIcons name="food-steak" size={22} color="#0cb6ab" /> },
    { id: 'Keto', label: 'KETO', icon: <MaterialCommunityIcons name="food-variant" size={22} color="#0cb6ab" /> },
    { id: 'Other', label: 'OTHER', icon: <FontAwesome5 name="utensils" size={20} color="#0cb6ab" /> },
  ];

  const handleNext = () => {
    if (!selectedActivityLevel || !selectedSleepHours || !selectedDietPreference) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    const data: LifestyleData = {
      activityLevel: selectedActivityLevel,
      sleepHours: selectedSleepHours,
      dietPreference: selectedDietPreference,
    };
    
    if (onNext) {
      onNext(data);
    } else {
      // Default behavior when used as standalone page
      // Navigate to the next step in the form flow
      router.push('/health/forms/Wellness');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default behavior when used as standalone page
      // Navigate back to the previous step
      router.back();
    }
  };

  const OptionButton = ({
    option,
    isSelected,
    onPress,
  }: {
    option: { id: string; label: string; icon: React.ReactNode };
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between px-4 py-4 mb-2 rounded-lg border ${
        isSelected ? 'bg-teal-50 border-teal-500' : 'bg-white border-gray-200'
      }`}
    >
      <View className="flex-row items-center">
        <View className="w-6 h-6 mr-3 items-center justify-center">
          {option.icon}
        </View>
        <Text
          className={`text-sm font-medium ${
            isSelected ? 'text-teal-700' : 'text-gray-700'
          }`}
        >
          {option.label}
        </Text>
      </View>
      <View
        className={`w-5 h-5 rounded-full border-2 ${
          isSelected ? 'bg-teal-500 border-teal-500' : 'border-gray-300'
        }`}
      >
        {isSelected && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-xs">✓</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-3">
          <Text className="text-xl font-semibold text-gray-800  ">Your Lifestyle Habits</Text>
          <Text className="text-xs  text-gray-600">Select the options that best describe your lifestyle.</Text>
        </View>

        {/* Activity Level Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-[#0cb6ab] mb-4">Activity Level</Text>
          {activityLevels.map((level) => (
            <OptionButton
              key={level.id}
              option={level}
              isSelected={selectedActivityLevel === level.id}
              onPress={() => setSelectedActivityLevel(level.id)}
            />
          ))}
        </View>

        {/* Sleep Hours Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-[#0cb6ab] mb-4">Sleep Hours</Text>
          {sleepOptions.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              isSelected={selectedSleepHours === option.id}
              onPress={() => setSelectedSleepHours(option.id)}
            />
          ))}
        </View>

        {/* Diet Preference Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-[#0cb6ab] mb-4">Diet Preference</Text>
          {dietPreferences.map((diet) => (
            <OptionButton
              key={diet.id}
              option={diet}
              isSelected={selectedDietPreference === diet.id}
              onPress={() => setSelectedDietPreference(diet.id)}
            />
          ))}
        </View>

        {showWarning && (
          <Text className="text-center text-xs text-red-500 mb-2">Please select an option in each category before continuing.</Text>
        )}

        {/* Navigation Buttons */}
        <View className="mt-1 mb-10 flex-row justify-between">
          <TouchableOpacity
            onPress={handleBack}
            className="bg-gray-200 py-3 px-6 rounded-lg"
            activeOpacity={0.8}
          >
            <Text className="text-gray-700 font-semibold">BACK</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#0cb6ab] py-3 px-6 rounded-lg"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LifestyleForm;