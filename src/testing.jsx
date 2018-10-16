import { normalize, schema } from 'normalizr'

const response = {data:{
    result:{
        records:[{id:1},{id,2}]
    }
}
}

const recordSchema = new schema.Entity('record')
const dataGovResult = new schema.Entity('result',{
    records: [recordSchema]
})
const dataGovData = new schema.Entity('data', {
    result: dataGovResult  
})
const dataGovRequest = new schema.Entity('request', {
    data: dataGovData  
})
const normalizedData = normalize(response, dataGovRequest);
console.log(normalizedData)