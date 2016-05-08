class SuburbBoundary < CouchRest::Model::Base
    use_database 'suburb_boundaries'
    property :_id,      String
    # property :geometry, 

end
