export const toClient = (dbData) => ({
  id: dbData.id,
  provinceCode: dbData.province_code,
  specialtyCode: dbData.specialty_code,
  yearEffective: dbData.year_effective,
  accountId: dbData.account_id,
  createdAt: dbData.created_at,
  updatedAt: dbData.updated_at,
});

export const toServer = (clientData) => ({
  id: clientData.id,
  province_code: clientData.provinceCode,
  specialty_code: clientData.specialtyCode,
  year_effective: clientData.yearEffective,
  account_id: clientData.accountId,
});
