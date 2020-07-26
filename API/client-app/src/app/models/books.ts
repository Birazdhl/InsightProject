export interface IBooks {
  id: number;
  bookName: string;
  issuedOn: Date;
  returnDate: Date;
  isReturned: boolean;
  isRequested: boolean;
  isAvailable: boolean;
  isTaken: boolean;
  Name: string;
  requestedBy: string;
  requestedEmail: string;
  requestedId: string;
}

export interface IBookNameAndId {
  id: number;
  bookname: string;
}
