import { useState } from 'react';
import toast from 'react-hot-toast';
import useFeeGuide from '../context/useFeeGuide';
import Button from '../../../components/ui/Button';
import ActionModal from '../../feedback/ActionModal';
import Feedback from '../../../config/feedback';
import './ItemEditorForm.css';

const { Toasts } = Feedback;

export default function ItemEditorForm() {
  const { guide, patchFeeGuideItem, deleteFeeGuideItem } = useFeeGuide();
  const [searchCode, setSearchCode] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [formData, setFormData] = useState({
    fee_min: 0,
    fee_max: 0,
    has_L_flag: false,
    has_E_flag: false,
    fee_strategy: 'NORMAL',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!guide?.fee_guide_items) return;
    const item = guide.fee_guide_items.find(i => i.schedule_item.code === searchCode);
    if (!item) {
      toast.error(Toasts.GUIDE_ITEM.SEARCH.NOT_FOUND);
      setSelectedItem(null);
      return;
    }
    setSelectedItem(item);
    setFormData({
      fee_min: item.fee_min_cents > 0 ? (item.fee_min_cents / 100).toFixed(2) : '',
      fee_max: item.fee_max_cents > 0 ? (item.fee_max_cents / 100).toFixed(2) : '',
      has_L_flag: item.has_L_flag,
      has_E_flag: item.has_E_flag,
      fee_strategy: item.fee_strategy || 'NORMAL',
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      fee_min_cents: formData.fee_min ? Math.round(parseFloat(formData.fee_min) * 100) : 0,
      fee_max_cents: formData.fee_max ? Math.round(parseFloat(formData.fee_max) * 100) : 0,
      fee_strategy: formData.fee_strategy,
      has_L_flag: formData.has_L_flag,
      has_E_flag: formData.has_E_flag,
    };
    
    patchFeeGuideItem(guide.id, selectedItem.id, payload)
      .then(() => {
        toast.success(Toasts.GUIDE_ITEM.UPDATE.SUCCESS(selectedItem.schedule_item.code));
      })
      .catch(() => {
        toast.error(Toasts.GUIDE_ITEM.UPDATE.FAILURE);
      });
  };

  const confirmDelete = () => {
    deleteFeeGuideItem(guide.id, selectedItem.id)
      .then(() => {
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
        setSearchCode('');
        toast.success(Toasts.GUIDE_ITEM.DELETE.SUCCESS);
      })
      .catch(() => {
        setIsDeleteModalOpen(false);
        toast.error(Toasts.GUIDE_ITEM.DELETE.FAILURE);
      });
  };

  return (
    <div className="item-editor">
      <h3 className="item-editor__heading">Item Editor</h3>
      <form onSubmit={handleSearch} className="item-editor__search-form">
        <input 
          type="text" 
          value={searchCode} 
          onChange={(e) => setSearchCode(e.target.value)} 
          placeholder="Code (e.g. 01101)"
          className="item-editor__search-input"
        />
        <Button type="submit" className="button--secondary" label="Search" />
      </form>

      {selectedItem && (
        <form onSubmit={handleSave} className="item-editor__form">
          <div className="item-editor__field-group">
            <label className="item-editor__label">Min Fee ($)</label>
            <input type="number" step="0.01" value={formData.fee_min} onChange={e => setFormData({...formData, fee_min: e.target.value})} className="item-editor__input" />
            
            <label className="item-editor__label">Max Fee ($)</label>
            <input type="number" step="0.01" value={formData.fee_max} onChange={e => setFormData({...formData, fee_max: e.target.value})} className="item-editor__input" />
          </div>

          <div className="item-editor__row">
            <label className="item-editor__label-inline">
              <input type="checkbox" checked={formData.has_L_flag} onChange={e => setFormData({...formData, has_L_flag: e.target.checked})} />
              +L Flag
            </label>
            <label className="item-editor__label-inline">
              <input type="checkbox" checked={formData.has_E_flag} onChange={e => setFormData({...formData, has_E_flag: e.target.checked})} />
              +E Flag
            </label>
          </div>

          <div className="item-editor__field-group item-editor__field-group--mt">
            <label className="item-editor__label-inline">
              <input type="radio" name="strategy" checked={formData.fee_strategy === 'NORMAL'} onChange={() => setFormData({...formData, fee_strategy: 'NORMAL'})} />
              Normal
            </label>
            <label className="item-editor__label-inline">
              <input type="radio" name="strategy" checked={formData.fee_strategy === 'I.C.'} onChange={() => setFormData({...formData, fee_strategy: 'I.C.'})} />
              I.C.
            </label>
            <label className="item-editor__label-inline">
              <input type="radio" name="strategy" checked={formData.fee_strategy === 'NO_FEE'} onChange={() => setFormData({...formData, fee_strategy: 'NO_FEE'})} />
              No Fee
            </label>
          </div>

          <div className="item-editor__field-group item-editor__field-group--mt">
            <Button type="submit" className="button--secondary button--full-width" label="Save Changes" />
            <Button type="button" className="button--danger button--full-width" label="Delete Procedure" onClick={() => setIsDeleteModalOpen(true)} />
          </div>
          
          <ActionModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            uiText={`Are you absolutely sure you want to permanently delete procedure code ${selectedItem.schedule_item.code} from this fee guide?`}
            confirmLabel='Delete Procedure'
          />
        </form>
      )}
    </div>
  );
}
