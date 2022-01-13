class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :deadline, :day, :title, :description, :isCompleted, :tag, :user_id
end
