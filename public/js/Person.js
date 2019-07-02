class Person extends React.Component {
  render () {
    return (
      <div>
        <div className='tile is-ancestor'>
          <div className='tile is-2'>
            <div>
              <img src="https://robohash.org/static_react_component13/?size=100x100&set=set4" alt="Felix Fancy Pants" />
            </div>
          </div>
          <div className='tile is-2'></div>
          <div className='tile'>
            <div>
              <h3 className='tile is-child box'><span>Name:</span> Felix Fancy Pants </h3>
              <p className='tile is-child box'><span>Phone:</span> 555-555-5555</p>
              <p className='tile is-child box'><span>Key Skill:</span> Bug Squashing</p>
              <p className='tile is-child box'><span>Age:</span> 4 </p>
              <p className='tile is-child box'><span>Employed at:</span> Petscapades </p>
            </div>
            <div className='tile'>
            </div>
          <div className='tile'>
            <button className='button is-warning' onClick={()=> this.props.toggleState('peopleListIsVisible', 'personIsVisible')}>See Full List</button>
          </div>
          </div>
        </div>
        <PersonForm />
      </div>
    )
  }
}
