var eb = new vertx.EventBus(window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/eventbus');
jQuery(function($) {

	//$('[data-rel=tooltip]').tooltip();
	//$(".select2").css('width','150px').select2({allowClear:true})
	//.on('change', function(){
	//	$(this).closest('form').validate().element($(this));
	//});

	//var $validation = false;
	$('#fuelux-wizard').ace_wizard().on('change', function(e, info) {
		/*if(info.step == 4 && $validation) {
						if(!$('#validation-form').valid()) return false;
					} */
		if (info.step == 3) {
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

		eb.send('vertx.test.database', obj, function(reply) {
            if (reply.status === 'ok') {
                bootbox.dialog("Thank you! Your information was successfully saved!", [{
                    "label" : "OK",
                    "class" : "btn-small btn-primary",
                    }]
                );
            }
		});
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

