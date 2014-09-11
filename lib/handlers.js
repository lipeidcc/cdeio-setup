var vertx = require('vertx')
var eb = vertx.eventBus;
var container = require('vertx/container');

var readyAddress = persistorConf.address + '.ready';
var readyHandler = function (msg) {
    console.log('test.persistor.ready -- > ' + msg);
    if (msg.status === 'ok') {
        eb.unregisterHandler(readyAddress, readyHandler);
        console.log('connected !!!')
    }
};

eb.registerHandler(readyAddress, readyHandler);

var existsDeployId = '';
eb.registerHandler('vertx.test.database', function (msg, reply) {
    if (existsDeployId != '') {
        container.undeployModule(existsDeployId);
        existsDeployId = '';
    }

    persistorConf.driver = msg.dbDriver;
    persistorConf.url = 'jdbc:mysql://localhost:3306/'; // + msg.dbName;
    persistorConf.username = msg.dbUserName;
    persistorConf.password = msg.dbPwd;

    container.deployModule('com.bloidonia~mod-jdbc-persistor~2.1.3', persistorConf, function(err, deployID) {
        if (!err) {
            existsDeployId = deployID;
            eb.send('test.persistor', {
                action : 'execute',
                stmt : 'CREATE DATABASE IF NOT EXISTS ' + msg.dbName
            }, function (replier) {
                if (replier.status === 'ok') {
                    reply({status : 'ok'});
                }
                //console.log(reply.status);
                //console.log(JSON.stringify(reply));
            });
            console.log('The deploy id ==> ' + deployID);
        } else {
            console.error('Deployment failed !' + err);
        }
    });

});

