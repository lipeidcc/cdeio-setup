var vertx = require('vertx');
var container = require('vertx/container');
var console = require('vertx/console');

var webServerConf = {

    port: 8080,
    host: 'localhost',
    bridge: true,
    inbound_permitted: [
        {
            address: 'vertx.test.database'
        }
    ]
}

var persistorConf = {
    address : 'test.persistor',

    driver : 'com.mysql.jdbc.Driver',
    url : 'jdbc:mysql://localhost:3306/test',
    username : 'root',
    password : 'root',

    pmdKnownBroken : "yes"

}


try {
	load('src/handlers.js');
} catch (e) {
	console.error('Error : ' + e);
}

container.deployModule('io.vertx~mod-web-server~2.0.0-final', webServerConf);
