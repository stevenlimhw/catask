class AddUserRefToTasks < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :user, null: false, foreign_key: true, type: :uuid
  end
end
