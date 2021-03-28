class FollowUpsSerializer
  include JSONAPI::Serializer
  attributes :description, :date, :username
end
