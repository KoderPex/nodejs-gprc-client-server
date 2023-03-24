const grpc = require('grpc');
const { loadSync } = require('@grpc/proto-loader');
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
const server = new grpc.Server();

server.addService(chordsProto.ChordService.service, {
  List: ({ request }, callback) => {
    try {
      callback(null, {
        list: [
          { id: 'A', name: 'Chord A', sequence: 'A  C# E ' },
          { id: 'B', name: 'Chord B', sequence: 'B  D# F#' },
          { id: 'C', name: 'Chord C', sequence: 'C  E  G ' },
          { id: 'D', name: 'Chord D', sequence: 'D  F# A ' },
          { id: 'E', name: 'Chord E', sequence: 'E  G# B ' },
          { id: 'F', name: 'Chord F', sequence: 'F  A  C ' },
          { id: 'G', name: 'Chord G', sequence: 'G  B  D ' },
        ]
      });
    } catch (e) {
      console.error(e);
      callback({ code: 13, message: e.message });
    }
  },
});

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
server.start();
console.log('Server running at http://127.0.0.1:50051');
