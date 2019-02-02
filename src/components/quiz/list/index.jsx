import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Card from './card'



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

    const { people } = this.props.quiz
    const list = this.listItems(people, this.state.activePage, this.state.itemsPerPage)

    return list.map((person, i) => (


      <span key={i}>
        <Card
          image={person.perfil}
        />
      </span>


    ))

  }
  render() {
    return (
      <div>
            <h3>lIST</h3>
           { this.renderRows() }
      </div>
    )
  }
}

const mapStateToProps = state => ({ quiz: state.quiz})
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(ListPeople)