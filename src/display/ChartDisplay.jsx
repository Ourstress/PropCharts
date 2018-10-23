import React, { Component } from 'react';
import {LineGraph} from './LineGraph'
import Menu from './Menu'
// import {PRPI, HDBRPI, concatArray} from '../dataProcessing/dataApi'
 import {apiData} from '../dataProcessing/dataContext'
// import * as data from '../dataProcessing/dataApi'

class ChartDisplay extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(event){
        let name = event.target.name
        console.log(name)
        this.setState({
          [name]: event.target.name
        })
    }

    render() {
        const items = ["PRPI","HDBRPI"]
        return (
            <React.Fragment>
            { items.map(item => <Menu key={item} name={item} handleClick={this.handleClick}/>)
            }
                <apiData.Consumer>
                    {data => <LineGraph data={data}/>}
                </apiData.Consumer>
            </React.Fragment>
        )
    }
}

export default ChartDisplay;
