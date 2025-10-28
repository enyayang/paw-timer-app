import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { resetAllData } = useApp();

  const handleSupport = () => {
    const email = 'enn.enya@gmail.com';
    const subject = 'Paw Timer Support Request';
    const body = 'Hi, I need help with...';

    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to delete all pets and timers? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            resetAllData();
            Alert.alert('Success', 'All data has been deleted.');
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#E8E8E8]">
      {/* Header */}
      <View className="items-center pt-24 pb-6 px-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          ⚙️ Settings
        </Text>
        <Text className="text-base text-gray-600">
          Manage your app preferences
        </Text>
      </View>

      {/* Settings Content */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <View className="bg-white rounded-3xl p-6 mb-4">
          <Text className="text-gray-800 text-lg font-bold mb-4">About</Text>

          <View className="py-3 border-b border-gray-100">
            <Text className="text-gray-800 text-base font-semibold">
              Developer
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Enya & doggy oreoo
            </Text>
          </View>

          <TouchableOpacity className="py-3 border-b border-gray-100">
            <Text className="text-gray-800 text-base font-semibold">
              App Version
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Version 1.0.0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3" onPress={handleSupport}>
            <Text className="text-gray-800 text-base font-semibold">
              Support
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Get help and contact us
            </Text>
          </TouchableOpacity>
        </View>

        {/* Data Management */}
        <View className="bg-white rounded-3xl p-6 mb-6">
          <Text className="text-gray-800 text-lg font-bold mb-4">Data</Text>

          <TouchableOpacity className="py-3" onPress={handleResetData}>
            <Text className="text-red-600 text-base font-semibold">
              Reset All Data
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Delete all pets and timers
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
