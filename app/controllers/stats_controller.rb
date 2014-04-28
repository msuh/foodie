class StatsController < ApplicationController
  def index
  	@reviews = Review.all
  end
end
