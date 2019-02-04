import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPersonApi, resetValuesState } from '../actions'
import Grid from '@material-ui/core/Grid'
import Card from './card'
import Pagination from "react-js-pagination"
import Dialog from '@material-ui/core/Dialog'
import Details from '../details'

export class ListPeople extends Component {


  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      itemsPerPage: 4,
      modal: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setAnswers = this.setAnswers.bind(this)
  }

  handleClickOpen = () => {
    this.setState({ modal: true })
  }

  handleClose = () => {
    this.setState({ modal: false })
    this.props.resetValuesState(true)
  }

  setAnswers(value){
    this.props.setAnswer(value)
  }
  setVisualization(value) {
    this.props.setVisualization(value)
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
  }

  listItems(items, pageActual, limitItems) {
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

    const { people, answers, visualizations } = this.props.quiz
    const list = this.listItems(people, this.state.activePage, this.state.itemsPerPage)
    const checkAnswerExistence = personParam => answers.some(({ person }) => person === personParam)
    const checkVisualizationExistence = personParam => visualizations.some(({ person }) => person === personParam)
    
    return list.map((person, i) => (
      <span key={i}>
        <Card
          image={(person.perfil)}
          setAnswers={this.setAnswers}
          setVisualization={this.props.setVisualization}
          _key={person.person}
           answered={checkAnswerExistence(person.person)}
           visualized={checkVisualizationExistence(person.person)}
           onRequestOpen={this.handleClickOpen}
           getPersonApi={this.props.getPersonApi}
        />
      </span>


    ))

  }
  render() {

    const { people, person } = this.props.quiz
 
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
          <Dialog
            modal={false}
            open={this.state.modal}
            className={'box-modal'}
          >
            <Details
                onRequestClose={this.handleClose}
                person={person}
            />
        </Dialog>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({ quiz: state.quiz})
const mapDispatchToProps = dispatch => bindActionCreators({ getPersonApi, resetValuesState }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(ListPeople)