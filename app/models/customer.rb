class Customer < ApplicationRecord
  has_many :correspondences
  has_many :follow_ups
end
