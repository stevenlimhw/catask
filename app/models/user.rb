class User < ApplicationRecord
    has_secure_password
    has_many :tasks

    validates_presence_of :email
    validates_uniqueness_of :email
    # validates :email, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'Invalid email' }
end
