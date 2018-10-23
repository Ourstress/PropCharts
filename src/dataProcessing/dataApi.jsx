import { normalize } from 'normalizr'
import {dataGovRequest} from './normalizr'
const axios = require('axios');

// urls store all the API endpoints that we intend to obtain data from

const urls = {
    PRPI: "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=947b5cbe-0b0a-4fdb-b06e-aca1e34d87fd",
    HDBRPI: "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=52e93430-01b7-4de0-80df-bc83d0afed40"
}

// Mapper uses JSON.stringify to turn data[key] which is an object into a string for regex match

const mapper = (data, dataValue, datasetName) => Object.keys(data).map(key => 
    {   let a = JSON.stringify(data[key])
        return ({x: a.match(/\d\d\d\d/)+"-"+`${a.includes("Q1")?"01":a.includes("Q2")?"04":a.includes("Q3")?"07":a.includes("Q4")?"10": ""}`
        , [datasetName]:data[key][dataValue]})})

const getFromDataGov = async (url, dataValue, datasetName) => {
    const response = await axios(url)
    const normalizedData = normalize(response, dataGovRequest)
    return mapper(normalizedData.entities.record, dataValue, datasetName) 
    }

// for multiple arrays, concat them 2 by 2. 
// eg let result1 = concatArray(arr1,arr2), then result2 = concatArray(result1,arr3)

export const concatArray = (array1,array2) => {
    let map = new Map()
    let result = array1.concat(array2).reduce(function (r, o) {
        let temp;
        if (map.has(o.x)) {
            Object.assign(map.get(o.x), o);
        } else {
            temp = Object.assign({}, o);
            map.set(temp.x, temp);
            r.push(temp);
        }
        return r;
    }, []);
    return result
}        
export const PRPI = getFromDataGov(urls.PRPI, "value", "PRPI")
export const HDBRPI = getFromDataGov(urls.HDBRPI, "index", "HDBRPI")