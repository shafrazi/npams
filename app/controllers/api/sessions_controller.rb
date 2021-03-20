class Api::SessionsController < ApplicationController
  def get_user
    if user_signed_in?
      render json: current_user
    else
      render json: false
    end
  end
end
