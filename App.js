/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { StyleSheet, Image } from 'react-native';
import { fetchAllCurrencies } from './actions';
import { connect } from 'react-redux';
import { Container, Header, Item, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Input, Badge, Spinner, Drawer, Card, CardItem } from 'native-base';
import FilmCard from './components/film';

function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}
const Bounce = 300

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      film: {
        Title: 'Film'
      },
      films: [],
      currentPage: 1,
      filmsPerPage: 20,
      totalResults: 0,
      searchedString: '',
      viewedPages: []
    }
    //this.changePage = this.changePage.bind(this)
  }
  componentWillMount() {
    this.props.onFetch();
  }
  fetchBegin = debounce((e, isTyped) => {
    console.debug('eeeeveeent', e)
    this.fetchFilms(e, isTyped)
  }, Bounce)

  async fetchFilms(query, isTyped) {
    console.debug('fetchFilms', query);
    try {
      if(query.length) {
        var data = await Promise.all([
          fetch('http://www.omdbapi.com/?s='+query+'&page='+this.state.currentPage+'&apikey=4dfc64fa').then((response) => response.json()),// parse each response as json
          fetch('http://www.omdbapi.com/?s='+query+'&page='+(this.state.currentPage+1)+'&apikey=4dfc64fa').then((response) => response.json())
        ])
        console.log('data', data)
        for (var tenResult of data) {
          if(this.state.films[0] &&
            data[0].Search[0].Title !== this.state.films[0].Title &&
            this.state.viewedPages.includes(this.state.currentPage+1)
          ) {
            let newFilms = new Array()
            for (var obj of tenResult.Search) {
              newFilms.push(obj)
            }
            this.setState({
              films: newFilms,
            })
          } else {
            for (var obj of tenResult.Search) {
              this.setState(prevState => ({
                films: [...prevState.films, obj]
              }))
            }
          }
        }

        let totalFilms = Number(data[0].totalResults)
        this.setState(prevState => ({
          viewedPages: [...prevState.viewedPages, this.state.currentPage+1],
          totalResults: totalFilms,
          searchedString: query
        }))
        localStorage.setItem('query', query)
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    let { films } = this.state

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };

    const renderFilms = films.map((film, index) => {
      return (
        <Container key={index}>
          <FilmCard filmInfo={film} />
        </Container>
      )
    })
    return (
      <Container>
        <Content>
          <Header searchBar rounded>
            <Input 
              style={{padding: 10, backgroundColor: '#fff'}}
              placeholder="Type the film name..."
              onChangeText={(text) => this.fetchBegin(text, true)}/>
          </Header>
          
          <Card style={{flex: 0, marginTop: 20}}>
            {!renderFilms.length &&
              <Text className='defaultText'>
                Type any Film name you want to search!
              </Text>
            }
            {renderFilms}
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currencies: state.currencies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetch: () => {
      dispatch(fetchAllCurrencies());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)