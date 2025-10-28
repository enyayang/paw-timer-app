import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Pet } from '../contexts/AppContext';

interface PetCardProps {
    pet: Pet;
    onPetClick: (petId: string) => void;
    onUpdatePet: (id: string, updates: Partial<Pet>) => void;
    onDeletePet: (id: string) => void;
}

export const PetCard: React.FC<PetCardProps> = ({
    pet,
    onPetClick,
    onUpdatePet,
    onDeletePet,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(pet.name);

    const handleEdit = () => {
        setIsEditing(true);
        setEditName(pet.name);
    };

    const handleSave = () => {
        if (editName.trim()) {
            onUpdatePet(pet.id, { name: editName.trim() });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditName(pet.name);
        setIsEditing(false);
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Pet',
            `Are you sure you want to delete ${pet.name}? This will also delete all related timers.`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => onDeletePet(pet.id),
                },
            ]
        );
    };

    return (
        <View className="bg-white rounded-3xl p-6 mb-4 shadow-lg">
            <View className="flex-row items-center mb-3">
                <View className={`w-20 h-20 rounded-full items-center justify-center mr-4 ${pet.type === 'dog' ? 'bg-sky-400' : 'bg-pink-400'
                    }`}>
                    {pet.type === 'dog' ? (
                        <Image
                            source={require('@/assets/images/icon-woof.png')}
                            className="w-12 h-12"
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            source={require('@/assets/images/icon-meow.png')}
                            className="w-12 h-12"
                            resizeMode="contain"
                        />
                    )}
                </View>

                <View className="flex-1">
                    {isEditing ? (
                        <TextInput
                            value={editName}
                            onChangeText={setEditName}
                            className="text-gray-800 text-2xl font-semibold mb-1 border-b border-gray-300 pb-1"
                            autoFocus
                            onSubmitEditing={handleSave}
                            onBlur={handleSave}
                        />
                    ) : (
                        <Text className="text-gray-800 text-2xl font-semibold mb-1">
                            {pet.name}
                        </Text>
                    )}
                    <Text className="text-gray-500 text-base capitalize">
                        {pet.type}
                    </Text>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-2">
                    {isEditing ? (
                        <>
                            <TouchableOpacity
                                onPress={handleSave}
                                className="bg-green-500 rounded-full w-8 h-8 items-center justify-center"
                            >
                                <Text className="text-white text-lg">✓</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCancel}
                                className="bg-gray-400 rounded-full w-8 h-8 items-center justify-center"
                            >
                                <Text className="text-white text-lg">✕</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={handleEdit}
                                className=" rounded-full w-8 h-8 items-center justify-center"
                            >
                                <Text className="text-white text-sm">✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDelete}
                                className=" rounded-full w-8 h-8 items-center justify-center"
                            >
                                <Text className="text-white text-sm">🗑️</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            {/* Click to manage timers */}
            <TouchableOpacity
                onPress={() => onPetClick(pet.id)}
                className="active:opacity-70"
                disabled={isEditing}
            >
                <Text className="text-gray-500 text-sm">
                    {isEditing ? 'Editing mode...' : 'Tap to manage timers'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
