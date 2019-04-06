import React, {Component} from 'react';
import { fetchAllFilms } from './actions';
import { connect } from 'react-redux';
import { Container, Header, Content, Text, Input, Card } from 'native-base';
import FilmCard from './components/film';

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
    console.log('app', films)
    let renderFilms = [];
    if (films && films.length) {
      renderFilms = films.map((film, index) => {
        return (
          <Container key={index}>
            <FilmCard filmInfo={film} />
          </Container>
        )
      })
    }
    return (
      <Container>
        <Content 
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent) && !this.isLoading) {
              this.fetchFilms(this.state.searchedString);
            }
          }}>
          <Header searchBar rounded>
            <Input 
              style={{padding: 10, backgroundColor: '#fff'}}
              placeholder="Type the film name..."
              onChangeText={(text) => this.fetchBegin(text)}/>
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