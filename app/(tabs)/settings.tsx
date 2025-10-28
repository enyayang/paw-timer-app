import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);

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
        {/* Notifications Settings */}
        <View className="bg-white rounded-3xl p-6 mb-4">
          <Text className="text-gray-800 text-lg font-bold mb-4">Notifications</Text>

          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-1">
              <Text className="text-gray-800 text-base font-semibold">
                Timer Notifications
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                Get notified when timers finish
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View className="flex-row items-center justify-between py-3">
            <View className="flex-1">
              <Text className="text-gray-800 text-base font-semibold">
                Sound Alerts
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                Play sound when timer completes
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={soundEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Interaction Settings */}
        <View className="bg-white rounded-3xl p-6 mb-4">
          <Text className="text-gray-800 text-lg font-bold mb-4">Interaction</Text>

          <View className="flex-row items-center justify-between py-3">
            <View className="flex-1">
              <Text className="text-gray-800 text-base font-semibold">
                Haptic Feedback
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                Feel vibrations when interacting
              </Text>
            </View>
            <Switch
              value={hapticEnabled}
              onValueChange={setHapticEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={hapticEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* App Info */}
        <View className="bg-white rounded-3xl p-6 mb-4">
          <Text className="text-gray-800 text-lg font-bold mb-4">About</Text>

          <TouchableOpacity className="py-3 border-b border-gray-100">
            <Text className="text-gray-800 text-base font-semibold">
              App Version
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Version 1.0.0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3 border-b border-gray-100">
            <Text className="text-gray-800 text-base font-semibold">
              Privacy Policy
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              How we protect your data
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3">
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

          <TouchableOpacity className="py-3 border-b border-gray-100">
            <Text className="text-gray-800 text-base font-semibold">
              Export Data
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Download your pets and timers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="py-3">
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
