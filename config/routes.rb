Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # =================================================
  #             ROUTES FOR PEOPLE MODEL
  # =================================================
  get '/people', to:  'people#index'
  get '/people/:id', to:  'people#show'
  post '/people', to:  'people#createOne'
  post '/companies/:id/staff', to:  'people#createForCompany'
  delete '/people/:id', to:  'people#delete'
  put '/people/:id', to:  'people#update'


  # =================================================
  #            ROUTES FOR COMPANY MODEL
  # =================================================

  get '/companies', to: 'companies#index'
  get '/companies/:id', to: 'companies#show'
  post '/companies', to: 'companies#create'
  post '/people/:id', to: 'companies#createWithStaff'
  delete '/companies/:id', to: 'companies#delete'
  put '/companies/:id', to: 'companies#update'

end
