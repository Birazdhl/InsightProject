import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import BookStore from "./bookStore";

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  bookStore: BookStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.bookStore = new BookStore(this, this.userStore);
  }
}

export const RootStoreContext = createContext(new RootStore());
