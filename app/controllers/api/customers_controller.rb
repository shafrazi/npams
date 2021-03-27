class Api::CustomersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def index 
    if user_signed_in?
      @customers = Customer.all
      render json: CustomerSerializer.new(@customers).serializable_hash
    else
      render json: {status: 401}
    end
  end

  def show
    @customer = Customer.find(params[:id])
    render json: CustomerSerializer.new(@customer).serializable_hash
  end

  def create
    @customer = Customer.new(customer_params)
    if @customer.save
      render json: CustomerSerializer.new(@customer).serializable_hash
    else
      render json: {errors: @customer.errors.full_messages}, status: 422
    end
  end

  def update
    @customer = Customer.find(params[:id])
    if @customer.update(customer_params)
      render json: CustomerSerializer.new(@customer).serializable_hash
    else
      render json: {errors: @customer.errors.full_messages}, status: 422
    end
  end

  private

  def customer_params
    params.require(:customer).permit(:first_name, :last_name, :uid, :status)
  end
end
