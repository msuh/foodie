class ChangeNoteInOrders < ActiveRecord::Migration
  def change
  	change_column :orders, :note, :text
  end
end
