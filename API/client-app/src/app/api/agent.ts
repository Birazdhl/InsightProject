import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IBooks, IBookNameAndId } from "../models/books";
import {
  IBookRequestStatus,
  IRequestReject,
  IRecordHistory,
} from "../models/bookStatus";

axios.defaults.baseURL = "https://localhost:44396/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Books = {
  list: (): Promise<IBooks[]> => requests.get("/Book/GetBookList"),
  create: (book: string) => requests.get(`/Book/CreateBook/${book}`),
  details: (id: number) => requests.get(`/Book/GetBookById/${id}`),
  update: (book: IBookNameAndId) => requests.post(`/Book/UpdateBook/`, book),
  delete: (id: number) => requests.get(`/Book/Delete/${id}`),
};

const BookStatus = {
  sendRequest: (bookStatus: IBookRequestStatus) =>
    requests.post("/BookStatus/MakeABookRequest", bookStatus),

  approveRejectRequest: (bookStatus: IRequestReject) =>
    requests.post("/BookStatus/ApproveRejectRequest", bookStatus),

  bookSubmitedByUser: (id: number) =>
    requests.get(`/BookStatus/BookSubmittedByUser/${id}`),

  booksRecord: (): Promise<IRecordHistory[]> =>
    requests.get("/BookStatus/BookHistory"),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};

export default {
  User,
  Books,
  BookStatus,
};
