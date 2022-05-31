export type updateRoleFormType = {
  _id: string;
  roleType: string;
  roleId: string;
  rights: string[];
};

export type roleType = {
    _id: string;
    roleType: string;
    roleId: string;
    rights: string[];

}


export type roleFormType = {
    roleType: string;
    roleId: string;
    rights: string[];
}