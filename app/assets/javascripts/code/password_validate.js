$(document).on("turbolinks:load",function(){
	$.formUtils.addValidator({
    name : 'pwd_check',
    validatorFunction : function(value, $el, config, language, $form) {
      var field_name = $el.attr('id').replace("_confirmation",'');
      return value === $("#"+field_name).val();
    },
    errorMessage : 'Password does not match',
    errorMessageKey: 'badPasswordConfirmation'
  });

  $.validate({
    modules : 'security, file'
  });
});
