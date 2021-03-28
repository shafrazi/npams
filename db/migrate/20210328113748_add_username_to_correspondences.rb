class AddUsernameToCorrespondences < ActiveRecord::Migration[6.1]
  def change
    add_column :correspondences, :username, :string
  end
end
