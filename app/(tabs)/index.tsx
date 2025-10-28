import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <View className="p-8 bg-white rounded-2xl shadow-lg">
        <Text className="text-4xl font-bold text-blue-600 mb-4">
          Hello NativeWind!
        </Text>
        <Text className="text-lg text-gray-700 mb-2">
          Tailwind CSS is working! 🎉
        </Text>
        <Text className="text-sm text-gray-500">
          This is a test with Tailwind classes
        </Text>
      </View>

      <View className="mt-6 space-y-2">
        <View className="px-6 py-3 bg-purple-500 rounded-full">
          <Text className="text-white font-semibold">Purple Button</Text>
        </View>
        <View className="px-6 py-3 bg-green-500 rounded-full">
          <Text className="text-white font-semibold">Green Button</Text>
        </View>
        <View className="px-6 py-3 bg-red-500 rounded-full">
          <Text className="text-white font-semibold">Red Button</Text>
        </View>
      </View>
    </View>
  );
}
