import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CategoryCard = ({ category, onPress }) => {
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Electronics': '📱',
      'Clothing': '👕',
      'Books': '📚',
      'Home': '🏠',
      'Sports': '⚽',
      'Beauty': '💄',
      'Toys': '🧸',
      'Automotive': '🚗',
      'Health': '💊',
      'Garden': '🌱',
    };
    return icons[categoryName] || '🛍️';
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Electronics': ['#667eea', '#764ba2'],
      'Clothing': ['#f093fb', '#f5576c'],
      'Books': ['#4facfe', '#00f2fe'],
      'Home': ['#43e97b', '#38f9d7'],
      'Sports': ['#fa709a', '#fee140'],
      'Beauty': ['#a8edea', '#fed6e3'],
      'Toys': ['#ffecd2', '#fcb69f'],
      'Automotive': ['#ff9a9e', '#fecfef'],
      'Health': ['#a8caba', '#5d4e75'],
      'Garden': ['#d299c2', '#fef9d7'],
    };
    return colors[categoryName] || ['#667eea', '#764ba2'];
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={getCategoryColor(category)}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.icon}>{getCategoryIcon(category)}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {category}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default CategoryCard;
