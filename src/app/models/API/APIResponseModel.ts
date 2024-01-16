
export class APIResponseModel {
  success: boolean;
  message: string;
  data: any[];

  constructor(d?: any) {
    this.success = d?.success;
    this.message = d?.message;
    this.data = d?.data;
  }


  public isSuccess() {
   return this.success;
  }

}
