class MyRegistrationsController < Devise::RegistrationsController

  def create
    super
    if @user.persisted?
      UserMailer.new_registration(@user).deliver!
      flash[:notice] = "You have successfully signed up on the website. Login and password were sent to your mail."
    end
  end

end
