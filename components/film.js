import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

const styles = StyleSheet.create({
  cards: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 15,
    borderColor: '#000'
  },
  cardItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
  },
  posterImage: {
    alignSelf: 'stretch',
    width: null, height: 500,
    resizeMode: 'contain',
    flex: 1
  },
  textBox: {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    textAlign: 'center',
    fontSize: 20
  }
});

const FilmCard = (props) => {
  const filmObj = props.filmInfo
  const defaultImage = 'http://tr.web.img4.acsta.net/r_1280_720/pictures/bzp/01/121163.jpg'
  let Poster = filmObj.Poster || defaultImage
  if(filmObj.Poster == 'N/A') Poster = defaultImage
  
  return (
    <Card style={styles.cards}>
      <CardItem style={styles.cardItem}>
        <Image
          style={styles.posterImage}
          source={{uri: Poster}}/>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <Text
          style={styles.textBox}>
          Title: { filmObj.Title }
        </Text>
      </CardItem>
      <CardItem style={styles.cardItem}>
        <Text
          style={styles.textBox}>
          Year: { filmObj.Year }
        </Text>
      </CardItem>
    </Card>
  );
}

export default FilmCard;