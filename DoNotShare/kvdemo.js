/* jshint esversion: 6 */


var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;

var clientID = "a7261302-a754-4dbd-9d2f-979f0d4f316f";
var clientSecret = "7pwCjyI1nOEDNwearFK+NfIIs3XeMGZx3VfhwDPPeJQ=";
var vaultUri = "https://kvwbg1.vault.azure.net/secrets/passphrase/f58f9fa94430479ba1ed1b7e330e4605";

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
client.getSecret("https://kvwbg1.vault.azure.net/secrets/passphrase/f58f9fa94430479ba1ed1b7e330e4605",  (err, result) => {
    if(!err) {
        console.log(result);
    }
    else {
        throw err;
    }
});




