import React from 'react';
import { View, Text } from 'react-native';

export default function ChatMessageTab (props: any) {
//   useEffect(() => {
//     console.log('---------------', props);
//   }, []);
  return (
        <View className="flex">
            <Text className='flex'>{props?.data.message}</Text>
        </View>
  );
}
