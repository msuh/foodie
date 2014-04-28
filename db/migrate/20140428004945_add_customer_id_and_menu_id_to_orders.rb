class AddCustomerIdAndMenuIdToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :customer_id, :integer
    add_column :orders, :menu_id, :integer
  end
end
