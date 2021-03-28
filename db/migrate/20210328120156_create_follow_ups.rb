class CreateFollowUps < ActiveRecord::Migration[6.1]
  def change
    create_table :follow_ups do |t|
      t.string :description
      t.date :date
      t.string :username
      t.references :customer, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
