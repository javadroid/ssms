export class CrimeInfoDTO{
    crimeId!: string;
    personnelId!: string;
    weapon!: string;
    crimeCategory!: string;
    crimeType!:string;
    crimeDate!: Date;
    crimeTime!: Date;
    statementOfOffense!: string;
    incidentId!: string;
    policy!: string;
    progressStatus!: string;
    criminalId!: string[];
    motive!: string;
    victimId!: string;
    evidence!: Evidence[];
    reportId!: string;
    locationId!: string;
}

class Evidence {
  type!: string;
  vehicleId!: string;
  brand!: string;
  license!: string;
  modelNo!: string;
  file!: string;
}
