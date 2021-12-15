class Task < ApplicationRecord
    before_create :get_day_number
    def get_day_number
        self.day = deadline.cwday
    end
end
