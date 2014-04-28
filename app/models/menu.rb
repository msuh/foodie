class Menu < ActiveRecord::Base
	has_many :orders
	has_many :customers, through: :orders

	has_many :reviews
	has_many :customers, through: :reviews
end
