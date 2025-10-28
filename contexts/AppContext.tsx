import { createContext, ReactNode, useContext, useState } from 'react';

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
