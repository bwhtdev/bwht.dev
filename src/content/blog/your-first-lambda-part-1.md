---
title: 'A Guide to Deploying Your First Lambda Rest API In Node (part 1)'
description: 'Building a Simple Lambda Function'
pubDate: 'Aug 12 2021'
heroImage: 'code-bg.png'
---
## Introduction
When I deployed my first useable Lambda Rest API on AWS I quite frankly had a hard time. Building a basic function was simple and so was building the front end for the most part. It was setting up this function to run and be useable that gave me some trouble. I had to dig around the interwebs for a couple of days to finally figure it out. So now that I have figured it out I'm going to share this information so others can learn quicker with less hassle.
To make things easier to follow this will be split into three parts: building the Rest API, deploying it and interacting with it. I will be using JavaScript, Node.js and React as well as the AWS CLI for this project. Also, the code will be available on GitHub here for the function and here for the front end.
To be able to use AWS Lambda functions you need to have an account on AWS. If you don't have one yet create an account and register on the 'free tier'. You will need to be signed into the AWS CLI.

## Setting Up Our Environment
First, open your terminal and create and move into a new directory:


```bash
mkdir lambda-fn-demo && cd lambda-fn-demo
```

Now initialize a new Node.js project and create an index file that will store our function:

```bash
npm init -y
touch index.js
```

## Building The Function/API
To build our Rest API, open the index.js file in your editor of choice (for me NeoVim) and we'll use the following code:

```js
exports.handler = async event => {
    let body = {};

    if (event.body !== null && event.body !== undefined) {
        let { name } = JSON.parse(event.body); // Retrives the input

        body = { msg: `Hello ${name}!` }; // Message to output
    }

    // Send response back to UI:
    return {
        statusCode: 200, // Sets status to successful
        headers: { // Sets headers:
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'X-Requested-With': '*'
        },
        body: JSON.stringify(body)
    };
};
```

This code is fairly self-explanatory so I will just run through the highlights. We export an async function called handler that takes a variable that we call event. The event variable gives us our parameters (in this example: name). We then return a JSON object with our status code (set to 200 or successful), our headers (which we will need later when we are interacting with it in the next tutorial) and our body which sends a JSON object back to the user.
Now that we have built our function we need to deploy it to the cloud. To do this our function needs to be zipped up as follows: (if we were to install some packages we would need to include the package.json and package-lock.json file and the node-modules folder)

```bash
zip -r fn.zip index.js
```

We now switch to using the AWS CLI to send our function to the cloud.

Creating a Role For Our Function
To do this we will need to make a new role for our function. This is done to grant the function permission to do actions in AWS. First create a policy JSON file:

```bash
touch trust-policy.json
```

Then give it the following object:


```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Next, we'll save the role name as an environment variable for future reference:


```bash
LAMBDA_ROLE_NAME='basic-lambda-role'
```


Finally, we can create our role called basic-lambda-role using the policy file:


```bash
aws iam create-role \
    --role-name $LAMBDA_ROLE_NAME \
    --assume-role-policy-document file://trust-policy.json
```

This will return a JSON object of our new role data. We can now set an environment variable with the ARN (Amazon Resource Name) to use in deploying our function with this command:


```bash
LAMBDA_ROLE_ARN=$(aws iam get-role \
    --role-name $LAMBDA_ROLE_NAME \
    --query Role.Arn \
    --output text)
```


Now that we have our role and its ARN we can move on to sending our function to the cloud.

## Shipping Our Function/API
Finally, to deploy our function we create an environment variable and run the following with the AWS role ARN:


```bash
LAMBDA_NAME='lambda-fn-demo'

aws lambda create-function \
    --function-name $LAMBDA_NAME \
    --runtime nodejs14.x \
    --zip-file fileb://fn.zip \
    --handler index.handler \
    --role $LAMBDA_ROLE_ARN
```

## Wrapping Up
Now that we have built a working Lambda function, the next step is to create an API Gateway which we will do in part two.
