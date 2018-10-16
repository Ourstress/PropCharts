import React, { Component } from 'react';
import {LineGraph} from './LineGraph'
import {PRPI, HDBRPI, concatArray} from '../dataProcessing/dataApi'

class ChartDisplay extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: []
        }
    }
    
    async componentDidMount(){
        try{
            const PRPindexItems = await PRPI
            const HDBRPIindexItems = await HDBRPI
            let result = concatArray(PRPindexItems,HDBRPIindexItems)
            this.setState({data:result})
            } catch (error) {throw error}
      }

    render() {
        return (
            <LineGraph {...this.state.data}/>
        );
    }
}

export default ChartDisplay;
