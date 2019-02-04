import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getPersonApi } from '../actions'
import Grid from '@material-ui/core/Grid'
import Pagination from "react-js-pagination"
export class ListPeople extends Component {


  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      itemsPerPage: 5
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
  }

  listItems(items, pageActual, limitItems) {
    if(items && items.length){

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
  }


  renderRows() {
    
    const list = this.listItems(JSON.parse(localStorage.getItem('ranking')), this.state.activePage, this.state.itemsPerPage)
    if (list && list.length) {

          return list.map((person, i) => (
            <Grid container xs={12} className={'item-ranking'}>
              <Grid item xs={4}>
                  {person.name}
              </Grid>
              <Grid item xs={4}>
                  {person.email}
              </Grid>
              <Grid item xs={4}>
                  {person.grade}
              </Grid>
            </Grid>
    
      ))
    }else{
      return (
        <Grid container xs={12} className={'item-ranking'}>
          <Grid item xs={12}>
            Sem registros
          </Grid>
         </Grid>
      )
    }

  }
  render() {

    const grades =  JSON.parse(localStorage.getItem('ranking'))
 
    return (
      <Grid container spacing={24}>
          <Grid item xs={12} className={'centerAlign'}>
            <Grid container xs={12}>
              <Grid item xs={4} className={'bold'}>
                  <span>Nome</span>
              </Grid>
              <Grid item xs={4} className={'bold'}>
                  <span>E-mail</span>
              </Grid>
              <Grid item xs={4} className={'bold'}>
                  <span>Pontos</span>
              </Grid>
            </Grid>
              { this.renderRows() }
          </Grid>
           <Grid item xs={12}>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.itemsPerPage}
                  totalItemsCount={(grades) && grades.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
          </Grid>
       </Grid>
    )
  }
}

const mapStateToProps = state => ({ quiz: state.quiz})
const mapDispatchToProps = dispatch => bindActionCreators({ getPersonApi }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(ListPeople)