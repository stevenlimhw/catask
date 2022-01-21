module Api 
    module V1 
        class TasksController < ApplicationController
            include CurrentUserConcern

            def index
                if @current_user
                    tasks = Task.where(user_id: @current_user.id)
                    render json: TaskSerializer.new(tasks).serialized_json
                else
                    head :ok
                end
            end

            def show
                task = Task.find(params[:id])

                render json: TaskSerializer.new(task).serialized_json
            end

            def create 
                task = Task.new(task_params)

                if task.save
                    render json: TaskSerializer.new(task).serialized_json
                else
                    render json: { error: task.errors.messages }, status: 422
                end
            end

            def update
                task = Task.find(params[:id])

                if task.update(task_params)
                    render json: TaskSerializer.new(task).serialized_json
                else
                    render json: { error: task.errors.messages }, status: 422
                end
            end

            def destroy
                task = Task.find(params[:id])

                if task.destroy
                    head :no_content
                else 
                    render json: { error: task.errors.messages }, status: 422
                end
            end

            private

            def task_params
                params.require(:task).permit(:deadline, :title, :description, :isCompleted, :tag, :user_id, :day)
            end
        end
    end
end