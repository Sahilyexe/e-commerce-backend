// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_PRODUCTO;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
exports.rebajarStockIdHandler = async (event) => {

 
 let actualizaCantidadStock =  Number(event.cantidadStock) - Number(event.cantidadCompra)
 console.info('CAntidad en stock: '+event.cantidadStock)
 console.info('CAntidad que comrpa: '+event.cantidadCompra)
 console.info('CAntidad que comrpa: '+actualizaCantidadStock)
  var params = {
    TableName : tableName,
    Key: { 
           "id":  event.id 
          },
    UpdateExpression: "set cantidadStock = :p",
    ExpressionAttributeValues: {
      ":p": actualizaCantidadStock
    }//,ConditionExpression: "cantidadStock = :cantidad",
    //ExpressionAttributeNames: {":cantidad":cantidadStock}
  };
  console.info('id: '+event.id)//condicional right porque si alguien consulto depues que yo no escribir
  
  await docClient.update(params).promise();
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
    }
  };
 
  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
