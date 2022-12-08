// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_ORDEN;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    const body = JSON.parse(event.body);
    const persona = body.persona;
    //console.info('persona primer nombre', persona);
    console.info('toda la persona', persona);
    // Get id and name from the body of the request
 
    const idOrden =body.idOrden;
    const estado = body.estado;
    const fechaOrden = body.fechaOrden;
    const metodoPago = body.metodoPago;
    const elementos = body.elementos;
    const correo = persona.correo;
    const telefono = persona.telefono;
    const provincia = persona.provincia;
    const pais = persona.pais;
    const direccion = persona.direccion;
    const primerNombre = persona.primerNombre;
    const segundoNombre = persona.segundoNombre;
    const primerApellido = persona.primerApellido;
    const segundoApellido = persona.segundoApellido;
   
   // const fileStream = fs.createReadStream('../assets/Images/producto 2.jpg');
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    var params = {
        TableName : tableName,
        Item: { id : idOrden,
                fechaOrden: fechaOrden,
                estado: estado,
                metodoPago: metodoPago,
                elementos: elementos,
                correo: correo,
                telefono: telefono,
                provincia: provincia,
                pais: pais,
                direccion: direccion,
                primerNombre: primerNombre,
                segundoNombre: segundoNombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido
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
