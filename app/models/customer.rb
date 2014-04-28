class Customer < ActiveRecord::Base
	has_many :orders
	has_many :menus, through: :orders

	has_many :reviews
	has_many :menus, through: :reviews

	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/Icons_12.gif"
  	#validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
end
