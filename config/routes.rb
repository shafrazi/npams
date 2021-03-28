Rails.application.routes.draw do
  get "app", to: 'pages#app', as: "app"
  devise_for :users
  get "api/get_user", to: 'api/sessions#get_user'
  post "api/log_in", to: 'api/sessions#log_in'
  

  namespace :api do
    resources :customers
    resources :correspondences
    resources :follow_ups
  end

  root to: 'pages#index'
  # get "*path", to: 'pages#index', via: :all
end
