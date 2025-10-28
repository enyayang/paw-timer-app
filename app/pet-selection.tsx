import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function PetSelectionScreen() {
  const router = useRouter();
  const { pets } = useApp();

  const handleSelectPet = (petId: string) => {
    router.replace({
      pathname: '/add-timer',
      params: { petId }
    });
  };

  const handleAddNewPet = () => {
    router.push({
      pathname: '/pet-setup',
      params: { fromSelection: 'true' }
    });
  };

  return (
    <View className="flex-1 bg-[#E8E8E8]">
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
          🐾 Select a Pet
        </Text>
        <Text className="text-base text-gray-600 text-center">
          Choose which pet this timer is for
        </Text>
      </View>

      {/* Pets List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {pets.length === 0 ? (
          <View className="bg-white rounded-3xl p-8 items-center mb-4">
            <Text className="text-6xl mb-4">🐾</Text>
            <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
              No Pets Yet
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Add your first pet to get started
            </Text>
            <TouchableOpacity
              className="bg-pink-400 rounded-full py-4 px-8 active:opacity-70"
              onPress={handleAddNewPet}
            >
              <Text className="text-white text-lg font-semibold">
                Add Your First Pet
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                className="bg-white rounded-3xl p-6 mb-4 flex-row items-center active:opacity-70 shadow-sm"
                onPress={() => handleSelectPet(pet.id)}
              >
                <View className={`w-20 h-20 rounded-full items-center justify-center mr-4 ${pet.type === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
                  }`}>
                  <Text className="text-4xl">{pet.type === 'dog' ? '🐶' : '😺'}</Text>
                  <View className="flex-row gap-1 mt-1">
                    <View className="w-1.5 h-1.5 rounded-full bg-white" />
                    <View className="w-1.5 h-1.5 rounded-full bg-white" />
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 text-xl font-semibold">
                    {pet.name}
                  </Text>
                  <Text className="text-gray-500 text-sm capitalize">
                    {pet.type}
                  </Text>
                </View>
                <Text className="text-gray-400 text-2xl">›</Text>
              </TouchableOpacity>
            ))}

            {/* Add New Pet Card */}
            <TouchableOpacity
              className="bg-gray-600 rounded-3xl p-6 mb-4 flex-row items-center justify-center gap-3 active:opacity-70"
              onPress={handleAddNewPet}
            >
              <Text className="text-white text-3xl">+</Text>
              <Text className="text-white text-lg font-semibold">
                Add New Pet
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}
