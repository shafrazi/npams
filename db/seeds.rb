# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

start_uid = 198568238374
statuses = ["Irregular", "Past due", "Overdue 2 mo", "Overdue 1 mo"]

100.times do |i|
  customer = Customer.create(uid: start_uid, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, status: statuses.sample)
  start_uid = start_uid + 154
end
