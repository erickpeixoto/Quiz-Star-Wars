
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Main from '../components/main'
import Quiz from '../components/quiz'
import Ranking from '../components/ranking'
import App from '../components/app'


 
class Routes extends Component {

    render() {
        const { settings } = this.props
        
        return (
            <Router>
              
                <section>
                    <Main>
                        <Route exact path="/" component={App}/>
                        <Route exact path="/playing" component={Quiz} /> 
                        <Route exact path="/ranking" component={Ranking} /> 
                   </Main>    
               </section>
            </Router>
      )
    }
}
const mapStateToProps = state => ({ settings: state.settings })
export default connect(mapStateToProps)(Routes)
