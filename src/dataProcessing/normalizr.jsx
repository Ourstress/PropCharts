import { schema } from 'normalizr'

const dataGovRecordSchema = new schema.Entity('record', {}, { idAttribute: '_id' })
const dataGovResultSchema = new schema.Entity('result',{
    records: [dataGovRecordSchema]
})
const dataGovDataSchema = new schema.Entity('data', {
    result: dataGovResultSchema  
})
export const dataGovRequest = new schema.Entity('request', {
    data: dataGovDataSchema  
})