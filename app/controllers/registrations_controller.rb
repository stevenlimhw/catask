class RegistrationsController < ApplicationController
    # users_controller (sign up)
    # creates new user instance

    def create 
        user = User.new(registration_params)

        if user.save
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
            # redirect_to root_path, notice: 'Successfully created account'
        else
            render json: { status: 500 }
        end
    end

    private
    def registration_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end