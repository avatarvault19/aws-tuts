var AWS = require('aws-sdk');
var uuid = require('uuid');

var bucketName = 'node-sdk-sample-' + uuid.v4();

var keyName = 'hello_world.txt';

// Create a promse on S3 service object
var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

bucketPromise.then(
  function(data) {
    //Create params for putObject call
    var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World'};
    // Create object upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      }
    );
  })
  .catch(
    function(err) {
      console.error(err, err.stack);
  });
