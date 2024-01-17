import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login'
import Register from './screens/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Chat from './screens/Chat';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName='Login'
      >  
        <Stack.Screen
        name='Login'
        component={Login}
        />
        <Stack.Screen
        name='Register'
        component={Register}
        />
        <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerLeft: null,
          headerBackVisible: false, 
          title:'Active Users',
          headerTitleAlign:'center',
        }}
        />
        <Stack.Screen
        name='Chat'
        component={Chat}
        options={({route}) => ({
          headerBackVisible:false,
          title:route.params.name,
          headerTitleAlign:'center'
        })}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
