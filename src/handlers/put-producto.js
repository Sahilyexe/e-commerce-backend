// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_PRODUCTO;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body);
    const id =body.id;
    const nombre = body.nombre;
    const descripcion = body.descripcion;
    const imagen = body.imagen;
    const precio = body.precio;
    const cantidadStock = body.cantidadStock;
    const categoria = body.categoria;
    const fechaIngreso = new Date();
    
   // const fileStream = fs.createReadStream('../assets/Images/producto 2.jpg');
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        TableName : tableName,
        Item: { id : id,
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                precio: precio,
                cantidadStock: cantidadStock,
                categoria: categoria,
                fechaIngreso: fechaIngreso
            }
    };

    await docClient.put(params).promise();

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
