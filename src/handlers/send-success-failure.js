// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
const activityArn = process.env.ACTIVITY;

// Create a DocumentClient that represents the query to add an item
const stepfunctions = require('aws-sdk/clients/stepfunctions');
const stepfunctionsClient = new stepfunctions();

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
exports.aprobacionHandler = async (event) => {

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
  const respuesta = event.pathParameters.id;
  
  var paramsAcivity = {
  activityArn: activityArn, /* required */
  workerName: 'aprobador'
};
 
  const activity= await stepfunctionsClient.getActivityTask(paramsAcivity).promise();
  console.info('activity'+activity)
 
 if(respuesta=='aprobar'){
  var paramsAprobado = {
    output: '200', /* required */
    taskToken: activity.taskToken /* required */
  };
  await stepfunctionsClient.sendTaskSuccess(paramsAprobado).promise();
 }else{
  var paramsNoAprobado = {
    output: '201', /* required */
    taskToken: activity.taskToken /* required */
  };
  await stepfunctionsClient.sendTaskSuccess(paramsNoAprobado).promise();
 }
   
    // TODO implement
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
    };
    return response;
 
  

 

}
