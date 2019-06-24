class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleListIsVisible:true,
      addPersonIsVisible:false,
      personIsVisible:false,
      editPersonIsVisible:false
    }
    this.toggleState = this.toggleState.bind(this)
  }

  toggleState (st) {
    this.setState({ [st]: !this.state[st] })
  }

  render() {
    return (
      <div className="people column">
        <h2> People </h2>
        <button className="button is-success" onClick={()=>this.toggleState('addPersonIsVisible')}>Add a Person</button>
        <table>
          <tbody>
            <tr>
              <td>
                <img src="https://robohash.org/static_react_component13/?size=100x100&set=set4" alt="Felix"/>
              </td>
              <td className='person'>
                <h3> Felix Fancy Pants </h3>
              </td>
              <td>
                <button className='button is-warning is-small'>Edit</button>
              </td>
              <td>
                <button className='button is-danger is-small'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        {this.state.addPersonIsVisible ? <PersonForm/> : ''}
        {this.state.personIsVisible ? <Person/> : ''}
      </div>
    )
  }
}
