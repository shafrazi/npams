Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    resources :customers
  end

  root to: 'pages#index'
  get "*path", to: 'pages#index', via: :all
end
