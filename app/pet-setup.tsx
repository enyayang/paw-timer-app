import { useApp } from '@/contexts/AppContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function PetSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addPet } = useApp();

  const [selectedPet, setSelectedPet] = useState<'cat' | 'dog'>('cat');
  const [petName, setPetName] = useState('');

  const handleAddPet = () => {
    if (!petName.trim()) {
      alert('Please enter your pet\'s name');
      return;
    }

    const newPet = addPet({
      name: petName.trim(),
      type: selectedPet,
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
    <View className="flex-1 bg-[#FEFBEF] px-6 pt-24 pb-8">
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
          className={`flex-1 rounded-3xl p-6 items-center ${selectedPet === 'cat' ? 'bg-pink-400' : 'bg-white'
            }`}
          onPress={() => setSelectedPet('cat')}
          activeOpacity={0.7}
        >
          <View className="items-center">
            <Image
              source={require('@/assets/images/icon-meow.png')}
              className="w-16 h-16 mb-3"
              resizeMode="contain"
            />
            <Text className={`text-lg font-semibold ${selectedPet === 'cat' ? 'text-white' : 'text-gray-800'}`}>
              Meow
            </Text>
          </View>
        </TouchableOpacity>

        {/* Dog Card */}
        <TouchableOpacity
          className={`flex-1 rounded-3xl p-6 items-center ${selectedPet === 'dog' ? 'bg-sky-400' : 'bg-white'
            }`}
          onPress={() => setSelectedPet('dog')}
          activeOpacity={0.7}
        >
          <View className="items-center">
            <Image
              source={require('@/assets/images/icon-woof.png')}
              className="w-16 h-16 mb-3"
              resizeMode="contain"
            />
            <Text className={`text-lg font-semibold ${selectedPet === 'dog' ? 'text-white' : 'text-gray-800'}`}>
              Woof
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
