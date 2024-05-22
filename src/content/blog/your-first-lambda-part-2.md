---
title: 'A Guide to Deploying Your First Lambda Rest API In Node (part 2)'
description: 'Deploying Our Rest API'
pubDate: 'Aug 13 2021'
heroImage: 'code-bg.png'
---

## Introduction
Now we reach what is in my opinion the most complex and tedious part of our Rest API as there is so much configuration to do. In the last post, we covered how to build and set up a Lambda function. In this post, we'll cover how to build and set up an API Gateway so our front end can access our function.

## Setting Up Our API
Sign in to the API Gateway console at [https://console.aws.amazon.com/apigateway](https://console.aws.amazon.com/apigateway). If this is your first time using API Gateway, you will see a page that introduces you to the features of the service. If so under 'REST API', click on 'Build'. When the 'Create Example API' popup appears, choose 'OK'. If this is not your first time using API Gateway, click on 'Create API'. Then under 'REST API', click on 'Build'.

![Lambda setup pic 2.1](/blog-imgs/lambda-2.1.png)

## Building Our API Gateway
Leave 'Choose the protocol' and 'Create new API' as they are. In settings set 'API name' to 'lambda-fn-demo-api'. Then click on 'Create API' on the bottom right.

![Lambda setup pic 2.2](/blog-imgs/lambda-2.2.png)

## Building Our Resource
Next to resources click on the 'Actions' dropdown and on the 'Create Resource' option.

![Lambda setup pic 2.3](/blog-imgs/lambda-2.3.png)

Now fill in the information under 'New Child Resource'. Set 'Resource Name' to 'hello'. This will be the path name for our API route. Tick the 'Enable API Gateway CORS' box.

![Lambda setup pic 2.4](/blog-imgs/lambda-2.4.png)

## Creating Our Method
Next to resources click on the 'Actions' dropdown and on the 'Create Method' option.

![Lambda setup pic 2.5](/blog-imgs/lambda-2.5.png)

This will add a dropdown with an 'x' symbol next to it. Click on the dropdown and the 'ANY' option. picture of 'any dropdown option'.

![Lambda setup pic 2.6](/blog-imgs/lambda-2.6.png)

Then click on the check mark that is now added next to it. picture of 'checkmark'.

![Lambda setup pic 2.7](/blog-imgs/lambda-2.7.png)

## Setting Up Our Method
This will bring up the setup page for the '/hello' method. Leave the 'Integration Type' set to 'Lambda Function'. Check the 'Use Lambda Proxy integration' box. Type in 'lambda-fn-demo' by 'Lambda Function'. Click on the 'Save' button at the bottom right.

![Lambda setup pic 2.8](/blog-imgs/lambda-2.8.png)

This will bring up a confirmation window. Click on the 'agree' button.

## Deploying Our API
Next to resources click on the 'Actions' dropdown and the 'Deploy API' option.

![Lambda setup pic 2.9](/blog-imgs/lambda-2.9.png)

This will bring up a window. Click on the 'Deployment stage' dropdown and click on '[New Stage]'. Then set 'Stage name' to 'prod'.

![Lambda setup pic 2.10](/blog-imgs/lambda-2.10.png)
![Lambda setup pic 2.11](/blog-imgs/lambda-2.11.png)

## Testing Our API
Finally, it will open the stage editor page. Locate and copy the address of the 'Invoke URL'. This is the link to our API.

![Lambda setup pic 2.12](/blog-imgs/lambda-2.12.png)

Paste the URL into a variable in the terminal:
```bash
API_URL=***YOUR_API_URL_HERE***
```

To test our API we will use the following terminal command:
```bash
curl -d '{ "name": "Lambda" }' \
    -H 'Content-Type: application/json' \
    "${API_URL}/hello"
```

The terminal should display the following result:
```bash
{ "msg": "Hello Lambda" }
```

There we have it. We've build a functioning Lambda Rest API. Now, all we have to do is interact with this API in the front end.
