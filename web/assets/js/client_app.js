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
		$('#appPath').val(function(index, value) {

			return basicAppPath + $('#appId').val();
		});
	});
	$('#validation-form').validate({
		errorElement: 'span',
		errorClass: 'help-inline',
		focusInvalid: false,
		rules: {
			appId: {
				required: true
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
            dbUserName: {
                required: true
            },
            dbPwd: {
                required: true
            },
            serverPort: {
                required: true,
                number: true
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
            dbUserName: {
                required: "数据库用户名不能为空。"
            },
            dbPwd: {
                required: "数据库密码不能为空。"
            },
            serverPort: {
                required: "服务端口不能为空。",
                number: "服务端口只能为数字"
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

	$('[data-rel=tooltip]').tooltip({
		container: 'body'
	});
	$('[data-rel=popover]').popover({
		container: 'body'
	});
	//var $validation = false;
	$('#fuelux-wizard').ace_wizard().on('change', function(e, info) {
        if (info.step == 1) {
            var validateAppId = $('#validation-form').validate().element('#appId');
            var validateAppName = $('#validation-form').validate().element('#appName');
            var validateAppPath= $('#validation-form').validate().element('#appPath');

            if ((!validateAppId) || (!validateAppName) || (!validateAppPath)) {
                console.log('validate false.');
                return false;
            } else {
                console.log('validate true');
                return true;
            };
        }

        if (info.step == 2) {
            var validateDBType = $('#validation-form').validate().element('#dbType');
            var validateDBDriver = $('#validation-form').validate().element('#dbDriver');
            var validateDBName = $('#validation-form').validate().element('#dbName');
            var validateDBUserName = $('#validation-form').validate().element('#dbUserName');
            var validateDBPwd = $('#validation-form').validate().element('#dbPwd');

            if ((!validateDBType) || (!validateDBDriver) || (!validateDBName)
                || (!validateDBUserName) || (!validateDBPwd)) {
                console.log('validate false.');
                return false;
            } else {
                console.log('validate true');
                return true;
            };
        }

		if (info.step == 3) {
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
                $('#textDbUserName').text($('#dbUserName').val());
                $('#textDbPwd').text($('#dbPwd').val());
                $('#textServerPort').text($('#serverPort').val());
                return true;
            }
		}
	}).on('finished', function(e) {
		var obj = {
			appId: $('#appId').val(),
			appName: $('#appName').val(),
			appPath: $('#appPath').val(),
			dbType: $('#dbType').val(),
			dbDriver: $('#dbDriver').val(),
			dbName: $('#dbName').val(),
			dbUserName: $('#dbUserName').val(),
			dbPwd: $('#dbPwd').val(),
			serverPort: $('#serverPort').val()
		}

		eb.send('zyeeda.config.action', obj, function(reply) {
		    if (reply.status === 'ok') {
		        bootbox.dialog("谢谢 ! 您的信息已经成功保存 !", [{
		            "label" : "确定",
		            "class" : "btn-small btn-primary",
		            }]
		        );
		    }
		});
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

