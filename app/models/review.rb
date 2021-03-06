class Review < ActiveRecord::Base
	belongs_to :customer
	belongs_to :menu

	validates :customer_id, presence: true
	validates :menu_id, presence: true

	def self.avatar
		self.customer.avatar
	end

end
