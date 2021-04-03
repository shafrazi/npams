class Api::FollowUpsController < ApplicationController
  before_action :authenticate_user!

  def index
    @follow_ups = FollowUp.order(date: :desc)
    render json: FollowUpsSerializer.new(@follow_ups).serializable_hash
  end

  def show
    @follow_up = FollowUp.find(params[:id])
    render json: FollowUpsSerializer.new(@follow_up).serializable_hash
  end

  def create
    @follow_up = current_user.follow_ups.new(follow_up_params)
    if @follow_up.save
      render json: FollowUpsSerializer.new(@follow_up).serializable_hash
    else
      render json: {errors: @follow_up.errors.full_messages}, status: 422
    end
  end

  def update
    @follow_up = FollowUp.find(params[:id])
    if @follow_up.update(follow_up_params)
      render json: FollowUpsSerializer.new(@follow_up).serializable_hash
    else
      render json: {errors: @follow_up.errors.full_messages}, status: 422
    end
  end

  def destroy
    @follow_up = FollowUp.find(params[:id])
    @follow_up.destroy
  end

  private

  def follow_up_params
    params.require(:follow_up).permit(:description, :date, :customer_id, :user_id, :username, :is_completed, :id, :created_at, :updated_at)
  end
end
