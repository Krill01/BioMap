class CreateProducers < ActiveRecord::Migration[6.1]
  def change
    create_table :producers do |t|
      t.string :name
      t.string :type
      t.string :lieu
      t.string :postal_code
      t.string :city
      t.string :email
      t.string :phone_number
      t.string :url
      t.float :latitude
      t.float :longitude
      t.string :production
      t.integer :agence_bio_id

      t.timestamps
    end
  end
end
