var ready = function(){
	$.formUtils.addValidator({
    name : 'pwd_check',
    validatorFunction : function(value, $el, config, language, $form) {
    	var field_name=$form["context"]["id"].replace("_confirmation",'')
    	//console.log(y)
      return value === $("#"+field_name).val();
    },
    errorMessage : 'Password does not match',
    errorMessageKey: 'badPasswordConfirmation'
  });
	$.validate({
	  modules : 'security, file'
	});
}
$(document).on("turbolinks:load",ready);
