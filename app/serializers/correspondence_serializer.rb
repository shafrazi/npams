class CorrespondenceSerializer
  include JSONAPI::Serializer
  attributes :title, :date, :remarks, :customer_id, :user
end
