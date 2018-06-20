'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.todotext !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation Failed');
    console.log(data);
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
      },
      body: 'Couldn\'t update the todo item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':checked': data.checked,
      ':text': data.todotext,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET checked = :checked, todotext = :text, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Credentials' : true,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
