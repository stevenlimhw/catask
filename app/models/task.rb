class Task < ApplicationRecord
    belongs_to :user
    
    before_create :get_day_number, :set_default_tag
    after_update :update_day_number

    def get_day_number
        if deadline.present?
            self.day = deadline.cwday
        else 
            self.day = 0
        end
    end

    def update_day_number
        if deadline.present?
            self.day = deadline.to_date.cwday
        else
        end
    end

    def set_default_tag
        if !(tag.present?)
            self.tag = "unsorted"
        else
        end
    end
    
end
