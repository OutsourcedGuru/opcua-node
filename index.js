/*global require,setInterval,console */
var config =    require('./config.js');
var opcua =     require('node-opcua');
var octoprint = require('octo-client');
var package =   require('./package.json');
var dtBuild =   new Date(2018,7,17);

// Create an instance of OPCUAServer
var server = new opcua.OPCUAServer({
    port:             config.port,         // the port of the listening socket of the server
    resourcePath:     config.resourcePath, // this path will be added to the endpoint resource name
     buildInfo : {
        productName:  config.productName,
        buildNumber:  package.version,
        buildDate:    dtBuild
    }
});

function post_initialize() {
    console.log('post_initialize()');
    function construct_my_address_space(server) {    
        var addressSpace = server.engine.addressSpace;
        // declare a new object
        var device = addressSpace.addObject({
            organizedBy:   addressSpace.rootFolder.objects,
            browseName:    config.browseName
        });        
        // add a variable named OctoPrint-Version to the newly created folder from config.browseName
        var variableVersion = 'N/A';
        octoprint.version(function(response) {
          if (response.server != undefined) {
            variableVersion = response.server;
          }
        });
        var os = require('os');
        /**
         * returns the percentage of free memory on the running machine
         * @return {double}
         */
        function available_memory() {
            // var value = process.memoryUsage().heapUsed / 1000000;
            var percentageMemUsed = os.freemem() / os.totalmem() * 100.0;
            return percentageMemUsed;
        } // function available_memory()
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId:      'ns=1;s=free_memory', // a string nodeID
            browseName:  'FreeMemory',
            dataType:    'Double',    
            value: { get: function () {
                return new opcua.Variant({dataType: opcua.DataType.Double, value: available_memory() });
              }
            }
        }); // server.engine.addressSpace.addVariable()
    }       // function construct_my_address_space()
    construct_my_address_space(server);
    server.start(function() {
        console.log('Server is now listening... (press CTL+C to stop)');
        console.log('  Port: ', server.endpoints[0].port);
        var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log('  The primary server endpoint URL is ', endpointUrl);
    });
}

server.initialize(post_initialize);
