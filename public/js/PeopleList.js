class PeopleList extends React.Component {
  render (){
    return (
      <table>
        <tbody>
          {this.props.people.map((person, index) => {
            return (
              <tr>
                <td onClick={()=> {this.props.getPerson(person); this.props.toggleState('peopleListIsVisible', 'personIsVisible')}}>
                  <img src={person.avatar} alt={person.name} />
                </td>
                <td className='person' onClick={()=> { this.props.getPerson(person); this.props.toggleState('peopleListIsVisible', 'personIsVisible')}}>
                  <h3> {person.name} </h3>
                </td>
                <td>
                    <button className='button is-warning is-small'>Edit</button>
                </td>
                <td>
                    <button className='button is-danger is-small' onClick={() => this.props.deletePerson(person, index)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
