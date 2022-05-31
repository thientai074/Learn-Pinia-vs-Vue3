export type updateUserFormType = {
  _id: string;
  fullName: string;
  role: string;
  isDisabled: boolean;
};

export type userType = {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  isDisabled: boolean;
  detailRole: any;
};
