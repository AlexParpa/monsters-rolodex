import React, {Component} from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';


class App extends Component {
  constructor() {
    super(); // calls the constructor method on the Component class -> which gives access to this.state
    this.state = {
      monsters: [],
      searchField: ''
    }

    //this.handleChange = this.handleChange.bind(this); -> no longer needed if we define the function as and arrow function
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())  //method on the response object that returns the response in json format
    .then(users => this.setState({ monsters: users}));    
  }

  //lexical scoping
  onSearchChange = (e) => {    
    this.setState({searchField: e.target.value});
  }


  render() {    
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      )
    // Equivalent to 
    // const monsters = this.state.monsters
    // const searchField = this.state.searchField
    return (
      <div className="App">

      <h1>Monsters Rolodex !!!</h1>  
      <SearchBox 
        placeholder='search monsters'
        handleChange={this.onSearchChange}/>
      <CardList monsters={filteredMonsters}/>
      </div>
    ); 
  }
}

export default App;
