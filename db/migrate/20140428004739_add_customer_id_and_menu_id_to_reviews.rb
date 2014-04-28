class AddCustomerIdAndMenuIdToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :customer_id, :integer
    add_column :reviews, :menu_id, :integer
  end
end
