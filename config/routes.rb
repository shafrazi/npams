Rails.application.routes.draw do
  devise_for :users
  # devise_for :users
  get "api/get_user", to: 'api/sessions#get_user'
  # get "users/sign_out", to: 'users/sessions#destroy'

  namespace :api do
    resources :customers
  end

  root to: 'pages#index'
  get "*path", to: 'pages#index', via: :all
end
