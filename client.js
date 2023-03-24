const grpc = require('grpc');
const { loadSync } = require('@grpc/proto-loader');
const grpc_promise = require('grpc-promise');

const packageDefinition = loadSync('chords.proto', {
  defaults: false,
  enums: String,
  json: true,
  keepCase: true,
  logger: console,
  longs: String,
  oneofs: true,
});
const chordsProto = grpc.loadPackageDefinition(packageDefinition).chord_service;

const client = new chordsProto.ChordService('localhost:50051', grpc.credentials.createInsecure());
client.list({ }, (error, notes) => {
  console.log('****** WAY 1');
  if (!error) {
    console.log(notes)
  } else {
    console.log(error)
  }
});

const client2 = new chordsProto.ChordService('localhost:50051', grpc.credentials.createInsecure());
grpc_promise.promisifyAll(client2);
client2.List().sendMessage()
  .then(res => {
    console.log('****** WAY 2');
    console.log(res);
  })
  .catch(console.error);
