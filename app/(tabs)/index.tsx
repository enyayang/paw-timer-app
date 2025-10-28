import { useApp } from '@/contexts/AppContext';
import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { pets } = useApp();
  const hasPets = pets.length > 0;

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
            🐾 Paw Timer
          </Text>
        </View>

        {/* Intro Video */}
        <View className="w-full items-center justify-center px-0">
          <Video
            source={require('../../assets/images/video.mp4')}
            style={{ width: '100%', height: 240, borderRadius: 24 }}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isLooping
            isMuted
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
          🐾 My Pets
        </Text>
        <Text className="text-base text-gray-600">
          Select a pet or add a new one
        </Text>
      </View>

      {/* Pets List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            className="bg-white rounded-3xl p-6 mb-4 active:opacity-70"
            onPress={() => handlePetClick(pet.id)}
          >
            <View className="flex-row items-center mb-3">
              <View className={`w-20 h-20 rounded-full items-center justify-center mr-4 ${pet.type === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
                }`}>
                <Text className="text-4xl">{pet.type === 'dog' ? '🐶' : '😺'}</Text>
              </View>
              <View>
                <Text className="text-gray-800 text-2xl font-semibold mb-1">
                  {pet.name}
                </Text>
                <Text className="text-gray-500 text-base capitalize">
                  {pet.type}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 text-sm">
              Click to manage timers
            </Text>
          </TouchableOpacity>
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
