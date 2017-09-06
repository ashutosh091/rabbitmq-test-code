var amqp = require('amqp');
var options = {};
options.login = '';
options.password = '';
options.host = '';
//options.host = 'localhost';
options.port = 15672;

var connection = amqp.createConnection(options);

// add this for better debuging 
connection.on('error', function (e) {
    console.log("Error from amqp: ", e);
});

// Wait for connection to become established. 
connection.on('ready', function () {
    // Use the default 'amq.topic' exchange 
    connection.queue('task_upload', function (q) {
        console.log('Listening on task_upload');
        // Catch all messages 
        q.bind('#');

        // Receive messages 
        q.subscribe(function (message) {
            // Print messages to stdout 
            console.log(message);
        });
    });
});