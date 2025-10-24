}}
                      min="1"
                    />
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>gramos</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                  🍽️ Tipos de Comidas
                </h2>
                <button
                  onClick={addMealType}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  + Añadir
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {mealTypes.map(meal => (
                  <div key={meal.id} style={{
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}>
                    {editingMealType === meal.id ? (
                      <>
                        <input
                          type="text"
                          value={meal.name}
                          onChange={(e) => updateMealType(meal.id, 'name', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            fontSize: '1rem'
                          }}
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <div>
                            <label style={{ fontSize: '0.625rem', color: '#16a34a', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                              Hidratos
                            </label>
                            <input
                              type="number"
                              value={meal.carbs}
                              onChange={(e) => updateMealType(meal.id, 'carbs', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '2px solid #16a34a',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                              }}
                              step="0.5"
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.625rem', color: '#2563eb', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                              Proteína
                            </label>
                            <input
                              type="number"
                              value={meal.protein}
                              onChange={(e) => updateMealType(meal.id, 'protein', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '2px solid #2563eb',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                              }}
                              step="0.5"
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.625rem', color: '#d97706', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                              Grasa
                            </label>
                            <input
                              type="number"
                              value={meal.fats}
                              onChange={(e) => updateMealType(meal.id, 'fats', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '2px solid #d97706',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                              }}
                              step="0.5"
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => setEditingMealType(null)}
                            style={{
                              flex: 1,
                              padding: '0.5rem',
                              background: '#10b981',
                              color: 'white',
                              borderRadius: '0.375rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => deleteMealType(meal.id)}
                            style={{
                              padding: '0.5rem',
                              background: '#ef4444',
                              color: 'white',
                              borderRadius: '0.375rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                            {meal.name}
                          </h3>
                          <button
                            onClick={() => setEditingMealType(meal.id)}
                            style={{
                              padding: '0.375rem 0.75rem',
                              background: '#f3f4f6',
                              color: '#374151',
                              borderRadius: '0.375rem',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Editar
                          </button>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          <span style={{ color: '#16a34a', fontWeight: '600' }}>{meal.carbs}H</span> | 
                          <span style={{ color: '#2563eb', fontWeight: '600' }}> {meal.protein}P</span> | 
                          <span style={{ color: '#d97706', fontWeight: '600' }}> {meal.fats}G</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '0.25rem 0.5rem',
        maxWidth: '28rem',
        margin: '0 auto',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: activeTab === tab.id ? 'rgb(147, 51, 234)' : 'rgb(107, 114, 128)'
                }}
              >
                <Icon size={22} />
                <span style={{ fontSize: '0.75rem', marginTop: '0.125rem' }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MacroDietApp;