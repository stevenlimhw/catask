class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.day :integer
      t.date :deadline
      t.string :title
      t.string :description
      t.boolean :isCompleted
      t.string :tag

      t.timestamps
    end
  end
end
