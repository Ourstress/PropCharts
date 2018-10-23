import React, { Component } from 'react';
import * as data from './dataApi'

export const apiData = React.createContext()

class DataContext extends Component {
    constructor(props) {
        super(props);
        this.state={
          data: []
        }
      }
    
    async componentDidMount(){
        const getData = async name => {
            const apiResult = await data[name]
            this.setState({[name]:apiResult})
        }
        try{
            await getData("PRPI")
            await getData("HDBRPI")
            this.setState({PRPI_HDBRPI: await data.concatArray(this.state.PRPI,this.state.HDBRPI)})
            this.setState({data: this.state.PRPI_HDBRPI})
            } catch (error) {throw error}
      }
        
    render() {
        const data = this.state.data;
        return (
        <apiData.Provider value={data}>
        {this.props.children}    
        </apiData.Provider>
        );
    }
}

export default DataContext;
