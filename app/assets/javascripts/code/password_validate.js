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
  // file validator with bug
  $.formUtils.addValidator({
        name : 'file_check',
        validatorFunction : function(value, $el, config, language, $form) {
          var allowedFiles = [".jpg", ".jpeg", ".png"];
          var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
          return regex.test(value.toLowerCase())
        },
        errorMessage : 'Only files of type jpg, png, gif, jpeg is allowed',
        errorMessageKey: 'wrongFiletype'
  });

  $.validate({
    modules : 'security, file'
  });
  // error generation
  $("#new_user").on('click','input:submit',function(){
    console.log("1")
    $("form div:first-child").removeClass("has-success").addClass("has-error");
    setTimeout(function(){},1000);
  });
});
