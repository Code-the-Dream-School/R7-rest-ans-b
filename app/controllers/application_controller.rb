class ApplicationController < ActionController::Base
 # include ActionController::RequestForgeryProtection
  include ExceptionHandler
 # require 'active_support/core_ext'

  private

  def return_invalid
    render json: {message: "Cross site forgery detected."}
  end
end
