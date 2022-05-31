class Producer < ApplicationRecord
  has_many :favorites, dependent: :destroy
  has_one_attached :photo
end
