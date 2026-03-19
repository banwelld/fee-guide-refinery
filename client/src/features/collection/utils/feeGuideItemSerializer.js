import * as scheduleItemSerializer from './scheduleItemSerializer';

export const toClient = (dbData) => ({
  id: dbData.id,
  feeMinCents: dbData.fee_min_cents,
  feeMaxCents: dbData.fee_max_cents,
  feeStrategy: dbData.fee_strategy,
  hasLFlag: dbData.has_L_flag,
  hasEFlag: dbData.has_E_flag,
  hasPSFlag: dbData.has_PS_flag,
  isProvinceSpecific: dbData.is_province_specific,
  feeGuideId: dbData.fee_guide_id,
  scheduleItemId: dbData.schedule_item_id,
  parentCategory: dbData.parent_category,
  createdAt: dbData.created_at,
  updatedAt: dbData.updated_at,
  updatedBy: dbData.updated_by,
  scheduleItem: dbData.schedule_item ? scheduleItemSerializer.toClient(dbData.schedule_item) : null,
});

export const toServer = (clientData) => {
  const data = {
    id: clientData.id,
    fee_min_cents: clientData.feeMinCents,
    fee_max_cents: clientData.feeMaxCents,
    fee_strategy: clientData.feeStrategy,
    has_L_flag: clientData.hasLFlag,
    has_E_flag: clientData.hasEFlag,
    has_PS_flag: clientData.hasPSFlag,
    is_province_specific: clientData.isProvinceSpecific,
    fee_guide_id: clientData.feeGuideId,
    schedule_item_id: clientData.scheduleItemId,
    parent_category: clientData.parentCategory,
  };
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );
};
