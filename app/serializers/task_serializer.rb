class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :deadline, :title, :description, :isCompleted, :tag
end
