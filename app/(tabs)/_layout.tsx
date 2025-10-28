import { Image } from 'expo-image';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1A2332',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Pets',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/icon-mypets.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
                resizeMode: 'contain'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="timers"
        options={{
          title: 'Timers',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/icon-timers.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
                resizeMode: 'contain'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('@/assets/images/icon-settings.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
                resizeMode: 'contain'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
