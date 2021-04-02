class AddIsCompletedToFollowUps < ActiveRecord::Migration[6.1]
  def change
    add_column :follow_ups, :is_completed, :boolean
  end
end
