import { SignInScreen } from '@/components/SignInScreen';
import { router } from 'expo-router';

export default function SignInRoute() {
  return (
    <SignInScreen
      onLoginSuccess={() => router.replace('/(tabs)/dashboard')}
      onSignUp={() => router.push('/sign-up')}
      onForgotPassword={() => router.push('/forgot-password')}
      onSocialPress={() => {}}
    />
  );
}
