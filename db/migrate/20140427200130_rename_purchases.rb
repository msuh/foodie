class RenamePurchases < ActiveRecord::Migration
  def change
  	rename_table :purchases, :orders
  end
end
