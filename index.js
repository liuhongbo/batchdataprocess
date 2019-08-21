var AWS = require('aws-sdk');
var ssm = new AWS.SSM();

async function handler (event, context) {
  let apiKey;

  apiKey = await getSSMParameter(`/${process.env.ENV}/batchsqsqueueprocess/${process.env.COMPANY}/apicredentials`);

  const records = event.Records
  
  console.log(records)
  
  return {}
}

async function getSSMParameter(path) {      
  var params = {
      Name: path,      
      WithDecryption: true
  };
    
  var ret = await ssm.getParameter(params).promise();  
  return ret.Parameter.Value;
}

module.exports.handler = handler