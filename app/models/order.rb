class Order < ActiveRecord::Base
	belongs_to :customer
	belongs_to :menu

	default_scope -> { order('desired_at ASC') }
	validates :customer_id, presence: true
	validates :menu_id, presence: true
end
