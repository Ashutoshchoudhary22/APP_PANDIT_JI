import { Href, router } from 'expo-router';

export function goToGetStarted() {
  if (router.canDismiss?.()) {
    router.dismissAll();
  }
  router.replace('/' as Href);
}

export function goToSignIn() {
  router.replace('/sign-in' as Href);
}

export function goToDashboard() {
  router.replace('/dashboard' as Href);
}

export function goToProfile() {
  router.replace('/profile' as Href);
}
