class SessionsController < ApplicationController
    # controller for user log in
    include CurrentUserConcern

    def create
        user = User.find_by(email: user_params[:email])

        if user && user.authenticate(user_params[:password])
            session[:user_id] = user.id
            render json: {
                status: :created,
                logged_in: true,
                user: user
            }
            # redirect_to root_path, notice: 'Logged in successfully'
        else
            # flash.now[:alert] = 'Invalid email or password'
            render json: { status: 401 }
        end
    end

    def logged_in
        if @current_user
            render json: {
                logged_in: true,
                user: @current_user
            }
        else 
            render json: {
                logged_in: false
            }
        end
    end

    def logout 
        reset_session
        render json: { status: 200, logged_out: true }
    end 

    private

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
