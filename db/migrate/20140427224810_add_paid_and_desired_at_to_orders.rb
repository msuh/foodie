class AddPaidAndDesiredAtToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :paid, :boolean
    add_column :orders, :desired_at, :datetime
  end
end
