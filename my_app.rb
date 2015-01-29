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

end
