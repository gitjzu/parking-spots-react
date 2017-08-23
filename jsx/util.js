export function regionFrom(lat, lon, distance = 300 ) {
  distance = distance/2
  const circumference = 40075
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000
  const angularDistance = distance/circumference

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
  const longitudeDelta = Math.abs(Math.atan2(
          Math.sin(angularDistance)*Math.cos(lat),
          Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

  return result = {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
  }
}

//Placeholder for getting some kind of distance. This returns the crow fly path 
export function distance(lat1, lon1, lat2, lon2) {
  console.log('inside distance function')
  var p = 0.017453292519943295    // Math.PI / 180
  var c = Math.cos
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2

  console.log('distance: ' + 12742 * Math.asin(Math.sqrt(a)))
  return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
}