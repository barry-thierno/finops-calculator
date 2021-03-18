import React from 'react';
import {
  SectionRestitutionRow,
  HeaderRestitution,
  ArticleRestitution,
  Restitution,
  SectionRestitutionColumn,
  SectionRestitution,
} from '@axa-fr/react-toolkit-all';
import RegionAutoScaleTable from './RegionsAutoScaleTable';
import { formatCurrency } from 'shared/helpers';

const AutoScaleRecap = ({ currentPrice, projectionPrice, autoScaleRegion }) => {
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
    <ArticleRestitution>
      <HeaderRestitution title="Tarifs" />
      <SectionRestitution>
        <SectionRestitutionRow title="Prix(service plan actuel vs projection)">
          <div className="restitution_bloc">
            <Restitution
              label="Prix pour 1 region"
              value={`${formatCurrency(currentPrice)}/mois`}
            />
            <Restitution
              label="Prix projection pour 1 region"
              value={`${formatCurrency(projectionPrice)}/mois`}
            />
            {estimationResult !== 0 && projectionPrice !== 0 && (
              <Restitution
                classModifier={resultClassName}
                label="Resultat pour 1 region"
                value={resultLabel(1)}
              />
            )}
          </div>

          <div className="restitution_bloc">
            <Restitution
              label="Prix pour 2 regions"
              value={`${formatCurrency(2 * currentPrice)}/mois`}
            />
            <Restitution
              label="Prix projection pour 2 regions"
              value={`${formatCurrency(2 * projectionPrice)}/mois`}
            />
            {estimationResult !== 0 && projectionPrice !== 0 && (
              <Restitution
                classModifier={resultClassName}
                label="Resultat pour 2 regions"
                value={resultLabel(2)}
              />
            )}
          </div>
        </SectionRestitutionRow>
        <SectionRestitutionRow title="Resultats">
          <SectionRestitutionColumn classModifier="region">
            <div className="region-table-container">
              <RegionAutoScaleTable autoScaleRegion={autoScaleRegion} />
            </div>
          </SectionRestitutionColumn>
        </SectionRestitutionRow>
      </SectionRestitution>
    </ArticleRestitution>
  );
};

export default AutoScaleRecap;
