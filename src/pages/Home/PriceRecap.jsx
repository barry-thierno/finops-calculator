import React from 'react';
import { SectionRestitutionRow, Restitution } from '@axa-fr/react-toolkit-all';

import { formatCurrency } from 'shared/helpers';

const PriceRecap = ({ currentPrice, projectionPrice }) => {
  const estimationResult = currentPrice - projectionPrice;

  const resultLabel = multiplucator => {
    if (projectionPrice === 0 || estimationResult === 0) {
      return '';
    }
    return estimationResult > 0
      ? `Gain ${formatCurrency(multiplucator * estimationResult)}`
      : `Perte ${formatCurrency(Math.abs(multiplucator * estimationResult))}`;
  };

  const resultClassName = currentPrice - projectionPrice > 0 ? 'win' : 'lost';
  return (
    <SectionRestitutionRow title="Prix(service plan actuel vs projection)">
      <div className="restitution_bloc">
        <dl>
          <dt>Prix pour 1 region</dt>
          <dd>{`${formatCurrency(currentPrice)}/mois`}</dd>
        </dl>
        <dl>
          <dt>Prix projection pour 1 region</dt>
          <dd>{`${formatCurrency(projectionPrice)}/mois`}</dd>
        </dl>
      
          <dl>
           {estimationResult !== 0 && projectionPrice !== 0 && (
             <>
            <dt>Resultat pour 1 region</dt>
            <dd className={resultClassName}>{resultLabel(1)}</dd>
             </> )}
          </dl>
      </div>

      <div className="restitution_bloc">
        <dl>
          <dt>Prix pour 2 regions(North et West)</dt>
          <dd>{`${formatCurrency(2 * currentPrice)}/mois`}</dd>
        </dl>
        <dl>
          <dt>Prix projection pour 2 regions(North et West)</dt>
          <dd>{`${formatCurrency(2 * projectionPrice)}/mois`}</dd>
        </dl>
          <dl>
        {estimationResult !== 0 && projectionPrice !== 0 && (
          <>
            <dt>Resultat pour 2 regions</dt>
            <dd className={resultClassName}>{resultLabel(2)}</dd>
            
          </>
          )}
          </dl>
      
      </div>
    </SectionRestitutionRow>
  );
};

export default PriceRecap;
