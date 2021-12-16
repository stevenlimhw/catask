class Task < ApplicationRecord
    before_create :get_day_number
    def get_day_number
        if deadline.present?
            self.day = deadline.cwday
        else 
            self.day = 0
        end
    end
end
