class Api::CustomersController < ApplicationController
  protect_from_forgery with: :null_session
  # before_action :authenticate_user!, only: [:index]

  def index 
    if user_signed_in?
      @customers = Customer.all
      render json: CustomerSerializer.new(@customers).serializable_hash
    else
      render json: {status: 401}
    end
  end
end
