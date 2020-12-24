import React, {useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Camera = () => {
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef();

  const navigation = useNavigation();

  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      navigation.navigate('CreatePost', {videoUri: data.uri});
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        onRecordingStart={() => setIsRecording(true)}
        onRecordingEnd={() => setIsRecording(false)}
        style={styles.preview}
      />
      <TouchableOpacity
        onPress={onRecord}
        style={
          isRecording ? styles.buttonStop : styles.buttonRecord
        }
      />
    </View>
  );
};

export default Camera;
