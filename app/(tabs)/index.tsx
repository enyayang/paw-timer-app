import { useApp } from '@/contexts/AppContext';
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
      <View className="flex-1 items-center justify-between bg-[#E8E8E8] px-8 py-16">
        {/* Title */}
        <View className="mt-28">
          <Text className="text-2xl font-semibold text-gray-800 text-center">
            🐾 Paw Timer
          </Text>
        </View>

        {/* Pet Icons */}
        <View className="flex-row gap-8 items-center justify-center">
          {/* Cat Icon */}
          <View className="w-48 h-48 rounded-full bg-pink-400 items-center justify-center shadow-lg">
            <Text className="text-7xl">😺</Text>
            <View className="mt-2 flex-row gap-2">
              <View className="w-10 h-1 bg-white rounded-full" />
            </View>
          </View>

          {/* Dog Icon */}
          <View className="w-48 h-48 rounded-full bg-sky-400 items-center justify-center shadow-lg">
            <Text className="text-7xl">🐶</Text>
            <View className="mt-2 flex-row gap-2">
              <View className="w-10 h-1 bg-white rounded-full" />
            </View>
          </View>
        </View>

        {/* Tagline & Button */}
        <View className="w-full items-center gap-8">
          <Text className="text-xl text-gray-700 text-center">
            Track your pet's activities with joy
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
    <View className="flex-1 bg-[#E8E8E8]">
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
