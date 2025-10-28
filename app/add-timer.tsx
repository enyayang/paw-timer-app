import { useApp } from '@/contexts/AppContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TimerSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { pets, addTimer } = useApp();

  const [selectedPet, setSelectedPet] = useState(
    pets.length > 0
      ? pets[0]
      : { id: '', name: 'No pet', type: 'dog' as const }
  );
  const [taskName, setTaskName] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    if (params.petId && pets.length > 0) {
      const pet = pets.find(p => p.id === params.petId);
      if (pet) setSelectedPet(pet);
    } else if (pets.length > 0 && !selectedPet.id) {
      setSelectedPet(pets[0]);
    }
  }, [params.petId, pets]);

  const handleSelectPet = () => {
    router.push('/pet-selection');
  };

  const handleStartTimer = () => {
    if (!selectedPet.id) {
      alert('Please add a pet first');
      return;
    }

    if (!taskName.trim()) {
      alert('Please enter a task name');
      return;
    }

    const totalMinutes = parseInt(minutes || '0');
    const totalSeconds = parseInt(seconds || '0');
    const total = totalMinutes * 60 + totalSeconds;

    if (total === 0) {
      alert('Please set a time for the timer');
      return;
    }

    addTimer({
      petId: selectedPet.id,
      petName: selectedPet.name,
      petType: selectedPet.type,
      taskName: taskName,
      totalSeconds: total,
    });

    router.replace('/(tabs)/timers');
  };

  // If no pets exist, show message to add pet first
  if (pets.length === 0) {
    return (
      <View className="flex-1 bg-[#FEFBEF]">
        <TouchableOpacity
          className="flex-row items-center px-6 pt-16 pb-4"
          onPress={() => router.back()}
        >
          <Text className="text-2xl mr-2">←</Text>
          <Text className="text-lg text-gray-800">Back</Text>
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-white rounded-3xl p-8 items-center">
            <Text className="text-6xl mb-4">🐾</Text>
            <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
              No Pets Yet
            </Text>
            <Text className="text-gray-600 text-center mb-8">
              Please add a pet first before creating a timer
            </Text>
            <TouchableOpacity
              className="bg-pink-400 rounded-full py-4 px-8 active:opacity-70"
              onPress={() => router.push('/pet-setup')}
            >
              <Text className="text-white text-lg font-semibold">
                Add Your First Pet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FEFBEF]">
      {/* Back Button */}
      <TouchableOpacity
        className="flex-row items-center px-6 pt-16 pb-4"
        onPress={() => router.back()}
      >
        <Text className="text-2xl mr-2">←</Text>
        <Text className="text-lg text-gray-800">Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="items-center mb-6 px-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          ⏰ New Timer
        </Text>
        <Text className="text-base text-gray-600 text-center">
          Set up a timer for your pet's activity
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Main Card */}
        <View className="bg-white rounded-3xl p-6 mb-6">
          {/* Pet Selection Card */}
          <TouchableOpacity
            className="bg-gray-50 rounded-2xl p-4 flex-row items-center mb-6"
            onPress={handleSelectPet}
            activeOpacity={0.7}
          >
            <View className={`w-20 h-20 rounded-full items-center justify-center mr-4 ${selectedPet.type === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
              }`}>
              <Text className="text-4xl">{selectedPet.type === 'dog' ? '🐶' : '😺'}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm mb-1">Pet Name</Text>
              <Text className="text-gray-800 text-xl font-semibold">{selectedPet.name}</Text>
            </View>
            <Text className="text-gray-400 text-2xl">›</Text>
          </TouchableOpacity>

          {/* Task Name Input */}
          <View className="mb-6">
            <Text className="text-gray-800 font-semibold mb-3 text-base">
              Task Name
            </Text>
            <TextInput
              className="bg-gray-50 rounded-full px-5 py-4 text-base text-gray-800"
              placeholder="e.g., Feeding time, Walk, Playtime"
              placeholderTextColor="#9CA3AF"
              value={taskName}
              onChangeText={setTaskName}
            />
          </View>

          {/* Time Inputs */}
          <View className="flex-row gap-4 mb-6">
            {/* Minutes */}
            <View className="flex-1">
              <Text className="text-gray-800 font-semibold mb-3 text-base">
                Minutes
              </Text>
              <TextInput
                className="bg-gray-50 rounded-full px-5 py-4 text-base text-gray-800 text-center"
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                value={minutes}
                onChangeText={setMinutes}
                keyboardType="number-pad"
              />
            </View>

            {/* Seconds */}
            <View className="flex-1">
              <Text className="text-gray-800 font-semibold mb-3 text-base">
                Seconds
              </Text>
              <TextInput
                className="bg-gray-50 rounded-full px-5 py-4 text-base text-gray-800 text-center"
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                value={seconds}
                onChangeText={setSeconds}
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Preview Timer */}
          {(minutes || seconds) && (
            <View className={`${selectedPet.type === 'dog' ? 'bg-sky-50' : 'bg-pink-50'
              } rounded-2xl py-4 mb-6 items-center`}>
              <Text className={`${selectedPet.type === 'dog' ? 'text-sky-600' : 'text-pink-600'
                } text-2xl font-bold`}>
                {String(parseInt(minutes || '0')).padStart(2, '0')}:{String(parseInt(seconds || '0')).padStart(2, '0')}
              </Text>
              <Text className={`${selectedPet.type === 'dog' ? 'text-sky-500' : 'text-pink-500'
                } text-sm mt-1`}>
                Timer Duration
              </Text>
            </View>
          )}
        </View>

        {/* Start Timer Button */}
        <TouchableOpacity
          className={`${selectedPet.type === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
            } rounded-full py-5 items-center active:opacity-70 mb-6`}
          onPress={handleStartTimer}
        >
          <Text className="text-white text-lg font-semibold">
            Start Timer
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}