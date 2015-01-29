require 'sinatra'

class MyApp < Sinatra::Base

  get "/" do
    erb :index
  end


  # This is where your code will go
end
