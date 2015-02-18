require 'sinatra'

class MyApp < Sinatra::Base

  get "/" do
    erb :index

  end

  post "/" do
    erb :index
  end

  get "/form" do
    erb :form
  end

  get "/about" do
    erb :about
  end

  get "/api" do
    erb :api
  end

end
