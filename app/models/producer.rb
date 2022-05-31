class Producer < ApplicationRecord
  has_many :favorites, dependent: :destroy
end
