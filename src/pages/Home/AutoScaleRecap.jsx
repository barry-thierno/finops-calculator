import React from 'react';
import {
  SectionRestitutionRow,
  HeaderRestitution,
  ArticleRestitution,
  SectionRestitution,
  Alert,
} from '@axa-fr/react-toolkit-all';
import RegionAutoScaleTable from './RegionsAutoScaleTable';

const AutoScaleRecap = ({
  autoScaleRegion,
  nbInstance,
  instanceType,
  currentPrice,
}) => {
  return (
    <ArticleRestitution>
      <HeaderRestitution title="Autoscale" />
      <SectionRestitution>
        <SectionRestitutionRow title="Proposition d'autoscaling">
          {instanceType && (
            <Alert
              classModifier="info"
              title={`Pour un service plan avec ${nbInstance} ${
                instanceType.title
              } sur les 2 régions (North et West)
              coutant ${
                currentPrice * 2
              } €/mois sans configuration d'autoscale, une configuration
              apporterait d'avantage de scalabilité et de gains (sur les périodes
              de moindre utilisation) avec des exemples comme ci-dessous.`}></Alert>
          )}
          <div className="region-table-container">
            <RegionAutoScaleTable autoScaleRegion={autoScaleRegion} />
          </div>
        </SectionRestitutionRow>
      </SectionRestitution>
    </ArticleRestitution>
  );
};

export default AutoScaleRecap;
