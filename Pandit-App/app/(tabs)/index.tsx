import { OnboardingCarousel } from '@/components/OnboardingSlide';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { DashboardColors as C } from '@/constants/dashboard-theme';
import { goToDashboard, goToSignIn } from '@/lib/auth-navigation';
import { useAuth } from '@/providers/AuthProvider';

const SLIDES = [
  {
    id: '1',
    title: 'Grow Your Spiritual\nServices with My-Pandit',
    subtitle:
      'Join India\'s trusted platform and connect with devotees seeking authentic rituals and guidance.',
    logoText: 'ॐ',
  },
  {
    id: '2',
    title: 'Manage Bookings\nEffortlessly',
    subtitle:
      'Accept puja requests, schedule ceremonies and track your appointments — all in one place.',
    logoText: '📅',
  },
  {
    id: '3',
    title: 'Reach More\nDevotees',
    subtitle:
      'Get discovered by customers near you for havans, pujas, astrology and spiritual consultations.',
    logoText: '🙏',
  },
  {
    id: '4',
    title: 'Earn & Build\nYour Reputation',
    subtitle:
      'Receive payments securely and grow your profile with verified reviews from happy devotees.',
    logoText: '✦',
  },
  {
    id: '5',
    title: 'Your Pandit\nJourney Starts Here',
    subtitle:
      'Create your partner account and begin serving devotees through My-Pandit today.',
    logoText: '🪔',
  },
];

export default function HomeScreen() {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && token) {
      goToDashboard();
    }
  }, [isLoading, token]);

  if (isLoading || token) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFDF8' }}>
        <ActivityIndicator size="large" color={C.primary} />
      </View>
    );
  }

  return (
    <OnboardingCarousel
      slides={SLIDES}
      buttonText="Get Started"
      lastButtonText="Get Started"
      onFinish={goToSignIn}
    />
  );
}
