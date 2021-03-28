class CreateCorrespondences < ActiveRecord::Migration[6.1]
  def change
    create_table :correspondences do |t|
      t.string :title
      t.date :date
      t.string :remarks
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
