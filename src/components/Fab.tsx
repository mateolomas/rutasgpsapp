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
      <TouchableOpacity onPress={onPress} style={styles.blackbutton}>
        <Icon name={iconName} size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 30,
    shadowColor: 'black',
  },
});

export default Fab;
