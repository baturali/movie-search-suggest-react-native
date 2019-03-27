import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
import { Card, CardItem, Text } from 'native-base';

const styles = StyleSheet.create({
  posterImage: {
    alignSelf: 'stretch',
    height: 400,
    width: undefined,
    resizeMode:'contain',
    flex: 1
  }
});

const FilmCard = (props) => {
  const filmObj = props.filmInfo
  const defaultImage = 'http://tr.web.img4.acsta.net/r_1280_720/pictures/bzp/01/121163.jpg'
  let Poster = filmObj.Poster || defaultImage
  if(filmObj.Poster == 'N/A') Poster = defaultImage
  
  return (
    <Card>
      <CardItem cardBody>
        <Image
          style={styles.posterImage}
          source={{uri: Poster}}/>
      </CardItem>
      <CardItem>
        <Text>
          Title: { filmObj.Title }
        </Text>
      </CardItem>
      <CardItem>
        <Text>
          Year: { filmObj.Year }
        </Text>
      </CardItem>
    </Card>
  );
}

export default FilmCard;