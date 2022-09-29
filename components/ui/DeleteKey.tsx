import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constants/colors';
import Key from './Key';

export default function DeleteKey(): JSX.Element {
  return (
    <Key style={styles.button}>
      <Icon name="backspace-outline" color={Colors.gray400} size={28} />
    </Key>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },

  pressed: {
    opacity: 0.7,
    elevation: 0,
    backgroundColor: Colors.gray300,
  },
});
