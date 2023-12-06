INSERT INTO
  users (id, name, email, password)
VALUES
  (
    1,
    'Bob Smith',
    'bob@smith.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  ),
  (
    2,
    'Debra Doe',
    'debra@doe.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  ),
  (
    3,
    'John James',
    'john@james.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  );

INSERT INTO properties (
  id,
  owner_id,
  title,
  description,
  thumbnail_photo_url,
  cost_per_night,
  cover_photo_url,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms,
  country,
  street,
  city,
  province,
  post_code,
  active
)
VALUES
  (
    1,
    1,
    'Cozy Cottage',
    'Description',
    'cottage_thumbnail.jpg',
    100,
    'cottage_cover.jpg',
    2,
    1,
    2,
    'Canada',
    '123 Maple St',
    'Smalltown',
    'Ontario',
    'M1A 1A1',
    true
  ),
  (
    2,
    2,
    'Modern Apartment',
    'Description',
    'apartment_thumbnail.jpg',
    150,
    'apartment_cover.jpg',
    1,
    1,
    1,
    'Canada',
    '456 Oak St',
    'Bigcity',
    'Quebec',
    'G2B 2B2',
    true
  ),
  (
    3,
    3,
    'Spacious Villa',
    'Description',
    'villa_thumbnail.jpg',
    300,
    'villa_cover.jpg',
    3,
    3,
    4,
    'Canada',
    '789 Pine St',
    'Mountainview',
    'British Columbia',
    'V5V 5V5',
    true
  );

INSERT INTO reservations (
  id,
  start_date,
  end_date,
  property_id,
  guest_id
)
VALUES
  (
    1,
    '2023-12-15',
    '2023-12-20',
    1,
    2
  ),
  (
    2,
    '2023-11-10',
    '2023-11-15',
    2,
    3
  ),
  (
    3,
    '2024-01-05',
    '2024-01-10',
    3,
    1
  );

INSERT INTO property_reviews (
  id,
  guest_id,
  property_id,
  reservation_id,
  rating,
  message
)
VALUES
  (
    1,
    2,
    1,
    1,
    4.5,
    'message'
  ),
  (
    2,
    3,
    2,
    2,
    5.0,
    'message'
  ),
  (
    3,
    1,
    3,
    3,
    3.8,
    'message'
  );
