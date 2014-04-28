class CustomerController < ApplicationController

	# GET /customers
  	# GET /customers.json
	def index
		@customers = User.all

		respond_to do |format|
			format.html
			format.json { render json: @customers }
		end
	end

	# GET /customers/1
  	# GET /customers/1.json
	def show
		@user = User.find(params[:id])

		respond_to do |format|
			format.html
			format.json { render json: @customers }
		end
	end


	# GET /customers/new
  	# GET /customers/new.json
	def new
		@customer = Customer.new

		respond_to do |format|
			format.html
			format.json { render json: @customer }
	end

	# POST /customers
  	# POST /customers.json
  	def create
  		@user = User.new( customer_params )

  		respond_to do |format|
  			if @customer.save
  				format.html {redirect_to @customer, notice: 'Customer was successfully created.'}
  				format.json {render json: @customer, status: :created, location: @customer}
  			else
  				format.html {render action: "new"}
  				format.json {render json: @customer.errors, status: :unprocessable_entity}
  			end
  		end
  	end

	end

	# GET /customers/1/edit
	def edit
		@customer = Customer.find(params[:id])
	end

	# PUT /customers/1
	# PUT /customers/1.json
	def update
		@customer = Customer.find(params[:id])

		respond_to do |format|
			if @customer.update_attributes(params[:customer])
				format.html { redirect_to @customer, notice: 'Customer was successfully updated' }
				format.json { head :no_content }
			else
				format.html { render action "edit" }
				format.json { render json: @customer.errors, status: :unprocessable_entity}
			end
		end
	end

	# DELETE /customers/1
  	# DELETE /customers/1.json
	def destroy
		@customer = Customer.find(params[:id])
		@customer.destroy

		respond_to do |format|
			format.html {redirect_to customer_url}
			format.json {head :no_content}
		end
	end

	private

	# Use strong_parameters for attribute whitelisting
	# Be sure to update your create() and update() controller methods.

		def customer_params
		  params.require(:customer).permit(:avatar)
		end
end