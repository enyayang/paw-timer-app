import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Pet {
  id: string;
  name: string;
  type: 'cat' | 'dog';
}

export interface Timer {
  id: string;
  petId: string;
  petName: string;
  petType: 'cat' | 'dog';
  taskName: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

interface AppContextType {
  pets: Pet[];
  timers: Timer[];
  addPet: (pet: Omit<Pet, 'id'>) => Pet;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  addTimer: (timer: Omit<Timer, 'id' | 'remainingSeconds' | 'isRunning'>) => void;
  updateTimer: (id: string, updates: Partial<Timer>) => void;
  deleteTimer: (id: string) => void;
  getTimersByPet: (petId: string) => Timer[];
  resetAllData: () => void;
}

// Storage keys
const STORAGE_KEYS = {
  PETS: '@paw_timer_pets',
  TIMERS: '@paw_timer_timers',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [timers, setTimers] = useState<Timer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const addPet = (pet: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...pet,
      id: Date.now().toString(),
    };
    setPets((prev) => [...prev, newPet]);
    return newPet;
  };

  const updatePet = (id: string, updates: Partial<Pet>) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === id ? { ...pet, ...updates } : pet))
    );
  };

  const deletePet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    // Also delete all timers associated with this pet
    setTimers((prev) => prev.filter((timer) => timer.petId !== id));
  };

  const addTimer = (timer: Omit<Timer, 'id' | 'remainingSeconds' | 'isRunning'>) => {
    const newTimer: Timer = {
      ...timer,
      id: Date.now().toString(),
      remainingSeconds: timer.totalSeconds,
      isRunning: true,
    };
    setTimers((prev) => [...prev, newTimer]);
  };

  const updateTimer = (id: string, updates: Partial<Timer>) => {
    setTimers((prev) =>
      prev.map((timer) => (timer.id === id ? { ...timer, ...updates } : timer))
    );
  };

  const deleteTimer = (id: string) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const getTimersByPet = (petId: string) => {
    return timers.filter((timer) => timer.petId === petId);
  };

  const resetAllData = async () => {
    setPets([]);
    setTimers([]);
    // Clear storage
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.PETS),
        AsyncStorage.removeItem(STORAGE_KEYS.TIMERS),
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [petsData, timersData] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.PETS),
          AsyncStorage.getItem(STORAGE_KEYS.TIMERS),
        ]);

        if (petsData) {
          setPets(JSON.parse(petsData));
        }

        if (timersData) {
          setTimers(JSON.parse(timersData));
        }
      } catch (error) {
        console.error('Error loading data from storage:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Save pets to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(pets)).catch((error) =>
        console.error('Error saving pets to storage:', error)
      );
    }
  }, [pets, isLoaded]);

  // Save timers to AsyncStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(timers)).catch((error) =>
        console.error('Error saving timers to storage:', error)
      );
    }
  }, [timers, isLoaded]);

  return (
    <AppContext.Provider
      value={{
        pets,
        timers,
        addPet,
        updatePet,
        deletePet,
        addTimer,
        updateTimer,
        deleteTimer,
        getTimersByPet,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
