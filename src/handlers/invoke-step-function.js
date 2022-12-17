// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const stepfunctions = require('aws-sdk/clients/stepfunctions');
const stepfunctionsClient = new stepfunctions();
const statemachinearn = process.env.STATE_MACHINE;


exports.invokeStepFunctionHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    // Get id and name from the body of the request
    
    const body = JSON.parse(event.body);
    console.info(event)
    console.info(body)

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        stateMachineArn : statemachinearn,
        input:JSON.stringify(body)
          
    };

    await stepfunctionsClient.startExecution(params).promise();
  
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
