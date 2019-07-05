
class People extends React.Component {
  constructor (props){
  super(props)
  this.state = {
    peopleListIsVisible: true,
    addPersonIsVisible: false,
    personIsVisible: false,
    editPersonIsVisible: false,
    people : [],
    person: {}
    }
    this.deletePerson = this.deletePerson.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.getPerson = this.getPerson.bind(this)
    this.toggleState = this.toggleState.bind(this)
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
  }

  componentDidMount () {
    this.getPeople();
  }

  deletePerson (person, index) {
    fetch('people/' + person.id,
      {
        method: 'DELETE'
      })
      .then(data => {
        this.setState({
          people: [
            ...this.state.people.slice(0, index),
            ...this.state.people.slice(index + 1)
          ]
        })
      })
  }

  handleCreate (person) {
    const updatedPeople = this.state.people
    updatedPeople.unshift(person)
    this.setState({people: updatedPeople})
  }

  handleCreateSubmit (person) {
    fetch('/people', {
      body: JSON.stringify(person),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdPerson => {
        return createdPerson.json()
      })
      .then(jsonedPerson => {
        this.handleCreate(jsonedPerson)
        this.toggleState('addPersonIsVisible', 'peopleListIsVisible')
      })
      .catch(error => console.log(error))
    }

    handleUpdateSubmit (person) {
    fetch('/people/'+ person.id, {
      body: JSON.stringify(person),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(updatedPerson => {
        return updatedPerson.json()
      })
      .then(jsonedPerson => {
        //need to update state be naughty, call that db!
        this.getPeople()
        this.toggleState('peopleListIsVisible', 'personIsVisible')
      })
      .catch(error => console.log(error))

}

  getPerson( person ) {
    this.setState({person: person})
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


  render () {
    return (
      <div className='people column'>
        <h2> People </h2>
        {this.state.peopleListIsVisible ? <button className='button is-success' onClick={()=>this.toggleState('addPersonIsVisible', 'peopleListIsVisible')}>Add a Person</button> :''}
        {
          this.state.peopleListIsVisible ?
            <PeopleList
             toggleState={this.toggleState}
             people={this.state.people}
             getPerson={this.getPerson}
             deletePerson={this.deletePerson}
            /> : ''
        }
        {
          this.state.addPersonIsVisible ?
           <PersonForm
            toggleState={this.toggleState}
            handleCreate={this.handleCreate}
            handleSubmit={this.handleCreateSubmit}
           /> : ''
         }
        {
          this.state.personIsVisible ?
           <Person
            toggleState={this.toggleState}
            person={this.state.person}
            handleSubmit={this.handleUpdateSubmit}
           /> : ''
        }
      </div>
    )
  }
}
