import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';


const Oferta = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nasza Oferta</Text>

      <View style={styles.section}>
        <Text style={styles.title}>Joga</Text>
        <Image source={require('../assets/yoga.jpg')} style={styles.image} />
        <Text style={styles.description}>Zajęcia jogi pozwalają na rozciągnięcie i wzmocnienie mięśni, a także na poprawę koncentracji i redukcję stresu.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Aerobik</Text>
        <Image source={require('../assets/aerobic.jpg')} style={styles.image} />
        <Text style={styles.description}>Aerobik to doskonały sposób na poprawę kondycji sercowo-naczyniowej oraz spalenie zbędnych kalorii.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Squash</Text>
        <Image source={require('../assets/squash.jpg')} style={styles.image} />
        <Text style={styles.description}>Gra w squasha jest intensywnym treningiem, który wymaga szybkości, zręczności i strategicznego myślenia.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Tenis Stołowy</Text>
        <Image source={require('../assets/table_tennis.jpg')} style={styles.image} />
        <Text style={styles.description}>Tenis stołowy rozwija koordynację, refleks oraz umiejętność szybkiego podejmowania decyzji.</Text>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default Oferta;
