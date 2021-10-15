export function isNumberValidate(number?: string){
  if(!number){
    return false;
  }
  return /^tc\d{3,8}$/.test(String(number).trim());
}

export const parser = (s: string | undefined)=>(s && parseInt(s, 10) || 0);
