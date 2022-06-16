/**
 * Get all databases
 */
credDict = {
    "COUCH_URL": "https://c6e306ad-7a45-4984-9e8c-d770de8d2705-bluemix.cloudantnosqldb.appdomain.cloud",
    "IAM_API_KEY": "osJI_NBcEGvk7Tkn7W0rOxglBEVgfUNO2C0Ii7bPjPiR",
    "COUCH_USERNAME": "c6e306ad-7a45-4984-9e8c-d770de8d2705-bluemix"
}

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

function main(params) {

  const authenticator = new IamAuthenticator({ apikey: params.IAM_API_KEY })
  const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
  });
  cloudant.setServiceUrl(params.COUCH_URL);

  let dbList = getDbs(cloudant);
  return { dbs: dbList };
}

function getDbs(cloudant) {
    cloudant.getAllDbs().then((body) => {
        body.forEach((db) => {
            dbList.push(db);
        });
    }).catch((err) => { console.log(err); });
}

main(credDict)