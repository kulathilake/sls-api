import Client from '@aws-sdk/client-dynamodb';

const config = {};

if(process.env.IS_OFFLINE) {
    (config as any).region = "localhost";
    (config as any).endpoint = "http://localhost:8000"
}

export const dynamodb  = new Client.DynamoDB(config);