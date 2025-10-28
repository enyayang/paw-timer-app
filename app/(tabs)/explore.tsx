import { Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#E8E8E8]">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        🚀 Explore
      </Text>
      <Text className="text-gray-600 text-center px-8">
        Discover new features and tips for your pet timers
      </Text>
    </View>
  );
}