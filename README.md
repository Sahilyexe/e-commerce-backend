# Eccomerce backend
Con esta aplicación se controla el inventario de una tienda online  Esta basada en arquitectura serverless, se utilizan servicios como step functions, lambdas, api gategay, dynamodb, simple email services.

![diagrama-actualiza-datos.png](./Documentation/Diagrama.png)

## Pre-requisitos
- Cuenta de AWS creada
- AWS CLI instalado en tu equipo `https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html`
- Tener configurada las credenciales con el comando`aws configure` sigue los pasos `https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html`
- SAM CLI instalado en tu equipo `https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html`
- NodeJs `https://nodejs.org/en/`

## Desplegar el backend en AWS
- `SAM build`  
- `SAM deploy --guided`

## Eliminar la aplicación y los recursos
- Ejecuta `aws s3 rm s3://<nombre bucket> --recursive`
- Ejecuta `SAM delete --stack-name e-commerce`

## Desarrollador
-  sahily.exe@gmail.com


de la siguiente forma. Cuando se recibe una solicitud es decir el cliente presionó comprar en el la aplicación el state machine recibe un json con la información del cliente, los productos a comprar y el número de la orden. En ese momento el state machiche consuta el stock en la tabla de productos, luego verifica que la cantidad en stock sea superior o igual a la cantidad pedida, luego si la cantidad solicitada menor o igual a la cantidad pedida por el cliente entonces el state machine rebaja del inventario la cantidad solicitada y espera por una confirmación manual del usuaro