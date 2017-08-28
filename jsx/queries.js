import gql from 'graphql-tag'

export const allSpotsQuery = gql`
query allSpotsQuery($userLat: Float, $userLon: Float) {
  Spots(userLat: $userLat, userLon: $userLon) {
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