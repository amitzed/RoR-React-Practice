class App extends React.Component {
  render () {
    return (
      <div className='section'>
        <h1 className='title'> Labor Department 2.0 </h1>
        <div className='columns'>
        <People />
        <Companies />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
