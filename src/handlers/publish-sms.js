// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const SNS = require('aws-sdk/clients/sns');
const docClient = new SNS();

// Get the DynamoDB table name from environment variables

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.publishHandler = async (event) => {
    
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    const body = JSON.parse(event.body);
   
    //console.info('persona primer nombre', persona);
    // Get id and name from the body of the request
 
   
   // const fileStream = fs.createReadStream('../assets/Images/producto 2.jpg');
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        PhoneNumber: '+50765044101',
        Message: 'Hola Sahily, this is a test'
    };

    await docClient.publish(params).promise();

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST"
          },
        body: JSON.stringify(body)
    };
  
    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
