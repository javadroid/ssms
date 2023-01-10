import {
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import  { HydratedDocument,  } from 'mongoose';

  export type VictimInfoDoc = HydratedDocument<VictimInfo>;

  @Schema({ timestamps: true })
export class VictimInfo {
  @Prop()
  id: string
  @Prop()
  case: [{
      crimeId: string
      criminal: boolean
      victim: boolean
  }]
  @Prop()
  firstName: string
  @Prop()
  lastName: string
  @Prop()
  maidenName: string
  @Prop()
  age: number
  @Prop()
  gender: string
  @Prop()
  email: string
  @Prop()
  phone: string
  @Prop()
  birthDate: string
  @Prop()
  image: string
  @Prop()
  height: number
  @Prop()
  weight: number
  @Prop()
  eyeColor: string
  @Prop()
  hair: [{
    color: string
    type: string
  }]
  @Prop()
  address: [{
    address: string
    lga: string
    start: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }

    postalCode: number

  }]

}

export const victimInfoSchema = SchemaFactory.createForClass(VictimInfo);
