# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tasks = Task.create(
    [
        {   
            deadline: Date.new(2021, 12, 25),
            title: "Physics Assignment",
            description: "Newtonian Mechanics from last week's lecture" ,
            isCompleted: false,
            tag: "Academics"
        },
        {   
            deadline: Date.new(2022, 1, 11),
            title: "Maths Assignment",
            description: "Counting Homework" ,
            isCompleted: false,
            tag: "Academics"
        }
    ]
)