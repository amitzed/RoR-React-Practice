# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# =====================================================
#             SEEDS PEOPLE & COMPANIES
# =====================================================

# SQL commands to drop table and reseed
# drop table if exists companies;
# drop table if exists people;

# COMPANIES
5.times do
  Company.create({
    'company_name' => "#{Faker::TvShows::SiliconValley.company}",
    'industry' =>  "#{Faker::Job.field}",
    'rating' =>  Faker::Number.between(-1, 5),
    'mission_statement' =>  "#{Faker::Company.catch_phrase}, #{Faker::Company.bs}"
  })
end

# PEOPLE
10.times do
  random_number = rand(1111)
  Person.create({
    'name' =>  "#{Faker::Name.name}",
    'age' =>  Faker::Number.between(18, 110),
    'phone' =>  "#{Faker::PhoneNumber.cell_phone}",
    'avatar' =>  Faker::Avatar.image(random_number, "100x100"),
    'key_skill'=>  "#{Faker::Job.key_skill}",
    'company_id' =>  Faker::Number.between(1,5)
  })
end

p "companies and people data seeded"
