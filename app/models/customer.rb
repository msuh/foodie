class Customer < ActiveRecord::Base
	has_many :purchases
	has_many :menus, through :purchases
end
