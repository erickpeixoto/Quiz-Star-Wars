import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


class Main extends Component {

    render() {
        return (
              <MuiThemeProvider>
                  <section className={`container-all`}>
                    <div className="row">
                        <div className="col s12">
                            {this.props.children}
                        </div>
                    </div>
                 </section> 
               </MuiThemeProvider>
        )
    }
}
export default Main
