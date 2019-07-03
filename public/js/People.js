class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleListIsVisible:true,
      addPersonIsVisible:false,
      personIsVisible:false,
      editPersonIsVisible:false,
      people: [],
      person: {}
    }
    this.toggleState = this.toggleState.bind(this)
    this.getPerson = this.getPerson.bind(this)
  }
  componentDidMount () {
    this.getPeople();
  }

  getPerson( person ) {
    this.setState({person: person })
  }

  getPeople () {
    fetch('/people')
      .then(response => response.json())
      .then(data => {
        this.setState({
          people: data
        })
      }).catch(error => console.log(error))
  }

  toggleState (st1, st2) {
    this.setState({
      [st1]: !this.state[st1],
      [st2]: !this.state[st2]
    })
  }

  render() {
    return (
      <div className="people column">
        <h2> People </h2>
        {this.state.peopleListIsVisible ? <button className="button is-success" onClick={()=>this.toggleState('addPersonIsVisible', 'peopleListIsVisible')}>Add a Person</button> :''}

        {
          this.state.peopleListIsVisible ?
          <PeopleList
            toggleState={this.toggleState}
            people={this.state.people}
            getPerson={this.getPerson}
          /> : ''
         }
        {
          this.state.addPersonIsVisible ?
          <PersonForm
           toggleState={this.toggleState}
          /> : ''
        }
        {
          this.state.personIsVisible ?
          <Person
           toggleState={this.toggleState}
           person={this.state.person}
          /> : ''
        }
      </div>
    )
  }
}
