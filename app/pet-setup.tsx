import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '@/contexts/AppContext';

// Sound options for each pet type
const SOUND_OPTIONS = {
  dog: [
    { value: 'none', label: 'No Sound' },
    { value: 'dog-bark-01.mp3', label: 'Dog Bark 1' },
    { value: 'dog-bark-02.mp3', label: 'Dog Bark 2' },
    { value: 'dog-bark-03.mp3', label: 'Dog Bark 3' },
  ],
  cat: [
    { value: 'none', label: 'No Sound' },
    { value: 'cat-meow-01.mp3', label: 'Cat Meow 1' },
    { value: 'cat-meow-02.mp3', label: 'Cat Meow 2' },
    { value: 'cat-meow-03.mp3', label: 'Cat Meow 3' },
  ],
};

export default function PetSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addPet } = useApp();

  const [selectedPet, setSelectedPet] = useState<'cat' | 'dog'>('cat');
  const [petName, setPetName] = useState('');
  const [selectedSound, setSelectedSound] = useState<string>('none');

  const handleAddPet = () => {
    if (!petName.trim()) {
      alert('Please enter your pet\'s name');
      return;
    }

    const newPet = addPet({
      name: petName.trim(),
      type: selectedPet,
      soundFile: selectedSound,
    });

    // Check if we came from pet-selection (to add timer) or from home
    if (params.fromSelection) {
      // Go back to pet-selection with the new pet selected
      router.back();
    } else {
      // Coming from home, go to add-timer with new pet
      router.replace({
        pathname: '/add-timer',
        params: { petId: newPet.id }
      });
    }
  };

  return (
    <View className="flex-1 bg-[#E8E8E8] px-6 pt-24 pb-8">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Add New Pet
        </Text>
        <Text className="text-base text-gray-600">
          Choose a pet type and give it a name
        </Text>
      </View>

      {/* Pet Type Selection */}
      <View className="flex-row gap-4 mb-8">
        {/* Cat Card */}
        <TouchableOpacity
          className={`flex-1 rounded-3xl p-6 items-center ${
            selectedPet === 'cat' ? 'bg-pink-400' : 'bg-white'
          }`}
          onPress={() => setSelectedPet('cat')}
          activeOpacity={0.7}
        >
          <View className="items-center">
            <Text className="text-6xl mb-3">😺</Text>
            <View className="flex-row gap-1 mb-2">
              <View className={`w-2 h-2 rounded-full ${selectedPet === 'cat' ? 'bg-white' : 'bg-gray-800'}`} />
              <View className={`w-2 h-2 rounded-full ${selectedPet === 'cat' ? 'bg-white' : 'bg-gray-800'}`} />
            </View>
            <View className={`w-10 h-1 rounded-full mb-4 ${selectedPet === 'cat' ? 'bg-white' : 'bg-gray-800'}`} />
            <Text className={`text-lg font-semibold ${selectedPet === 'cat' ? 'text-white' : 'text-gray-800'}`}>
              Cat
            </Text>
          </View>
        </TouchableOpacity>

        {/* Dog Card */}
        <TouchableOpacity
          className={`flex-1 rounded-3xl p-6 items-center ${
            selectedPet === 'dog' ? 'bg-sky-400' : 'bg-white'
          }`}
          onPress={() => setSelectedPet('dog')}
          activeOpacity={0.7}
        >
          <View className="items-center">
            <Text className="text-6xl mb-3">🐶</Text>
            <View className="flex-row gap-1 mb-2">
              <View className={`w-2 h-2 rounded-full ${selectedPet === 'dog' ? 'bg-white' : 'bg-gray-800'}`} />
              <View className={`w-2 h-2 rounded-full ${selectedPet === 'dog' ? 'bg-white' : 'bg-gray-800'}`} />
            </View>
            <View className={`w-10 h-1 rounded-full mb-4 ${selectedPet === 'dog' ? 'bg-white' : 'bg-gray-800'}`} />
            <Text className={`text-lg font-semibold ${selectedPet === 'dog' ? 'text-white' : 'text-gray-800'}`}>
              Dog
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Pet Name Input */}
      <View className="bg-white rounded-3xl p-6 mb-4">
        <Text className="text-gray-800 font-semibold mb-3 text-base">
          Pet Name
        </Text>
        <TextInput
          className="bg-gray-50 rounded-full px-5 py-4 text-base text-gray-800"
          placeholder="Enter your pet's name"
          placeholderTextColor="#9CA3AF"
          value={petName}
          onChangeText={setPetName}
        />
      </View>

      {/* Sound Selection */}
      <View className="bg-white rounded-3xl p-6 mb-8">
        <Text className="text-gray-800 font-semibold mb-3 text-base">
          Completion Sound
        </Text>
        <View className="gap-2">
          {SOUND_OPTIONS[selectedPet].map((option) => (
            <TouchableOpacity
              key={option.value}
              className={`flex-row items-center py-3 px-4 rounded-2xl ${
                selectedSound === option.value ? 'bg-gray-100' : 'bg-gray-50'
              }`}
              onPress={() => setSelectedSound(option.value)}
              activeOpacity={0.7}
            >
              <View className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                selectedSound === option.value
                  ? selectedPet === 'dog' ? 'border-sky-400' : 'border-pink-400'
                  : 'border-gray-300'
              }`}>
                {selectedSound === option.value && (
                  <View className={`w-3 h-3 rounded-full ${
                    selectedPet === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
                  }`} />
                )}
              </View>
              <Text className={`text-base ${
                selectedSound === option.value ? 'text-gray-800 font-semibold' : 'text-gray-600'
              }`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-4 mt-auto">
        <TouchableOpacity
          className="flex-1 bg-white rounded-full py-4 items-center active:opacity-70"
          onPress={() => router.back()}
        >
          <Text className="text-gray-800 text-lg font-semibold">
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-gray-600 rounded-full py-4 items-center active:opacity-70"
          onPress={handleAddPet}
        >
          <Text className="text-white text-lg font-semibold">
            Add Pet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
