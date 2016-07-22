Rails.application.routes.draw do

  devise_for :users, :path => 'auth', :path_names => {
    :sign_in => 'login', :sign_out => 'logout'
  }
  resources :users do
    member do
      get 'send_profile_card'
    end
  end


  devise_scope :user do
    authenticated :user do
      root 'users#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
end
