
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Main from '../components/main'
import App from '../components/app'


 
class Routes extends Component {

    render() {
        const { settings } = this.props
        
        return (
            <Router>
              
                <section>
                    <Main>
                        <Route path="/app" component={App}/> 
                        <Route exact path="/" component={App}/>
                   </Main>    
               </section>
            </Router>
      )
    }
}
const mapStateToProps = state => ({ settings: state.settings })
export default connect(mapStateToProps)(Routes)
