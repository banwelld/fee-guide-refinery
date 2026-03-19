import Button from '../../../components/ui/Button';

export default function ToolbarControls({
  guideId,
  setGuideId,
  format,
  setFormat,
  onExport,
  isLoading,
  feeGuides,
}) {
  return (
      <div className='form form--item-filter'>
        <div className='input-wrapper'>
          <label>Select Guide</label>
          <select
            value={guideId || ''}
            onChange={(e) => setGuideId(Number(e.target.value))}
            className='field__input field__select--export-guide'>
            <option value='' disabled>
              Choose a guide...
            </option>
            {feeGuides?.map((fg) => (
              <option key={fg.id} value={fg.id}>
                {fg.provinceCode} - {fg.specialtyCode} {fg.yearEffective}
              </option>
            ))}
          </select>
        </div>

        <div className='input-wrapper'>
          <label>Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className='field__input field__select--export-format'>
            <option value='json'>JSON</option>
            <option value='csv'>CSV</option>
            <option value='tsv'>TSV</option>
          </select>
        </div>

        <Button
          onClick={onExport}
          disabled={!guideId || isLoading}
          className='button--secondary button--full-width'
          label={isLoading ? 'Loading Context...' : 'Download Guide'}
        />
      </div>
  );
}
