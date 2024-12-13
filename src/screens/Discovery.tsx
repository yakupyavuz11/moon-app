import { StatusBar } from 'expo-status-bar'
import { FlatList, View, Dimensions, SafeAreaView } from 'react-native'

import { useColorScheme } from 'nativewind'
import Product from '@/components/Product'
import Navbar from '@/components/Navbar'
import users from '@/data/users'

// calculate the width of each column using the screen dimensions
const numColumns = 2
const screen_width = Dimensions.get('window').width
const column_width = screen_width / numColumns

export default function Discovery() {
  const { colorScheme } = useColorScheme()
  return (
    <View className='flex-[1] bg-white dark:bg-dark pt-8'>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
      <SafeAreaView />
      <FlatList
        data={users}
        numColumns={numColumns}
        renderItem={(product_data) => {
          return (
            <Product
              image={product_data.item.image}
              name={product_data.item.name}
              price={product_data.item.status}
              column_width={column_width}
            />
          )
        }}
        keyExtractor={(item) => {
          return item.key
        }}
      />
      <Navbar />
    </View>
  )
}