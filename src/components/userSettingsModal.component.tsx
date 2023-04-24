/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';

export default function UserSettingsModal (props: any) {
  console.log('--------->>', props.showModal);

  const [showModal, setShowModal] = useState(props.showModal);
  return (
    <Modal
        visible={showModal}
    >
    <View className='bg-white flex-1'>
        <Text className='text-black'>Bottom Sheet</Text>
    </View>
    <View style={{
      bottom: 0,
      position: 'absolute',
      width: '100%',
      backgroundColor: 'white',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15
    }}>
        <Text className='text-black'>Bottom Sheet</Text>
    </View>

    </Modal>
  );
}
