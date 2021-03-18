import React, { useEffect, useState } from 'react';
import { Text, Table } from '@axa-fr/react-toolkit-all';
import config from './config.json';

import './Home.scss';
import AutoScaleRecap from './AutoScaleRecap';

const Home = () => {
  const { instances } = JSON.parse(JSON.stringify(config));
  const [i1Price, i2Price, i3Price] = instances;
  const [i1, setI1] = useState(0);
  const [i2, setI2] = useState(0);
  const [i3, setI3] = useState(0);
  const [result, setResult] = useState(0);
  const [resultProjection, setResultProjection] = useState(0);

  const [i4, setI4] = useState(0);
  const [i5, setI5] = useState(0);
  const [i6, setI6] = useState(0);

  const [resulAutoScale, setResulAutoScale] = useState(0);

  const [resulAutoScaleSemaine, setResulAutoScaleSemaine] = useState(0);

  const defaultRegionsValues = [
    {
      id: 'Internet',
      description:
        'Le passage à 1 instance tous les jours, de 23h à 6h du matin',
      regionsValues: [0, 0, 0, 0],
    },
    {
      id: 'Internet Entreprise',
      description:
        'Le passage à 1 instance du lundi au samedi de 20h à 7h du matin ,  et une instance le dimanche',
      regionsValues: [0, 0, 0, 0],
    },
    {
      id: 'Distributeur',
      description:
        'Le passage à 1 instance du lundi au samedi de 20h à 7h du matin ,  et une instance le dimanche',
      regionsValues: [0, 0, 0, 0],
    },
    {
      id: 'Administratif',
      description:
        'Le passage à 1 instance du lundi au vendredi, de 19h30 à 7h30 du matin et une instance les samedi et dimanche',
      regionsValues: [0, 0, 0, 0],
    },
  ];
  const [autoScaleRegion, setAutoScaleRegion] = useState(defaultRegionsValues);

  const liveCompute = (v1, v2, v3) => {
    setResult(v1 * i1Price.price + v2 * i2Price.price + v3 * i3Price.price);
  };

  useEffect(() => {
    liveCompute(i1, i2, i3);
    if (i1 + i2 + i3 === 0) {
      setAutoScaleRegion(defaultRegionsValues);
    }
  }, [i1, i2, i3]);

  const liveComputeProjection = (v4, v5, v6) => {
    setResultProjection(
      v4 * i1Price.price + v5 * i2Price.price + v6 * i3Price.price
    );
  };

  const autoScale = (instance, nbInstance) => {
    setResulAutoScale(
      nbInstance * instance.price * (6 / 7) + instance.price * (1 / 7)
    );
  };

  const computeAutoScaleSemaine = (instance, nbInstance, tempsAutoScale) => {
    setResulAutoScaleSemaine(
      nbInstance * instance.price * ((168 - tempsAutoScale) / 168) +
        instance.price * (tempsAutoScale / 168)
    );
  };

  const dataModel = [
    {
      id: 'Internet',
      description:
        'Le passage à 1 instance tous les jours, de 23h à 6h du matin',
      regionsValues: [49, 168],
    },
    {
      id: 'Internet Entreprise',
      description:
        'Le passage à 1 instance du lundi au samedi de 20h à 7h du matin ,  et une instance le dimanche',
      regionsValues: [90, 168],
    },
    {
      id: 'Distributeur',
      description:
        'Le passage à 1 instance du lundi au samedi de 20h à 7h du matin ,  et une instance le dimanche',
      regionsValues: [90, 168],
    },
    {
      id: 'Administratif',
      description:
        'Le passage à 1 instance du lundi au vendredi, de 19h30 à 7h30 du matin et une instance les samedi et dimanche',
      regionsValues: [108, 168],
    },
  ];

  const computeAutoScaleRegions = (instance, nbInstance) => {
    const regionCost = dataModel.map(region => {
      const [west, north] = region.regionsValues;

      const westCost =
        nbInstance * instance.price * ((168 - west) / 168) +
        instance.price * (west / 168);

      const northCost =
        nbInstance * instance.price * ((168 - north) / 168) +
        instance.price * (north / 168);
      const total = westCost + northCost;
      return {
        id: region.id,
        description: region.description,
        regionsValues: [
          westCost,
          northCost,
          total,
          2 * nbInstance * instance.price - total,
        ],
      };
    });
    setAutoScaleRegion(regionCost);
  };

  return (
    <div>
      {/* <h1 className="af-title--content">Saisie des instances</h1> */}
      <div className="finops-container">
        <Table className="">
          <Table.Header>
            <Table.Tr>
              <Table.Th>
                <span className="af-table-th-content"></span>
              </Table.Th>
              <Table.Th>
                <span className="af-table-th-content">Service plan actuel</span>
              </Table.Th>
              <Table.Th>
                <span className="af-table-th-content">Projection</span>
              </Table.Th>
            </Table.Tr>
          </Table.Header>
          <Table.Body>
            <Table.Tr>
              <Table.Td>
                <div className="af-table-body-content">{`${i1Price.title} - ${i1Price.price} €/mois`}</div>
                <div className="af-table-body-content">{`${i1Price.description}`}</div>
              </Table.Td>
              <Table.Td>
                <Text
                  id="adultnumber"
                  name="I1"
                  value={i1}
                  onChange={({ value }) => {
                    const current = parseInt(value) || 0;
                    setI1(current);
                    setI2(0);
                    setI3(0);
                    liveCompute(current, i2, i3);
                    autoScale(i1Price, current);
                    computeAutoScaleSemaine(i1Price, current, 50);
                    computeAutoScaleRegions(i1Price, current);
                  }}
                />
              </Table.Td>
              <Table.Td>
                <span className="af-table-body-content">
                  {' '}
                  <Text
                    id="adultnumber"
                    name="I1"
                    value={i4}
                    onChange={({ value }) => {
                      const current = parseInt(value) || 0;
                      setI4(current);
                      setI5(0);
                      setI6(0);
                      liveComputeProjection(current, i5, i6);
                    }}
                  />
                </span>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <div className="af-table-body-content">{`${i2Price.title} - ${i2Price.price} €/mois`}</div>
                <div className="af-table-body-content">{`${i2Price.description}`}</div>
              </Table.Td>
              <Table.Td>
                <Text
                  id="adultnumber"
                  name="I1"
                  value={i2}
                  onChange={({ value }) => {
                    const current = parseInt(value) || 0;
                    setI2(current);
                    setI1(0);
                    setI3(0);
                    liveCompute(i1, current, i3);
                    autoScale(i2Price, current);
                    computeAutoScaleSemaine(i2Price, current, 50);
                    computeAutoScaleRegions(i2Price, current);
                  }}
                />
              </Table.Td>
              <Table.Td>
                <Text
                  id="adultnumber"
                  name="I1"
                  value={i5}
                  onChange={({ value }) => {
                    const current = parseInt(value) || 0;
                    setI5(current);
                    setI4(0);
                    setI6(0);
                    liveComputeProjection(i4, current, i6);
                  }}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <div className="af-table-body-content">{`${i3Price.title} - ${i3Price.price} €/mois`}</div>
                <div className="af-table-body-content">{`${i3Price.description}`}</div>
              </Table.Td>
              <Table.Td>
                <Text
                  id="adultnumber"
                  name="I1"
                  value={i3}
                  onChange={({ value }) => {
                    const current = parseInt(value) || 0;
                    setI3(current);
                    setI2(0);
                    setI1(0);
                    liveCompute(i1, i2, current);
                    autoScale(i3Price, current);
                    computeAutoScaleSemaine(i3Price, current, 50);
                    computeAutoScaleRegions(i3Price, current);
                  }}
                />
              </Table.Td>
              <Table.Td>
                <Text
                  id="adultnumber"
                  name="I1"
                  value={i6}
                  onChange={({ value }) => {
                    const current = parseInt(value) || 0;
                    setI6(current);
                    setI5(0);
                    setI4(0);
                    liveComputeProjection(i4, i5, current);
                  }}
                />
              </Table.Td>
            </Table.Tr>
          </Table.Body>
        </Table>
      </div>

      <h1 className="af-title--content">Récapitulatif des coûts</h1>

      <div className="recap-container">
        <AutoScaleRecap
          currentPrice={result}
          projectionPrice={resultProjection}
          autoScaleCostForWeek={resulAutoScaleSemaine}
          autoScaleCostForWeekend={resulAutoScale}
          autoScaleRegion={autoScaleRegion}
        />
      </div>
    </div>
  );
};

export default Home;
