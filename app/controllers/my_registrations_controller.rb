class MyRegistrationsController < Devise::RegistrationsController

  def create
    begin
      raise "error" if rand(3) > 1
    rescue
      render(file: "#{Rails.root}/public/500.html", 
        layout: false, status: 500) and return
    end
    super
    if @user.persisted?
      UserMailer.new_registration(@user).deliver!
      flash[:notice] = "You have successfully signed up on the website. Login and password were sent to your mail."
    end
  end

  def error
    render :html => "<strong>500</strong><p>Internet Servise Error</p>".html_safe and return
  end
end
