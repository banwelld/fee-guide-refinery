export const toClient = (dbData) => ({
  id: dbData.id,
  email: dbData.email,
  role: dbData.role,
  status: dbData.status,
  nameFirst: dbData.name_first,
  nameLast: dbData.name_last,
  phone: dbData.phone,
  createdAt: dbData.created_at,
  updatedAt: dbData.updated_at,
});

export const toServer = (clientData) => ({
  id: clientData.id,
  email: clientData.email,
  role: clientData.role,
  status: clientData.status,
  name_first: clientData.nameFirst,
  name_last: clientData.nameLast,
  phone: clientData.phone,
  created_at: clientData.createdAt,
  updated_at: clientData.updatedAt,
  password: clientData.password,
  password_current: clientData.passwordCurrent,
});
