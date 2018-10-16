import React, { Component } from 'react';
import {LineGraph} from './LineGraph'
import {PRPI, HDBRPI} from '../dataProcessing/dataApi'

class ChartDisplay extends Component {
    constructor(props) {
        super(props)
        this.state={
            PRPI: [],
            HDBRPI:[]
        }
    }
    
    async componentDidMount(){
        try{
            const PRPindexItems = await PRPI
            this.setState({PRPI:PRPindexItems})
            const HDBRPIindexItems = await HDBRPI
            this.setState({HDBRPI:HDBRPIindexItems})
            } catch (error) {throw error}
      }

    render() {
        return (
            <LineGraph {...this.state}/>
        );
    }
}

export default ChartDisplay;
