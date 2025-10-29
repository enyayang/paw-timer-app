import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PetCard } from '../../components/PetCard';

export default function HomeScreen() {
  const router = useRouter();
  const { pets, updatePet, deletePet } = useApp();
  const hasPets = pets.length > 0;

  // Typing effect state
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Paw Timer';
  const typingSpeed = 150; // milliseconds per character

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

  const handlePetClick = (petId: string) => {
    // Navigate to timers tab with selected pet
    router.push('/(tabs)/timers');
  };

  const handleAddPet = () => {
    router.push('/pet-setup');
  };

  // Welcome screen (no pets yet)
  if (!hasPets) {
    return (
      <View className="flex-1 items-center justify-between bg-[#FEFBEF] px-8 py-16">
        {/* Title */}
        <View className="mt-28">
          <Text className="text-2xl font-semibold text-gray-800 text-center">
            {displayedText}
          </Text>
        </View>

        {/* Intro Image */}
        <View className="w-full items-center justify-center px-0">
          <Image
            source={require('../../assets/images/main-image.png')}
            style={{ width: '100%', height: 240, borderRadius: 24 }}
            resizeMode="contain"
          />
        </View>

        {/* Tagline & Button */}
        <View className="w-full items-center gap-8">
          <Text className="text-xl text-gray-700 text-center">
            Take a break with your pet — time to move and stretch!
          </Text>

          <TouchableOpacity
            className="w-full bg-[#1A2332] py-5 rounded-full items-center shadow-lg active:opacity-80"
            onPress={handleAddPet}
          >
            <Text className="text-white text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // My Pets screen (has pets)
  return (
    <View className="flex-1 bg-[#FEFBEF]">
      {/* Header */}
      <View className="items-center pt-24 pb-6 px-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          My Pets
        </Text>
        <Text className="text-base text-gray-600">
          Select a pet or add a new one
        </Text>
      </View>

      {/* Pets List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onPetClick={handlePetClick}
            onUpdatePet={updatePet}
            onDeletePet={deletePet}
          />
        ))}

        {/* Add Another Pet Button */}
        <TouchableOpacity
          className="rounded-full py-5 mb-6 items-center flex-row justify-center gap-2 active:opacity-70"
          style={{
            backgroundColor: '#EC4899',
          }}
          onPress={handleAddPet}
        >
          <Text className="text-white text-2xl">+</Text>
          <Text className="text-white text-lg font-semibold">
            Add Another Pet
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
