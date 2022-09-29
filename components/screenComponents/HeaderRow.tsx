import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import IconButton from '../ui/IconButton';

export default function HeaderRow(): JSX.Element {
  return (
    <View style={styles.headerInnerContainer}>
      <View style={styles.questionContainer}>
        <IconButton
          name="question-circle"
          size={18}
          color={Colors.gray300}
          onPress={() => {}}
        />
      </View>
      <View style={[styles.titleContainer]}>
        <Text style={styles.titleText}>WORDLE</Text>
      </View>
      <View style={[styles.rightButtonsContainer]}>
        <IconButton
          name="chart-bar"
          size={18}
          color={Colors.gray300}
          onPress={() => {}}
        />

        <IconButton
          name="cog"
          size={18}
          color={Colors.gray300}
          onPress={() => {}}
          style={styles.rightButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 8,
  },

  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
    letterSpacing: 4,
  },
  rightButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  rightButton: {
    marginLeft: 14,
  },
  questionContainer: {
    flex: 1,
  },
});
