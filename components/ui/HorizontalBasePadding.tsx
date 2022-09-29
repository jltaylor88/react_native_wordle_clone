import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

export default function HorizontalBasePadding({
  children,
}: PropsWithChildren): JSX.Element {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
});
