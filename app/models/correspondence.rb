class Correspondence < ApplicationRecord
  before_save :add_username
  belongs_to :customer
  belongs_to :user

  def add_username
    self.username = self.user.username
  end
end
