class Api::SessionsController < ApplicationController
  def get_user
    if user_signed_in?
      render json: current_user
    else
      render json: false
    end
  end

  def log_in
    user = User.find_by(email: params[:user][:email])
    if user && user.valid_password?(params[:user][:password])
      sign_in(user)
      render json: current_user
    else
      render json: false
    end
  end
end
