class Api::CustomersController < ApplicationController
  protect_from_forgery with: :null_session
  # before_action :authenticate_user!, only: [:index]

  def index
    @customers = Customer.all
    if user_signed_in?
      render json: CustomerSerializer.new(@customers).serializable_hash
    else
      render json: {status: 401}
      # redirect_to root_path
    end
  end
end
