import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Picker, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTicketDetails } from '../slices/ticketSlice';
import { useRoute, useNavigation } from '@react-navigation/native';

const TicketBookingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = route.params;

  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState('1');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showTimes] = useState(['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.5:5002/api/upcomingmovies/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movie details', error);
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleBookingConfirmation = () => {
    dispatch(setTicketDetails({ movie, seats, date, time }));
    navigation.navigate('BookingConfirmation'); // Ensure 'BookingConfirmation' exists
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (!movie) {
    return <Text>No movie details available</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>Release Date: {movie.release_date}</Text>
      <Text style={styles.text}>Popularity: {movie.popularity}</Text>
      <Text style={styles.text}>{movie.overview}</Text>

      <TextInput
        style={styles.input}
        placeholder="Number of Seats"
        keyboardType="numeric"
        value={seats}
        onChangeText={setSeats}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        // You can use a date picker component for better UX
      />
      <Picker
        selectedValue={time}
        style={styles.picker}
        onValueChange={(itemValue) => setTime(itemValue)}
      >
        <Picker.Item label="Select a time" value="" />
        {showTimes.map((showTime, index) => (
          <Picker.Item key={index} label={showTime} value={showTime} />
        ))}
      </Picker>

      <Button title="Confirm Booking" onPress={handleBookingConfirmation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TicketBookingScreen;
