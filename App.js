import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { fetchAllFilms } from './actions';
import { connect } from 'react-redux';
import { Container, Header, Content, Text, Input, Card } from 'native-base';
import FilmCard from './components/film';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    marginTop: 10,
    backgroundColor: '#000',
  },
  searchBar: {
    flex: 0.93,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  content: {
    color: '#fff',
    borderColor: '#000'
  },
  card: {
    flex: 0,
    marginTop: 20,
    color: '#fff',
    backgroundColor: '#000',
    borderColor: '#000'
  },
  text: {
    color: '#fff',
    borderColor: '#000',
    marginTop: 35,
    textAlign: 'center'
  }
})

function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}
const Bounce = 1000

class App extends Component {
  constructor(props) {
    super(props)
    this.isLoading = false;
    this.state = {
      film: {
        Title: 'Film'
      },
      films: [],
      currentPage: 1,
      searchedString: '',
      queryChanged: false,
      viewedPages: []
    }
  }

  componentWillReceiveProps() {
    this.isLoading = false;
  }

  fetchBegin = debounce((e) => {
    this.fetchFilms(e)
  }, Bounce)

  async fetchFilms(query) {
    this.isLoading = true;
    if (this.state.searchedString != query) {
      this.setState({queryChanged: true})
    } else {
      this.setState({queryChanged: false})
    }
    
    this.props.doFetch(query, this.state.currentPage, this.state.queryChanged)
    
    this.setState(prevState => ({
      searchedString: query,
      currentPage: prevState.currentPage + 1
    }));
  }

  isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render() {
    let { films } = this.props
    console.log(films)
    let renderFilms = []
    if (films && films.length) {
      renderFilms = films.map((film, index) => {
        return (
          <Container
            key={index}
            style={styles.container}>
            <FilmCard filmInfo={film} />
          </Container>
        )
      })
    }
    return (
      <Container style={styles.container}>
        <Header
          style={styles.header}>
          <Input
            style={styles.searchBar}
            placeholder="Type the film name..."
            onChangeText={(text) => this.fetchBegin(text)}/>
        </Header>
        <Content 
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent) && !this.isLoading) {
              this.fetchFilms(this.state.searchedString);
            }
          }}
          style={styles.content}>
          
          <Card style={styles.card}>
            {!renderFilms.length &&
              <Text style={styles.text}>
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
    films: state.films
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doFetch: (query, currentPage, queryChanged) => {
      dispatch(fetchAllFilms(query, currentPage, queryChanged));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)