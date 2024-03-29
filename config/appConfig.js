let  appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsorigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri : 'mongodb://127.0.0.1:27017/blogAppDB',
}

appConfig.apiVersion = '/api/v1';


module.exports = {
    port: appConfig.port,
    allowedCorsorigin : appConfig.allowedCorsorigin,
    environment :appConfig.env,
    db:appConfig.db,
    apiVersion : appConfig.apiVersion
}