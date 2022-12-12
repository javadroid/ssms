export class VictimInfoDTO {
    id: number
    case: [{
        crimeId: string
        criminal: boolean
        victim: boolean
    }]
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
    birthDate: string
    image: string
    height: number
    weight: number
    eyeColor: string
    hair: {
      color: string
      type: string
    }
    address: {
      address: string
      lga: string
      start: string
      country: string
      coordinates: {
        lat: number
        lng: number
      }
      postalCode: number

    }

}
