class CompaniesController < ApplicationController

  skip_before_action :verify_authenticity_token

  # get index (all)
  def index
    render json: Company.all
  end

  # get one (by id)
  def show
    render json: Company.find(params["id"])
  end

  # create just the company
  def create
    render json: Company.create(params["company"])
  end

  # create a company with staff
  def createWithStaff
    created_location = Company.create(params["company"])
    if params["id"]
      updated_person = Person.setCompany(params["id"], created_location)
    end
    render json: created_location
  end

  # delete one (by id)
  def delete
    render json: Company.delete(params["id"])
  end

  # update one (by id)
  def update
    render json: Company.update(params["id"], params["company"])
  end

end
