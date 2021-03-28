class Api::CorrespondencesController < ApplicationController
  before_action :authenticate_user!
  def index
    @correspondences = Correspondence.all
    render json: CorrespondenceSerializer.new(@correspondences).serializable_hash
  end

  def show
    @correspondence = Correspondence.find(params[:id])
    render json: CorrespondenceSerializer.new(@correspondence).serializable_hash
  end

  def create
    @correspondence = Correspondence.new(correspondence_params)
    if @correspondence.save
      render json: CorrespondenceSerializer.new(@correspondence).serializable_hash
    else
      render json: {errors: @correspondence.errors.full_messages}, status: 422
    end
  end

  def update
    @correspondence = Correspondence.find(params[:id])
    if @correspondence.update(correspondence_params)
      render json: CorrespondenceSerializer.new(@correspondence).serializable_hash
    else
      render json: {errors: @correspondence.errors.full_messages}, status: 422
    end
  end

  def destroy
    @correspondence = Correspondence.find(params[:id])
    @correspondence.destroy
    
  end

  private

  def correspondence_params
    params.require(:correspondence).permit(:title, :date, :remarks, :customer_id)
  end
end
