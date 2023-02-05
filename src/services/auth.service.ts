import auth from '@react-native-firebase/auth';

class AuthService {
  async loginAnonymously() {
    try {
      const userCredential = await auth().signInAnonymously();
      return userCredential.user.uid;
    } catch (error: any) {
      console.error(error);
    }
  }

  async logout() {
    try {
      await auth().signOut();
      console.log('User signed out!');
    } catch (error: any) {
      console.error(error);
    }
  }
}

const authService = new AuthService();

export default authService;
