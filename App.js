import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Adjust the path as needed
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LatestMoviesScreen from './screens/LatestMoviesScreen'; // Adjust the path as needed
import TicketBookingScreen from './screens/TicketBookingsScreen'; // Adjust the path as needed
import MoviesScreen from './screens/MoviesScreen'; // Adjust or create this screen if needed

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LatestMovies">
          <Stack.Screen name="LatestMovies" component={LatestMoviesScreen} />
          <Stack.Screen name="TicketBooking" component={TicketBookingScreen} />
          <Stack.Screen name="Home" component={MoviesScreen} /> {/* Example HomeScreen */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
