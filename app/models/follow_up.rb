class FollowUp < ApplicationRecord
  before_save :add_username
  belongs_to :customer
  belongs_to :user


  def add_username
    self.username = self.user.username
  end

  def customer_name
    self.customer.first_name + " " + self.customer.last_name
  end
end
