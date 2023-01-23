import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonnelDTO } from '../../dto/personnel.dto';
import { Personnel, PersonnelDoc } from '../../schema/personnel.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PersonnelService {

  constructor(@InjectModel(Personnel.name) private personnelModel: Model<PersonnelDoc>) {}

  async create(createPersonnel: PersonnelDTO): Promise<Personnel> {

    const saltOrRounds = 10;
    console.log(createPersonnel)
    const password =createPersonnel.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    try {
      const createdPersonnel = await new this.personnelModel({
        typeofagency: createPersonnel.typeofagency,
  categoryofagency: createPersonnel.categoryofagency,
  nameoforganization: createPersonnel.nameoforganization,
  address: createPersonnel.address,
  descriptionofrole: createPersonnel.descriptionofrole,
  department: createPersonnel.department,
  station: createPersonnel.station,
  organizationsemail: createPersonnel.organizationsemail,
  landline: createPersonnel.landline,
  firstname: createPersonnel.firstname,
  lastname: createPersonnel.lastname,
  middlename: createPersonnel.middlename,
  rank: createPersonnel.rank,
  officialemail: createPersonnel.officialemail,
  officialphone: createPersonnel.officialphone,
  stateofservice: createPersonnel.stateofservice,
  lgaofservice: createPersonnel.lgaofservice,
  divisionhead: createPersonnel.divisionhead,
  phone: createPersonnel.phone,
  email: createPersonnel.email,
  branch: createPersonnel.branch,
  password: hash,
  refNunmber: createPersonnel.refNunmber,
  organizationId: createPersonnel.organizationId,
  personnelImage: createPersonnel.personnelImage,
  subId: createPersonnel.sub
      });

      return await createdPersonnel.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<Personnel[]> {
    try {
      return this.personnelModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<Personnel> {
    try {
      return this.personnelModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<Personnel[]> {

    const result = await this.personnelModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updatePersonnel: PersonnelDTO): Promise<Personnel> {
    try {
      const saltOrRounds = 17;


      if(updatePersonnel.password){
        const pass =updatePersonnel.password;
      // console.log(_id,password)
      const hash = await bcrypt.hash(pass, saltOrRounds);
      updatePersonnel.password=hash;
      }
      return this.personnelModel.findByIdAndUpdate({ _id }, updatePersonnel).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<Personnel> {
    try {
      return this.personnelModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  async resetpassword(password:any): Promise<Personnel> {
    const saltOrRounds = 17;
    const pass =password.password;
    // console.log(_id,password)
    const hash = await bcrypt.hash(pass, saltOrRounds);
    console.log(hash)
    try {
      return this.personnelModel.findByIdAndUpdate({ _id:password.id }, {password:hash}).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }}


}
