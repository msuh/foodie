class Menu < ActiveRecord::Base
	has_many :purchases
	has_many :customers, through :purchases
end
