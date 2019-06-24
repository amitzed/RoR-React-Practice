class PeopleController < ApplicationController
  skip_before_action :verify_authenticity_token

  # get index (all)
  def index
    render json: Person.all
  end

  # get one (by id)
  def show
    render json: Person.find(params["id"])
  end

  # create one
  def createOne
    render json: Person.create(params["person"])
  end

  # create a person for a company
  def createForCompany
    #takes the :id for the company and converts it to company_id for person
    if params["id"]
        params["person"]["company_id"] = params["id"].to_i
    end
    render json: Person.create(params["person"])
  end

  # delete one (by id)
  def delete
    render json: Person.delete(params["id"])
  end

  # update one (by id)
  def update
    render json: Person.update(params["id"], params["person"])
  end

end
