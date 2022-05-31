# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "open-uri"
require "faker"

User.destroy_all

file_user = URI.open('https://file1.closermag.fr/var/closermag/storage/images/media/images-des-contenus/galerie/2016-09-09-14-fois-ou-hugh-grant-nous-a-donne-envie-de-l-epouser-photos/hugh-grant12/5461072-1-fre-FR/Hugh-Grant.jpg?alias=original')
user = User.new(
  email: "hugh.grant@sfr.fr",
  password: "biomap"
  )
user.photo.attach(io: file_user, filename: "Hugh-Grant", content_type: 'image/png')
user.save!
