// screens/TrailersScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const TrailersScreen = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/movies/trailers');
        setTrailers(response.data.trailers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trailers:', error);
        setLoading(false);
      }
    };
    fetchTrailers();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={trailers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.trailerContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  trailerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default TrailersScreen;
