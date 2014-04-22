class MenusController < ApplicationController
  def index
  	@reviews = Review.all
  end

end
