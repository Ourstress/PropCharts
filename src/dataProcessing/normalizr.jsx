import { schema } from "normalizr";

const dataGovRecordSchema = new schema.Entity(
  "record",
  {},
  { idAttribute: "_id" }
);
const dataGovResultSchema = new schema.Entity("result", {
  records: [dataGovRecordSchema]
});
const dataGovDataSchema = new schema.Entity("data", {
  result: dataGovResultSchema
});
export const dataGovRequest = new schema.Entity("request", {
  data: dataGovDataSchema
});

const masRecordSchema = new schema.Entity(
  "record",
  {},
  { idAttribute: "end_of_month" }
);
const masResultSchema = new schema.Entity("result", {
  records: [masRecordSchema]
});
const masDataSchema = new schema.Entity("data", {
  result: masResultSchema
});
export const masRequest = new schema.Entity("request", {
  data: masDataSchema
});
