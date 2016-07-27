$(document).on("turbolinks:load",function(){
	$.formUtils.addValidator({
    name : 'pwd_check',
    validatorFunction : function(value, $el, config, language, $form) {
      var field_name = $el.attr('id').replace("_confirmation",'');
      console.log(value);
      return value === $("#"+field_name).val();
    },
    errorMessage : 'Password does not match',
    errorMessageKey: 'badPasswordConfirmation'
  });

  // file validator with bug (doesnt support all mentioned file types)
  $.formUtils.addValidator({
        name : 'file_check',
        validatorFunction : function(value, $el, config, language, $form) {
          if (value == "")
            return; 
          var allowedFiles = [".jpg", ".jpeg", ".png"];
          console.log(value);
          var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
          return regex.test(value.toLowerCase())
        },
        errorMessage : 'Only files of type jpg, png, gif, jpeg is allowed',
        errorMessageKey: 'wrongFiletype'
  });

  // email check with bug (no message displayed)
  $.formUtils.addValidator({
      name: 'email_check',
      validatorFunction: function (email) {

        var emailParts = email.toLowerCase().split('@'),
          localPart = emailParts[0],
          domain = emailParts[1];

        if (localPart && domain) {

          if( localPart.indexOf('"') === 0 ) {
            var len = localPart.length;
            localPart = localPart.replace(/\"/g, '');
            if( localPart.length !== (len-2) ) {
              return false; // It was not allowed to have more than two apostrophes
            }
          }

          return $.formUtils.validators.validate_domain.validatorFunction(emailParts[1]) &&
            localPart.indexOf('.') !== 0 &&
            localPart.substring(localPart.length-1, localPart.length) !== '.' &&
            localPart.indexOf('..') === -1 &&
            !(/[^\w\+\.\-\#\-\_\~\!\$\&\'\(\)\*\+\,\;\=\:]/.test(localPart));
        }

        return false;
      },
      errorMessage: '',
      errorMessageKey: ''
  });

  $.validate({
    modules : 'security, file'
  });

  //Random replacing form elements depend on random number
  var timeToChange = Math.round(Math.random()*10) > 6;
  if (timeToChange) {
    var odds=$(".form-group:odd").detach();
    $("form").prepend(odds);
  }

  //  Adding error message before form submit + delay
  $("#new_user").submit(function(event){
    var self = this;
    var errMsg = '<span class="help-block form-error">This is a required field</span>';
    event.preventDefault();
    $("form > div:first").removeClass("has-success")
      .addClass("has-error").append(errMsg);
    //  Ignoring checkbox 'rememder me' state
    $("form input:checkbox").prop('checked', false);
    console.log($("form input:checkbox").is(":checked"));
    //  Delay
    setTimeout(self.submit(),2000);
  });

  //  Disabling drag and drop on file input on edit form
  $(".edit_form #user_photo").bind('drop dragover', function (e) {
     e.preventDefault();
  });

  if(window.location.toString().indexOf("edit") != -1) {
    console.log("");
    $('a[href$="/users"].btn').on('click',function(event){
      event.preventDefault();
    });
  }

  //  Changing prev and next buttons values
  //console.log($('li.next > a[rel="next"]'));
  if ($('li.next > a[rel="next"]').length > 0) {
    if($('li.prev > a[rel~="prev"]').length > 0) {
      //console.log("change");
      var tmp = $('li.next > a[rel="next"]').first().attr("href");
      //console.log(tmp);
      $('li.next > a[rel="next"]').attr("href",
        $('li.prev > a[rel~="prev"]').first().attr("href"));
      $('li.prev > a[rel~="prev"]').attr("href",tmp);
    }
  }

  //  Generating undefined when mouseover photo
  //console.log($("table").find("img").length);
  $("table").find("img").mouseover(function(){
    console.log(this.value);
  });

  //  Change font-size for last name label on edit form
  console.log($(".edit_form").find("#user_last_name").parent().siblings("label").length);
  $(".edit_form").find("#user_last_name").parent()
    .siblings("label").css({"font-size": "12px"});
});
