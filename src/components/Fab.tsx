import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Fab = ({iconName, onPress, style}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.blackbutton}>
        <Icon name={iconName} size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackbutton: {
    justifyContent: 'center',

    alignSelf: 'center',
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30,
    zIndex: 9999,
  },
});

export default Fab;
