export interface Users {
  title: String;
  body: String;
  category: String;
  categorynumber: Number;
  guropsnumber: Number;
  // user_token: String;
}

export interface GetUsers {
  id: Number;
  title: String;
  body: String;
  category: String;
  created_at: String;
  updated_at: String;
  categorynumber: Number;
  guropsnumber: Number;

  user_token: any;
}
