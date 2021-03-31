class CustomerSerializer
  include JSONAPI::Serializer
  attributes :uid, :first_name, :last_name, :status, :correspondences, :follow_ups
end
