import { useEffect, useState } from 'react';
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
import axios from 'axios';

export default function RegisterScreen({
  navigation,
}: RootTabScreenProps<'AuthStack'>) {
  const [isValid, setIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordConfirmationIsValid, setPasswordConfirmationIsValid] =
    useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    if (emailIsValid && passwordIsValid && passwordConfirmationIsValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [emailIsValid, passwordIsValid, passwordConfirmation]);

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

  useEffect(() => {
    if (passwordConfirmation !== '' && passwordConfirmation.length > 5) {
      setPasswordConfirmationIsValid(true);
    } else {
      setPasswordConfirmationIsValid(false);
    }
  }, [passwordConfirmation]);

  const handleSubmit = async () => {
    if (password !== passwordConfirmation) {
      console.log('パスワードが一致しません。');
    } else {
      try {
        const user = {
          email: email,
          password: password,
        };
        await axios.post(
          'https://mugnet-api-dev.herokuapp.com/api/auth/register' ||
            'http://localhost:8000/api/auth/register',
          user,
        );
        console.log('新規登録に成功しました。');
        navigation.goBack();
      } catch (err) {
        console.log(err);
      }
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
        <Text style={styles.loginTitle}>新規登録</Text>
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
        <TextInput
          style={styles.textInput}
          multiline={false}
          placeholder={'確認用パスワード'}
          value={passwordConfirmation}
          onChangeText={(text: string) => setPasswordConfirmation(text)}
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
            新規登録
          </Text>
        </TouchableOpacity>
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
});
