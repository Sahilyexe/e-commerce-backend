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
  var mensaje="";
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
  mensaje="<div  style='padding: 12px; border: 1px solid #c9e1f4;background: #ecf5fb;-webkit-border-radius: 10px;'><h2 style='font: bold 16px/16px Verdana, sans-serif;    color: #090;margin: 0; padding: 0;'>Ud valid &oacute; que el cliente realiz &oacute; el pago</h2></div>";

 }else{
  var paramsNoAprobado = {
    output: '201', /* required */
    taskToken: activity.taskToken /* required */
  };
  await stepfunctionsClient.sendTaskSuccess(paramsNoAprobado).promise();
  mensaje="<div  style='padding: 12px; border: 1px solid #c9e1f4;background: #ecf5fb;-webkit-border-radius: 10px;'><h2 style='color: #900;font: bold 16px/16px Verdana, sans-serif;margin: 0;padding: 0;  margin-bottom: 12px;'>Ud valid &oacute;  que el cliente no realiz &oacute; el pago</h2></div>";
 }
   
    // TODO implement
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/html",
        },
        body: mensaje
    };
    return response;
 
  

 

}
