import { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import colors from '../assets/colors/colors';
import { RootTabScreenProps } from '../types';
import { loginCall } from '../actionCalls';
import { AuthContext } from '../state/AuthContext';

export default function LoginScreen({
  navigation,
}: RootTabScreenProps<'AuthStack'>) {
  const [isValid, setIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [emailIsValid, passwordIsValid]);

  useEffect(() => {
    if (email !== '' && email.includes('@')) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  useEffect(() => {
    if (password !== '' && password.length > 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  }, [password]);

  const handleSubmit = async () => {
    const res = await loginCall(
      {
        email: email,
        password: password,
      },
      dispatch,
    );

    if (res === 'success') {
      navigation.navigate('Root');
    } else {
      console.log('ログインに失敗しました。');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color={colors.black}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.loginContentsWrapper}>
        <Text style={styles.loginTitle}>ログイン</Text>
        <TextInput
          style={styles.textInput}
          multiline={false}
          placeholder={'メールアドレス'}
          autoFocus
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          multiline={false}
          placeholder={'パスワード (半角英数字6文字以上)'}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
        <TouchableOpacity
          style={[
            styles.loginButton,
            {
              backgroundColor: isValid ? '#FD951E' : colors.gray100,
            },
          ]}
          onPress={handleSubmit}
          disabled={isValid ? false : true}
        >
          <Text
            style={[
              styles.loginButtonTitle,
              {
                color: isValid ? colors.white : colors.gray400,
              },
            ]}
          >
            ログイン
          </Text>
        </TouchableOpacity>
        <Text style={styles.resettingText}>パスワードの再設定はこちら</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backIcon: {
    marginLeft: 16,
  },
  loginContentsWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  loginTitle: {
    fontFamily: 'inter_bold',
    fontSize: 18,
    color: colors.gray800,
    marginBottom: 8,
  },
  textInput: {
    width: 340,
    marginTop: 16,
    borderBottomColor: colors.gray300,
    borderBottomWidth: 1,
    fontFamily: 'inter_regular',
    fontSize: 16,
    paddingVertical: 8,
  },
  loginButton: {
    width: 340,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonTitle: {
    fontFamily: 'inter_bold',
    fontSize: 16,
    paddingVertical: 16,
  },
  resettingText: {
    fontFamily: 'inter_regular',
    fontSize: 12,
    color: colors.gray600,
    marginLeft: 16,
    marginTop: 24,
  },
});
