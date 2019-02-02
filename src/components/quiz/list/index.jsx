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
console.warn('Acessou')
    const { people } = this.props.quiz
    const list = this.listItems(people, this.state.activePage, this.state.itemsPerPage)

    return list.map((person, i) => (


      <span key={i}>
        <Card
          image={person.perfil}
          _key={i}
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