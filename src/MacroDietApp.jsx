const MacroTag = ({ carbs, fats, protein, conversions }) => {
    const roundMacro = (value) => {
      const rounded = Math.round(value);
      return rounded === 0 && value > 0 ? 1 : rounded;
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {carbs > 0 && (
            <span style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: 'rgba(34, 197, 94, 0.15)',
              color: 'rgb(22, 163, 74)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              H:{(carbs / conversions.carbs).toFixed(1)}
            </span>
          )}
          {protein > 0 && (
            <span style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: 'rgba(59, 130, 246, 0.15)',
              color: 'rgb(37, 99, 235)',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              P:{(protein / conversions.protein).toFixed(1)}
            </span>
          )}
          {fats > 0 && (
            <span style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'rgb(217, 119, 6)',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              G:{(fats / conversions.fats).toFixed(1)}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.625rem',
            padding: '0.125rem 0.375rem',
            borderRadius: '0.25rem',
            background: '#f3f4f6',
            color: '#374151',
            fontWeight: '600'
          }}>
            {carbs > 0 && `${roundMacro(carbs)}g H`}
            {protein > 0 && (carbs > 0 ? ' | ' : '') + `${roundMacro(protein)}g P`}
            {fats > 0 && (carbs > 0 || protein > 0 ? ' | ' : '') + `${roundMacro(fats)}g G`}
          </span>
        </div>
      </div>
    );
  };