import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from './constants/colors';
import HorizontalBasePadding from './components/ui/HorizontalBasePadding';
import HeaderRow from './components/screenComponents/HeaderRow';
import Guesses from './components/ui/Guesses';
import WordleKeyBoard from './components/ui/WordleKeyBoard';
import {Provider} from 'react-redux';
import RootStore from './store/RootStore';
import {useAppDispatch} from './store/hooks';
import {setInitialValues} from './store/Letters/lettersSlice';
import {generateAlphabetArray} from './utils/basicHelpers';
import {LetterStates} from './components/ui/LetterTile';
import {setActiveRow, setInitialRows} from './store/Letters/rowsSlice';

const initialStatuses: {id: string; status: LetterStates}[] =
  generateAlphabetArray().map(el => ({
    id: el,
    status: 'preCheck',
  }));

const DUMMY_SELECTED = [
  {
    id: 0,
    letters: [],
  },
  {
    id: 1,
    letters: [],
  },
  {
    id: 2,
    letters: [],
  },
  {
    id: 3,
    letters: [],
  },
  {
    id: 4,
    letters: [],
  },
  {
    id: 5,
    letters: [],
  },
];

const InnerApp = (): JSX.Element => {
  // Load the letters, selected values and current row
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setInitialValues(initialStatuses));
    dispatch(setInitialRows(DUMMY_SELECTED));
    dispatch(setActiveRow(0));
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <View style={styles.headerOuterContainer}>
        <HorizontalBasePadding>
          <HeaderRow />
        </HorizontalBasePadding>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.guessesContainer}>
          <HorizontalBasePadding>
            <Guesses />
          </HorizontalBasePadding>
        </View>

        <HorizontalBasePadding>
          <WordleKeyBoard />
        </HorizontalBasePadding>
      </View>
    </SafeAreaView>
  );
};

export default function App(): JSX.Element {
  return (
    <Provider store={RootStore}>
      <InnerApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  guessesContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  headerOuterContainer: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.gray100,
  },
  bodyContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
