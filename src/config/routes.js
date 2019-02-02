
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Main from '../components/main'
import Quiz from '../components/quiz'
import App from '../components/app'


 
class Routes extends Component {

    render() {
        const { settings } = this.props
        
        return (
            <Router>
              
                <section>
                    <Main>
                        <Route path="/playing" component={Quiz} /> 
                        <Route exact path="/" component={App}/>
                   </Main>    
               </section>
            </Router>
      )
    }
}
const mapStateToProps = state => ({ settings: state.settings })
export default connect(mapStateToProps)(Routes)
