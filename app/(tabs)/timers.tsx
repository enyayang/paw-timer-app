import { TimerCard } from '@/components/TimerCard';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TimersScreen() {
  const router = useRouter();
  const { timers, updateTimer, deleteTimer } = useApp();

  const handlePause = (timerId: string) => {
    const timer = timers.find(t => t.id === timerId);
    if (timer) {
      updateTimer(timerId, { isRunning: !timer.isRunning });
    }
  };

  const handleReset = (timerId: string) => {
    const timer = timers.find(t => t.id === timerId);
    if (timer) {
      updateTimer(timerId, {
        remainingSeconds: timer.totalSeconds,
        isRunning: false
      });
    }
  };

  const handleDelete = (timerId: string) => {
    deleteTimer(timerId);
  };


  return (
    <View className="flex-1 bg-[#E8E8E8]">
      {/* Header */}
      <View className="items-center pt-24 pb-6 px-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          📝 All Timers
        </Text>
        <Text className="text-base text-gray-600">
          Manage all your pet timers in one place
        </Text>
      </View>

      {/* Timers List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {timers.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-lg mb-2">No timers yet</Text>
            <Text className="text-gray-400 text-sm text-center px-8">
              Click "Add New Timer" below to create your first timer
            </Text>
          </View>
        ) : (
          timers.map((timer) => (
            <TimerCard
              key={timer.id}
              timer={timer}
              onPause={handlePause}
              onReset={handleReset}
              onDelete={handleDelete}
            />
          ))
        )}
      </ScrollView>

      {/* Add New Timer Button */}
      <View className="px-6 pb-6 mb-20">
        <TouchableOpacity
          className="bg-[#1A2332] rounded-full py-5 items-center flex-row justify-center gap-2 active:opacity-70"
          onPress={() => router.push('/add-timer')}
        >
          <Text className="text-white text-2xl">+</Text>
          <Text className="text-white text-lg font-semibold">
            Add New Timer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
