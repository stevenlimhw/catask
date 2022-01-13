class Task < ApplicationRecord
    belongs_to :user
    
    before_create :get_day_number
    # after_update :update_day_number

    def get_day_number
        if deadline.present?
            self.day = deadline.cwday
        else 
            self.day = 0
        end
    end

    # def update_day_number
    #     if deadline.present?
    #         self.day = deadline.cwday
    #     else 
    #         self.day = 0
    #     end
    # end

    # def generate_uuid
    #     self.id = SecureRandom.uuid
    # end

end
