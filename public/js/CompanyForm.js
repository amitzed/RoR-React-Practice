class CompanyForm extends React.Component {
  render () {
    return (
      <div className='field'>
        <form>
          <label className='label' for='company_name'>Company</label>
          <div className='control'>
            <input className='input' type='text' id='company_name' />
          </div>

          <label className='label' for='industry'>Industry</label>
          <div className='control'>
            <input className='input' type='text' id='industry' />
          </div>

          <label className='label' for='rating'>Rating</label>
          <div className='control'>
            <input className='input' type='number' id='rating' />
          </div>

          <label className='label' for='mission_statement'>Mission</label>
          <div className='control'>
            <input className='input' type='text' id='mission_statement' />
          </div>

          <div className='control'>
            <input className='button is-primary' type='submit' />
          </div>
        </form>
          <button className="button is-link" onClick={()=>
          this.props.toggleState('companiesListIsVisible',
          'addCompanyIsVisible')}>Cancel</button>
      </div>
    )
  }
}
