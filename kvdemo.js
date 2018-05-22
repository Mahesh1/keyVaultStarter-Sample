/* jshint esversion: 6 */

var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;

var clientID = ""; //get the client id or app id from the portal
var clientSecret = ""; //get the secret from the portal. create a key for the registered app
var vaultUri = "https://kvwbg1.vault.azure.net/secrets/passphrase/f58f9fa94430479ba1ed1b7e330e4605"; //get the key vault URL form the portal

//authenticate using clientID & secret
var authenticator = function (challenge, callback) {  
    var context = new AuthenticationContext(challenge.authorization);
    return context.acquireTokenWithClientCredentials(challenge.resource, clientID, clientSecret,
            function (err, tokenResponse) {  
                if (err) throw err;
                var authorizationValue = tokenResponse.tokenType + " " + tokenResponse.accessToken;
                return callback(null, authorizationValue);
            });
};

//create credentials using authenticator object above then create client using credentials object
var credentials = new KeyVault.KeyVaultCredentials(authenticator);
var client = new KeyVault.KeyVaultClient(credentials);

//console.log(client.clientID);
client.getSecret(vaultUri,  (err, result) => {
    if(!err) {
        console.log(result);
    }
    else {
        throw err;
    }
});




