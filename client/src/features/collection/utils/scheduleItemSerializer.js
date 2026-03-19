export const toClient = (dbData) => ({
  id: dbData.id,
  name: dbData.name,
  code: dbData.code,
  parentCategory: dbData.parent_category,
  isMaster: dbData.is_master,
  provinces: dbData.provinces,
  createdAt: dbData.created_at,
  updatedAt: dbData.updated_at,
});

export const toServer = (clientData) => {
  const data = {
    id: clientData.id,
    name: clientData.name,
    code: clientData.code,
    parent_category: clientData.parentCategory,
    is_master: clientData.isMaster,
    provinces: clientData.provinces,
  };
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );
};
