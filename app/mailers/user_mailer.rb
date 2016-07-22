class UserMailer < ApplicationMailer
  default :from => 'admin@lightit.com'

  def user_card_mail(user, email)
    @user = user
    mail :to => email, :subject => "#{@user.full_name}profile card"
  end

  def new_registration(user)
    @user = user
    mail :to => @user.email, :subject => "Welcom to testers application"
  end

end
