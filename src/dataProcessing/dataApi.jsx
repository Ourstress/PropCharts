import { normalize } from 'normalizr'
import {dataGovRequest} from './normalizr'
const axios = require('axios');

const urls = {
    PRPI: "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=947b5cbe-0b0a-4fdb-b06e-aca1e34d87fd",
    HDBRPI: "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=52e93430-01b7-4de0-80df-bc83d0afed40"
}

const mapper = (data, dataValue) => Object.keys(data).map(key => 
    {   let a = JSON.stringify(data[key])
        return ({x: a.match(/\d\d\d\d/)+"-"+`${a.includes("Q1")?"01":a.includes("Q2")?"04":a.includes("Q3")?"07":a.includes("Q4")?"04": ""}`
        , y:data[key][dataValue]})})

const getFromDataGov = async (url, dataValue) => {
    const response = await axios(url)
    const normalizedData = normalize(response, dataGovRequest)
    return mapper(normalizedData.entities.record, dataValue) 
    }

export const concatArray = (array1,array2) => array1.concat(array2).reduce(function (r, o) {
        let map = new Map()
        let temp;
        if (map.has(o.id)) {
            Object.assign(map.get(o.id), o);
        } else {
            temp = Object.assign({}, o);
            map.set(temp.id, temp);
            r.push(temp);
        }
        return r;
    }, []);    
export const PRPI = getFromDataGov(urls.PRPI, "value")
export const HDBRPI = getFromDataGov(urls.HDBRPI, "index")