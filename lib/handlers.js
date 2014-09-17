var vertx = require('vertx');
var eb = vertx.eventBus;
var container = require('vertx/container');

var readyAddress = persistorConf.address + '.ready';
var readyHandler = function(msg) {
	if (msg.status === 'ok') {
		eb.unregisterHandler(readyAddress, readyHandler);
	}
};

eb.registerHandler(readyAddress, readyHandler);

//var existsDeployId = '';
//eb.registerHandler('vertx.test.database', function(msg, reply) {
//	if (existsDeployId != '') {
//		container.undeployModule(existsDeployId);
//		existsDeployId = '';
//	}
//
//});

eb.registerHandler('zyeeda.config.action', function(msg, reply) {

	container.deployModule('com.zyeeda~mod-property-util~0.1', zyeedaConf, function(err, deployId) {

		/** 实现修改property 文件 **/
		eb.send('zyeeda.config.service', {
			type: 'app',
			appName: msg.appName,
			appId: msg.appId
		},
		function(appReplier) {
			if (appReplier.status == 'ok') {
				persistorConf.driver = msg.dbDriver;
				persistorConf.url = 'jdbc:mysql://localhost:3306/'; // + msg.dbName;
				persistorConf.username = msg.dbUserName;
				persistorConf.password = msg.dbPwd;

                /** 加载 jdbc 模块，创建数据库 */
				container.deployModule('com.bloidonia~mod-jdbc-persistor~2.1.3', persistorConf, function(err, deployID) {
					if (!err) {
						eb.send('zyeeda.config.persistor', {
							action: 'execute',
							stmt: 'CREATE DATABASE IF NOT EXISTS ' + msg.dbName
						},
						function(jdbcReplier) {
							if (jdbcReplier.status === 'ok') {
                                /** 实现修改数据库文件 */
								eb.send('zyeeda.config.service', {
									type: 'db',
									dbDriver: msg.dbDriver,
									dbName: msg.dbName,
									dbUserName: msg.dbUserName,
									dbPwd: msg.dbPwd
								},
								function(dbReplier) {
									if (dbReplier.status == 'ok') {
                                        /** 实现修改xml 文件 */
                                        eb.send('zyeeda.config.service', {
                                            type: 'server',
                                            serverPort: msg.serverPort
                                        },
                                        function(serverReplier) {
                                            if (serverReplier.status == 'ok') {
                                                reply({
                                                    status: 'ok'
                                                });
								                container.undeployModule(deployID);
				                                container.undeployModule(deployId);
                                            }
                                        });
                                    } else {
										console.error('update db config failed !');
									}

								});
							}
						});
					} else {
						console.error('Deployment failed !' + err);
					}
				});

			};
		});

	});
});

//
//
//
// 在Java 实现
//var client = vertx.createNetServer();
//client.connectHandler(function(sock) {
//    sock.exceptionHandler(function (ex) {
//        console.error('Oops, wring : ' + ex.getMessage());
//    })
//}).listen(8080, 'localhost');

