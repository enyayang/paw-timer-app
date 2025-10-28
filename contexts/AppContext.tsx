import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Pet {
  id: string;
  name: string;
  type: 'cat' | 'dog';
  soundFile: string; // 'none' or 'dog-bark-01.mp3', 'cat-meow-01.mp3', etc.
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
  soundFile: string;
}

interface AppContextType {
  pets: Pet[];
  timers: Timer[];
  addPet: (pet: Omit<Pet, 'id'>) => Pet;
  addTimer: (timer: Omit<Timer, 'id' | 'remainingSeconds' | 'isRunning'>) => void;
  updateTimer: (id: string, updates: Partial<Timer>) => void;
  deleteTimer: (id: string) => void;
  getTimersByPet: (petId: string) => Timer[];
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [timers, setTimers] = useState<Timer[]>([]);

  const addPet = (pet: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...pet,
      id: Date.now().toString(),
    };
    setPets((prev) => [...prev, newPet]);
    return newPet;
  };

  const addTimer = (timer: Omit<Timer, 'id' | 'remainingSeconds' | 'isRunning'>) => {
    // Find the pet to get sound file info
    const pet = pets.find(p => p.id === timer.petId);

    const newTimer: Timer = {
      ...timer,
      id: Date.now().toString(),
      remainingSeconds: timer.totalSeconds,
      isRunning: true,
      soundFile: pet?.soundFile || 'none',
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

  const resetAllData = () => {
    setPets([]);
    setTimers([]);
  };

  return (
    <AppContext.Provider
      value={{
        pets,
        timers,
        addPet,
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
