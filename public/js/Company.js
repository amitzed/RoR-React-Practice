class Company extends React.Component {

  render () {
    return (
      <div>
        <div className='tile is-ancestor'>
          <div className='tile is-2'>
            <div>
              <h3> {this.props.company.company_name} </h3>
            </div>
          </div>
          <div className='tile is-2'></div>
          <div className='tile'>
            <div>
              <h3 className='tile is-child box'><span>Company Name:</span>
              {this.props.company.company_name} </h3>
              <p className='tile is-child box'><span>Industry:</span>
              {this.props.company.industry} </p>
              <p className='tile is-child box'><span>Rating:</span>
              {this.props.company.rating} </p>
              <p className='tile is-child box'><span>Mission:</span>
              {this.props.company.mission_statement} </p>

          </div>
          <div className='tile'>
          </div>
          <div className='tile'>
            <button className='button is-warning' onClick={()=>
            this.props.toggleState('companiesListIsVisible', 'companyIsVisible')}>See Full List</button>
          </div>
        </div>
      </div>
      <CompanyForm />
    </div>
    )
  }
}
