import gql from 'graphql-tag'

export const allSpotsQuery = gql`
query allSpotsQuery($userLat: Float, $userLon: Float, $offset: Int, $limit: Int, $type: String) {
  Spots(userLat: $userLat, userLon: $userLon, offset: $offset, limit: $limit, type: $type) {
    id
    spot_name
    lat
    lon
    distance
    type
    coordinates{
      latitude
      longitude
    }
  }
}`