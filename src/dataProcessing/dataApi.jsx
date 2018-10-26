import { normalize } from "normalizr";
import { dataGovRequest, masRequest } from "./normalizr";
const axios = require("axios");

// urls store all the API endpoints that we intend to obtain data from

const urls = {
  PRPI:
    "https://data.gov.sg/api/action/datastore_search?offset=50&limit=300&resource_id=947b5cbe-0b0a-4fdb-b06e-aca1e34d87fd",
  HDBRPI:
    "https://data.gov.sg/api/action/datastore_search?limit=300&resource_id=52e93430-01b7-4de0-80df-bc83d0afed40",
  siborMAS:
    "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=b5adb5c2-4604-49f3-b924-b69691252380&limit=318",
  STI:
    "https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=1c1713de-6b5e-475d-bc1e-b6a45b3e063e&limit=318"
};

export const urlName = {
  PRPI: "Private Residential Property Price Index",
  HDBRPI: "HDB Resale Price Index",
  siborMAS: "1mth Singapore Interbank Offered Rates (SIBOR)",
  STI: "Straits Times Index"
};

export const urlNotes = {
  PRPI: "Quarterly data from data@gov",
  HDBRPI: "Quarterly data from data@gov",
  siborMAS:
    "Showing 1mth SIBOR. Data from MAS available up till Dec 2013. For updated SIBOR data, visit ABS website.",
  STI: "Straits Times Index data from MAS"
};

// Mapper uses JSON.stringify to turn data[key] which is an object into a string for regex match

const mapper = (data, dataValue, datasetName) =>
  Object.keys(data).map(key => {
    let a = JSON.stringify(data[key]);
    return {
      x:
        a.match(/\d\d\d\d/) +
        "-" +
        `${
          a.includes("Q1")
            ? "01"
            : a.includes("Q2")
              ? "04"
              : a.includes("Q3")
                ? "07"
                : a.includes("Q4")
                  ? "10"
                  : ""
        }`,
      [datasetName]: data[key][dataValue]
    };
  });

// difference between masMapper & mapper - masMapper works specifically on "end_of_month" field
const masMapper = (data, dataValue, datasetName) =>
  Object.keys(data).map(key => {
    let a = JSON.stringify(data[key].end_of_month);
    return {
      x: a.match(/\d\d\d\d/) + "-" + a.match(/\b\d\d\b/),
      [datasetName]: data[key][dataValue]
    };
  });

const masMapperSTI = (data, dataValue, datasetName) =>
  Object.keys(data).map(key => {
    let a = JSON.stringify(data[key].end_of_month);
    return {
      x: a.match(/\d\d\d\d/) + "-" + a.match(/\b\d\d\b/),
      [datasetName]: (data[key][dataValue] * 100) / 1746.47
    };
  });

const getFromDataGov = async (url, dataValue, datasetName) => {
  const response = await axios(url);
  const normalizedData = normalize(response, dataGovRequest);
  return mapper(normalizedData.entities.record, dataValue, datasetName);
};

const getFromMAS = async (url, dataValue, datasetName) => {
  const response = await axios(url);
  const normalizedData = normalize(response, masRequest);
  return masMapper(normalizedData.entities.record, dataValue, datasetName);
};

const getFromMASsti = async (url, dataValue, datasetName) => {
  const response = await axios(url);
  const normalizedData = normalize(response, masRequest);
  console.log(normalizedData);
  return masMapperSTI(normalizedData.entities.record, dataValue, datasetName);
};
// for multiple arrays, concat them 2 by 2.
// eg let result1 = concatArray(arr1,arr2), then result2 = concatArray(result1,arr3)

export const concatArray = (array1, array2) => {
  let map = new Map();
  let result = array1.concat(array2).reduce(function(r, o) {
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
  return result;
};
export const PRPI = getFromDataGov(urls.PRPI, "value", "PRPI");
export const HDBRPI = getFromDataGov(urls.HDBRPI, "index", "HDBRPI");
export const siborMAS = getFromMAS(urls.siborMAS, "interbank_1w", "siborMAS");
export const STI = getFromMASsti(urls.STI, "sti", "STI");
