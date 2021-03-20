class CreateCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :customers do |t|
      t.string :uid
      t.string :first_name
      t.string :last_name
      t.string :status

      t.timestamps
    end
  end
end
