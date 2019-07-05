
class Companies extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      companiesListIsVisible: true,
      addCompanyIsVisible: false,
      companyIsVisible: false,
      editCompanyIsVisible: false,
      companies : []
    }
    this.deleteCompany = this.deleteCompany.bind(this)
    this.getCompany = this.getCompany.bind(this)
    this.toggleState = this.toggleState.bind(this)

  }

  componentDidMount () {
    this.getCompanies();
  }

  deleteCompany (company, index) {
    fetch('companies/' + company.id,
    {
      method: 'DELETE'
    })
    .then(data => {
      this.setState({
        companies: [
          ...this.state.companies.slice(0, index),
          ...this.state.companies.slice(index + 1)
        ]
      })
    })
  }

  getCompany( company ) {
    this.setState({company: company})
  }

  getCompanies () {
    fetch('/companies')
      .then(response => response.json())
      .then(data => {
        this.setState({
          companies: data
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
      <div className='companies column'>
        <h2> Companies </h2>
        {this.state.companiesListIsVisible ?  <button className='button is-success'
        onClick={()=>this.toggleState('addCompanyIsVisible',
        'companiesListIsVisible')}>Add a Company</button> :''}
        {
          this.state.companiesListIsVisible ?
            <CompaniesList
             toggleState={this.toggleState}
             companies={this.state.companies}
             getCompany={this.getCompany}
             deleteCompany={this.deleteCompany}
             /> : ''
        }
        {
          this.state.addCompanyIsVisible ?
            <CompanyForm
             toggleState={this.toggleState}
            /> : ''
        }
        {
          this.state.companyIsVisible ?
          <Company
           toggleState={this.toggleState}
           company={this.state.company}
           /> : ''
        }
      </div>
    )
  }
}
