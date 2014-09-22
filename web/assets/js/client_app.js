var eb = new vertx.EventBus(window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/eventbus');

jQuery(function($) {

	//eb.send('test.property');
	$('[data-rel=tooltip]').tooltip();
	//$(".select2").css('width','150px').select2({allowClear:true})
	//.on('change', function(){
	//	$(this).closest('form').validate().element($(this));
	//});
	var basicAppPath = $('#appPath').val();
	$('#appId').change(function(event) {
		$('#appPath').val(function (index, value) {

			return basicAppPath + $('#appId').val();
		});
	});
	var basicDBURL = $('#dbURL').val();
	$('#dbName').change(function(event) {
		$('#dbURL').val(function (index, value) {
			return basicDBURL + $('#dbName').val();
		});
	});
	$.validator.addMethod("appIdReg", function (value, element) {
		var patten = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){4,19}$/;

		return patten.exec(value);
	}, "非法的应用标识");
	$.validator.addMethod("ipReg", function (value, element) {
		var patten = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; 

		return patten.exec(value);
	}, "非法的IP地址");
	/*$('#validation-form').validate({
		errorElement: 'span',
		errorClass: 'help-inline',
		focusInvalid: false,
		rules: {
			appId: {
				required: true,
				appIdReg: true
			},
			appName: {
				required: true
			},
			appPath: {
				required: true
			},
            dbType: {
                required: true
            },
            dbDriver: {
                required: true
            },
            dbName: {
                required: true
            },
            dbHost: {
            	required: true,
            	ipReg: true
            },
            dbPort: {
            	required: true,
            	number: true,
            	maxlength: 4
            },
            dbUserName: {
                required: true
            },
            dbPwd: {
                required: true
            },
            serverPort: {
                required: true,
                number: true,
                maxlength: 4
            }
		},
		messages: {
			appId: {
				required: "应用程序标识不能为空。"
			},
			appName: {
				required: "应用程序名称不能为空。"
			},
			appPath: {
				required: "应用程序路径不能为空。"
			},
            dbType: {
                required: "数据库类型不能为空。"
            },
            dbDriver: {
                required: "数据库驱动不能为空。"
            },
            dbName: {
                required: "数据库名称不能为空。"
            },
            dbHost: {
            	required: "数据库地址不能为空。"
            },
            dbPort: {
            	required: "数据库端口不能为空。",
            	number: "数据库端口只能为数字。",
            	maxlength: "数据库端口的最大长度是4个字符。"
            },
            dbUserName: {
                required: "数据库用户名不能为空。"
            },
            dbPwd: {
                required: "数据库密码不能为空。"
            },
            serverPort: {
                required: "服务端口不能为空。",
                number: "服务端口只能为数字",
                maxlength: "数据库端口的最大长度是4个字符。"
            }

		},
		highlight: function(e) {
			$(e).closest('.control-group').removeClass('info').addClass('error');
		},

		success: function(e) {
			$(e).closest('.control-group').removeClass('error').addClass('info');
			$(e).remove();
		},
	});
*/
	$('[data-rel=tooltip]').tooltip({
		container: 'body'
	});
	$('[data-rel=popover]').popover({
		container: 'body'
	});
	//var $validation = false;
	$('#fuelux-wizard').ace_wizard().on('change', function(e, info) {
		if (info.step == 2) {
			if ($('#service-agreement').prop( "checked" )) {
				return true;
			} else {
				$.gritter.add({
					title: '警告',
					text: '需要同意此协议，才可以进一步安装',
					class_name: 'btn-danger'
				});
				return false;
			}
		}
        if (info.step == 3) {
            var validateAppId = $('#validation-form').validate().element('#appId');
            var validateAppName = $('#validation-form').validate().element('#appName');
            var validateAppPath= $('#validation-form').validate().element('#appPath');

            if ((!validateAppId) || (!validateAppName) || (!validateAppPath)) {
                console.log('validate false.3');
                return false;
            } else {
                console.log('validate true 3');
                return true;
            };
        }

        if (info.step == 4) {
            var validateDBType = $('#validation-form').validate().element('#dbType');
            var validateDBDriver = $('#validation-form').validate().element('#dbDriver');
            var validateDBName = $('#validation-form').validate().element('#dbName');
            var validateDBHost = $('#validation-form').validate().element('#dbHost');
            var validateDBPort = $('#validation-form').validate().element('#dbPort');
            var validateDBUserName = $('#validation-form').validate().element('#dbUserName');
            var validateDBPwd = $('#validation-form').validate().element('#dbPwd');

            if ((!validateDBType) || (!validateDBDriver) || (!validateDBName)
                || (!validateDBUserName) || (!validateDBPwd) || (!validateDBPort)
                 || (!validateDBHost)) {
                console.log('validate false.4');
                return false;
            } else {
                console.log('validate true 4');
                return true;
            };
        }

		if (info.step == 5) {
            var validatePort = $('#validation-form').validate().element('#serverPort');
            if (!validatePort) {
                return false;
            } else {
                //get info
                $('#textAppId').text($('#appId').val());
                $('#textAppName').text($('#appName').val());
                $('#textAppPath').text($('#appPath').val());
                $('#textDbType').text($('#dbType').val());
                $('#textDbDriver').text($('#dbDriver').val());
                $('#textDbName').text($('#dbName').val());
                $('#textDbHost').text($('#dbHost').val());
                $('#textDbPort').text($('#dbPort').val());
                $('#textDbUserName').text($('#dbUserName').val());
                $('#textDbPwd').text($('#dbPwd').val());
                $('#textServerPort').text($('#serverPort').val());
                if ($('#isInstallPackages').prop( "checked" )) {
                	$('#textIsInstallPackages').text('是');	
                } else {
                	$('#textIsInstallPackages').text('否');	
                }
                
                $('#appLoad').hide();
                $('#dbLoad').hide();
                $('#serverLoad').hide();
                return true;
            }
		}

		if (info.step == 6) {
			var obj = {
				appId: $('#appId').val(),
				appName: $('#appName').val(),
				appPath: $('#appPath').val(),
				dbType: $('#dbType').val(),
				dbDriver: $('#dbDriver').val(),
				dbName: $('#dbName').val(),
				dbHost: $('#dbHost').val(),
				dbPort: $('#dbPort').val(),
				dbUserName: $('#dbUserName').val(),
				dbPwd: $('#dbPwd').val(),
				serverPort: $('#serverPort').val(),
				isInstallPackages: $('#isInstallPackages').prop( "checked" )
			};
			$('#appLoad').show();
			$('.progress').attr('data-percent', '45%');
			$('.bar').css('width', '45%');
			eb.send('zyeeda.config.action', obj, function(reply) {
				$('#dbLoad').show();
				$('.progress').attr('data-percent', '65%');
				$('.bar').css('width', '65%');
				console.log(JSON.stringify(reply));
				if (reply.status == 'ok') {
					$('#serverLoad').show();
					$('.progress').attr('data-percent', '100%');
					$('.bar').css('width', '100%');
				}
			    /*if (reply.status === 'ok') {
			        bootbox.dialog("谢谢 ! 您的信息已经成功保存 !", [{
			            "label" : "确定",
			            "class" : "btn-small btn-primary",
			            callback : function() {
			            	$('.wizard-actions').hide();
			            }}]
			        );
			    } else {
			    	console.log(JSON.stringify(reply));
			    	$.gritter.add({
						title: '警告',
						text: reply.message,
						class_name: 'btn-danger'
					});
			    }*/
			}); 
		}
	}).on('finished', function(e) {
		/*var obj = {
			appId: $('#appId').val(),
			appName: $('#appName').val(),
			appPath: $('#appPath').val(),
			dbType: $('#dbType').val(),
			dbDriver: $('#dbDriver').val(),
			dbName: $('#dbName').val(),
			dbURL: $('#dbURL').val(),
			dbUserName: $('#dbUserName').val(),
			dbPwd: $('#dbPwd').val(),
			serverPort: $('#serverPort').val()
		};
		eb.send('zyeeda.config.action', obj, function(reply) {
		    if (reply.status === 'ok') {
		        ootbox.dialog("谢谢 ! 您的信息已经成功保存 !", [{
		            "label" : "确定",
		            "class" : "btn-small btn-primary",
		            callback : function() {
		            	$('.wizard-actions').hide();
		            }}]
		        );
		    } else {
		    	console.log(JSON.stringify(reply));
		    	$.gritter.add({
					title: '警告',
					text: reply.message,
					class_name: 'btn-danger'
				});
		    }
		}); */
		//eb.send('vertx.test.property', obj, function(reply) {
		//	if (reply.status === 'ok') {
		//		console.log('ok');
		//	}
		//});
	}).on('stepclick', function(e) {
		//return false;//prevent clicking on steps
	});

	$('#validation-form').show();

})
//eb.onopen = function() {
//
//	eb.send('vertx.showbasic', 'Fuck you !!!' ,
//		function(reply){
//			console.log(reply);
//			if (reply.status === 'ok') {
//				console.log(reply.results);
//			} else {
//				console.error('Failed to retrive albums :' + reply.message);
//			}
//	});
//};

