import gql from 'graphql-tag'

export const allSpotsQuery = gql`
query allSpotsQuery($userLat: Float, $userLon: Float, $offset: Int, $limit: Int) {
  Spots(userLat: $userLat, userLon: $userLon, offset: $offset, limit: $limit) {
    id
    spot_name
    lat
    lon
    distance
    coordinates{
      latitude
      longitude
    }
  }
}`