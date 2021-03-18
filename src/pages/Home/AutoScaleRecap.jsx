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
  const resultLabel = () => {
    if (projectionPrice === 0 || estimationResult === 0) {
      return '';
    }
    return estimationResult > 0
      ? `Gain ${estimationResult} €`
      : `Perte ${Math.abs(estimationResult)} €`;
  };

  const resultClassName = currentPrice - projectionPrice > 0 ? 'win' : 'lost';

  return (
    <ArticleRestitution>
      <HeaderRestitution title="Tarifs" />
      <SectionRestitution>
        <SectionRestitutionRow title="Prix(service plan actuel vs projection)">
          <SectionRestitutionColumn>
            <Restitution
              label="Prix pour une region"
              value={`${formatCurrency(currentPrice)}/mois`}
            />
          </SectionRestitutionColumn>
          <SectionRestitutionColumn>
            <Restitution
              label="Prix Projection"
              value={`${formatCurrency(projectionPrice)}/mois`}
            />
            {estimationResult !== 0 && projectionPrice !== 0 && (
              <Restitution
                classModifier={resultClassName}
                label="Resultat"
                value={resultLabel()}
              />
            )}
          </SectionRestitutionColumn>
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
