
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Replace with your local IP address or endpoint
        const response = await axios.get('http://192.168.1.5:5002/api/movies');
        setMovies(response.data.results); // Adjust according to your API response structure
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.movieContainer}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  poster: {
    width: 100,
    height: 150,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default MoviesScreen;
