var vertx = require('vertx');
var container = require('vertx/container');
var eb = vertx.eventBus;
var console = require('vertx/console');

var webServerConf = {

    port: 8080,
    host: 'localhost',
    bridge: true,
    inbound_permitted: [
        {
            address: 'zyeeda.config.action'
        }
    ]
}

var persistorConf = {
    address : 'zyeeda.config.persistor',

    driver : 'com.mysql.jdbc.Driver',
    url : 'jdbc:mysql://localhost:3306/test',
    username : 'root',
    password : 'root',

    pmdKnownBroken : "yes"

}

var zyeedaConf = {
    address : 'zyeeda.config.service',
    appConfigPath : '../packages/starter-kit-v2.0.0/src/main/resources/settings/cdeio.properties',
    serverConfigPath: '../packages/starter-kit-v2.0.0/src/main/resources/META-INF/jetty/jetty-http.xml',
    dbConfigPath: '../packages/starter-kit-v2.0.0/src/main/webapp/WEB-INF/jetty-env.xml'
}

try {
	load('handlers.js');
} catch (e) {
	console.error('Error : ' + e);
}

container.deployModule('io.vertx~mod-web-server~2.0.0-final', webServerConf);
