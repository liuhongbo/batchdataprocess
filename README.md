# Batch SQS Message Process Application

The AWS SAM application for processing batch messages on an SQS queue.

## Running the application

```bash
aws s3 mb s3://batchdataprocess-deploy-package
sam build -m package.json
sam package --template-file template.yaml --output-template-file batchdataprocess-deploy-template.yaml --s3-bucket 'batchdataprocess-deploy-package'
aws cloudformation deploy --template-file ./batchdataprocess-deploy-template.yaml --stack-name batch-data-processor-eagle --capabilities CAPABILITY_IAM --parameter-overrides CompanyParameter=eagle
```

After your CloudFormation Stack has completed creation, send a message to the SQS queue to see it in action:

```bash
BATCH_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/batch-sqs-queue; \
aws sqs send-message --queue-url $BATCH_SQS_QUEUE_URL --message-body '{ "myMessage": "Hello SAM!" }'
```

If you want to check the logs of the lambda function

```bash
CURRENT_TIME=$(date +%s) 
LOG_TIME=$(($CURRENT_TIME - 60)) 
aws logs filter-log-events --log-group-name "/aws/lambda/batch-sqs-queue-process-eagle" --start-time $LOG_TIME
```

If you want to delete the stack

```bash
aws cloudformation delete-stack --stack-name 'batch-data-processor'
```

debug
```bash
sam build -m package.json --parameter-overrides 'ParameterKey=CompanyParameter,ParameterValue=eagle ParameterKey=UsernameParameter,ParameterValue=liuhongbo  ParameterKey=EnvironmentParameter,ParameterValue=prod'
sam local invoke -e event.json  --env-vars env.json --debug-port 5858

npm build
npm start -- -e event.json
 ```
