import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Grid from '@material-ui/core/Grid'
import Card from './card'
import Pagination from "react-js-pagination"


export class ListPeople extends Component {


  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      itemsPerPage: 3
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setAnswers = this.setAnswers.bind(this)
  }

  setAnswers(value){
    console.error('borisss: ', value)
    this.props.setAnswer(value)

  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
  }

  listItems(items, pageActual, limitItems) {
    console.warn('Listou')
    let result = []
    let totalPage = Math.ceil(items.length / limitItems)
    let count = (pageActual * limitItems) - limitItems
    let delimiter = count + limitItems

    if (pageActual <= totalPage) {
      for (let i = count; i < delimiter; i++) {
        if (items[i] != null) {
          result.push(items[i])
        }
        count++
      }
    }
    return result
  }


  renderRows() {

    const { people, answers } = this.props.quiz
    const list = this.listItems(people, this.state.activePage, this.state.itemsPerPage)
    const checkAnswerExistence = personParam => answers.some(({ person }) => person === personParam)
    
    return list.map((person, i) => (
      <span key={i}>
        <Card
          image={(person.perfil)}
          setAnswers={this.setAnswers}
          _key={person.person}
           answered={checkAnswerExistence(person.person)}
        />
      </span>


    ))

  }
  render() {

    const { people } = this.props.quiz

    return (
      <Grid container spacing={24}>
          <Grid item xs={12} className={'centerAlign'}>
              { this.renderRows() }
          </Grid>
           <Grid item xs={12}>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.itemsPerPage}
                  totalItemsCount={(people) && people.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
          </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({ quiz: state.quiz})
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(ListPeople)