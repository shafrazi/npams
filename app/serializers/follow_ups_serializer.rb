class FollowUpsSerializer
  include JSONAPI::Serializer
  attributes :description, :date, :username, :customer_id, :customer_name, :is_completed
end