import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LatestMoviesScreen = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:5002/api/upcomingmovies');
        setLatestMovies(response.data.results); // Adjust according to your API response structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest movies:', error);
        setLoading(false);
      }
    };
    fetchLatestMovies();
  }, []);

  const handleMoviePress = (id) => {
    navigation.navigate('TicketBooking', { id }); // Ensure 'TicketBooking' matches the route name
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <FlatList
      data={latestMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleMoviePress(item.id)} style={styles.movieContainer}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LatestMoviesScreen;
