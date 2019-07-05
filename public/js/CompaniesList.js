class CompaniesList extends React.Component {
  render() {
    return (
      <table>
        <tbody>
        {this.props.companies.map((company, index) => {
          return (
            <tr>
              <td onClick={()=> { this.props.getCompany(company);
              this.props.toggleState('companiesListIsVisible', 'companyIsVisible')}}>
                <h3> {company.company_name} </h3>
              </td>
              <td className='company' onClick={()=> {
                this.props.getCompany(company);
                this.props.toggleState('companiesListIsVisible', 'companyIsVisible')}}>
                  <h3> {company.industry} </h3>
              </td>
              <td>
                <button className='button is-warning is-small'>Edit</button>
              </td>
              <td>
                <button className='button is-danger is-small' onClick={() =>
                this.props.deleteCompany(company, index)}>Delete</button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}
