class CreatePurchases < ActiveRecord::Migration
  def change
    create_table :purchases do |t|
      t.integer :quantity

      t.timestamps
    end
  end
end
