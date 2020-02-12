export interface IAddTodoState {
  title: string;
  description: string;
  timestamp?: string;
};

export interface ITodoList {
  _id?: string;
  title: string;
  description: string;
  timestamp?: string;
}

export interface IDisplayTodoState extends ITodoList {
  list: ITodoList[],
  isShow: boolean
}
