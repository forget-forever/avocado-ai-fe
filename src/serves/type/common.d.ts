declare namespace IRequest {
  namespace Common {
    type ILoginParams = {
      code: string
    }
    type ILoginRes = {
      Token: string;
      UserInfo: {
        UserName: string;
        Phone: string;
        Name: string;
        Gender: number;
        HeaderPic: string;
        UserType: number;
        UserStatus: number;
        Description: string;
        Photos: string;
        Country: string;
        Province: string;
        City: string;
        District: string;
        Birthday: string;
        UpdateTime: IDateTime;
        CreateTime: IDateTime;
      };
      OpenId: string;
    }
    type BindPhoneParams = {
      rawData: {
        encryptedData: string;
        iv:	string;
        cloudID?: string;
      }
      openId: string;
    }
    type BindPhoneRes =  {
      UserName: string;
      Phone: string;
      Name: string;
      Gender: number;
      HeaderPic: string;
      UserType: number;
      UserStatus: number;
      Description: string;
      Photos: string;
      Country: string;
      Province: string;
      City: string;
      District: string;
      Birthday: string;
      UpdateTime: IDateTime;
      CreateTime: IDateTime;
    }    
  }
  
}