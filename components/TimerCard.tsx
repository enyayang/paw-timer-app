import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TimerCardProps {
    timer: {
        id: string;
        petName: string;
        petType: 'dog' | 'cat';
        taskName: string;
        remainingSeconds: number;
        totalSeconds: number;
        isRunning: boolean;
    };
    onPause: (timerId: string) => void;
    onReset: (timerId: string) => void;
    onDelete: (timerId: string) => void;
}

export const TimerCard: React.FC<TimerCardProps> = ({
    timer,
    onPause,
    onReset,
    onDelete,
}) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const getProgressPercentage = () => {
        return ((timer.totalSeconds - timer.remainingSeconds) / timer.totalSeconds) * 100;
    };

    return (
        <View className="bg-white rounded-3xl p-6 mb-4 shadow-lg">
            {/* Timer Header */}
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    {/* Pet Icon */}
                    <View className={`w-16 h-16 rounded-full items-center justify-center mr-4 ${timer.petType === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
                        }`}>
                        <Text className="text-3xl">{timer.petType === 'dog' ? '🐶' : '😺'}</Text>
                    </View>

                    {/* Pet & Task Info */}
                    <View>
                        <Text className="text-gray-800 font-bold text-lg">
                            {timer.petName}
                        </Text>
                        <Text className="text-gray-600 text-base">
                            {timer.taskName}
                        </Text>
                    </View>
                </View>

                {/* Delete Button */}
                <TouchableOpacity
                    onPress={() => onDelete(timer.id)}
                    className="active:opacity-70"
                >
                    <Text className="text-gray-400 text-2xl">🗑️</Text>
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View className="bg-gray-200 rounded-full h-2 mb-4">
                <View
                    className={`h-2 rounded-full ${timer.petType === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
                        }`}
                    style={{ width: `${getProgressPercentage()}%` }}
                />
            </View>

            {/* Timer Display */}
            <View className={`${timer.petType === 'dog' ? 'bg-sky-50' : 'bg-pink-50'
                } rounded-2xl py-6 mb-4 items-center`}>
                <Text className={`${timer.petType === 'dog' ? 'text-sky-600' : 'text-pink-600'
                    } text-6xl font-bold`}>
                    {formatTime(timer.remainingSeconds)}
                </Text>
                <Text className={`${timer.petType === 'dog' ? 'text-sky-500' : 'text-pink-500'
                    } text-sm mt-2`}>
                    {timer.isRunning ? 'Running' : 'Paused'}
                </Text>
            </View>

            {/* Controls */}
            <View className="flex-row gap-3">
                {/* Pause/Resume Button */}
                <TouchableOpacity
                    className={`flex-1 rounded-full py-4 items-center flex-row justify-center gap-2 active:opacity-70 ${timer.petType === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
                        }`}
                    onPress={() => onPause(timer.id)}
                >
                    <Text className="text-white text-xl">
                        {timer.isRunning ? '⏸️' : '▶️'}
                    </Text>
                    <Text className="text-white font-semibold text-base">
                        {timer.isRunning ? 'Pause' : 'Resume'}
                    </Text>
                </TouchableOpacity>

                {/* Reset Button */}
                <TouchableOpacity
                    className="flex-1 bg-gray-200 rounded-full py-4 items-center flex-row justify-center gap-2 active:opacity-70"
                    onPress={() => onReset(timer.id)}
                >
                    <Text className="text-gray-600 text-xl">🔄</Text>
                    <Text className="text-gray-600 font-semibold text-base">
                        Reset
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
