class AddUserIdToCorrespondences < ActiveRecord::Migration[6.1]
  def change
    add_column :correspondences, :user_id, :integer
  end
end
