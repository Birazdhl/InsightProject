export interface IBookRequestStatus {
  bookid: number;
  userid: string;
  requestCancelBook: string;
}

export interface IRequestReject {
  id: number;
  bookname: string;
  approveorreject: string;
  returndate: number;
  name: string;
  emailAddress: string;
  takenBy: string | undefined;
  requestedId: string;
}

export interface IRecordHistory {
  id: number;
  bookname: string;
  takenBy: string;
  takenOn: Date;
  returnDate: Date;
  deadline: Date;
  daysDelayed: number;
}
