import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../assets/colors/colors';
import { RootTabScreenProps } from '../types';

export default function AuthScreen({
  navigation,
}: RootTabScreenProps<'AuthStack'>) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerButtonTitle}>新規登録</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonTitle}>ログイン</Text>
      </TouchableOpacity>
      <View style={styles.footerWrapper}>
        <Text style={styles.guideText}>利用規約</Text>
        <Text style={styles.policyText}>プライバシーポリシー</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  registerButton: {
    marginTop: 580, // 暫定対応
    marginBottom: 24,
    width: 340,
    backgroundColor: '#FD951E',
    borderRadius: 16,
    alignItems: 'center',
  },
  loginButton: {
    width: 340,
    backgroundColor: colors.gray100,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerButtonTitle: {
    fontFamily: 'inter_bold',
    fontSize: 16,
    color: colors.white,
    paddingVertical: 16,
  },
  loginButtonTitle: {
    fontFamily: 'inter_bold',
    fontSize: 16,
    color: colors.gray800,
    paddingVertical: 16,
  },
  footerWrapper: {
    flexDirection: 'row',
    marginTop: 32,
  },
  guideText: {
    fontFamily: 'inter_regular',
    fontSize: 12,
    color: colors.gray600,
    marginLeft: 16,
  },
  policyText: {
    fontFamily: 'inter_regular',
    fontSize: 12,
    color: colors.gray600,
    marginLeft: 40,
  },
});
