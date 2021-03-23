import React, { useEffect, useState } from 'react';
import { Text, Table, Tabs } from '@axa-fr/react-toolkit-all';
import config from './config.json';

import './Home.scss';
import AutoScaleRecap from './AutoScaleRecap';
import PriceRecap from 'pages/Home/PriceRecap';

const Home = () => {
  const { instances } = JSON.parse(JSON.stringify(config));
  const [i1Instance, i2Instance, i3Instance] = instances;
  const [i1, setI1] = useState(0);
  const [i2, setI2] = useState(0);
  const [i3, setI3] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [projectionPrice, setProjectionPrice] = useState(0);

  const [i4, setI4] = useState(0);
  const [i5, setI5] = useState(0);
  const [i6, setI6] = useState(0);

  // base pour la refacto
  const [nbInstance, setNbInstance] = useState(0);
  const [instanceType, setInstanceType] = useState();

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
    setCurrentPrice(
      v1 * i1Instance.price + v2 * i2Instance.price + v3 * i3Instance.price
    );
  };

  useEffect(() => {
    liveCompute(i1, i2, i3);
    if (i1 + i2 + i3 === 0) {
      setAutoScaleRegion(defaultRegionsValues);
    }
  }, [i1, i2, i3]);

  const liveComputeProjection = (v4, v5, v6) => {
    setProjectionPrice(
      v4 * i1Instance.price + v5 * i2Instance.price + v6 * i3Instance.price
    );
  };

  const dataModel = [
    {
      id: 'Internet',
      description:
        'Le passage à 1 instance XXX tous les jours, de 23h à 6h du matin. Le reste du temps,  nous avons XX instance(s)',
      regionsValues: [49, 168],
    },
    {
      id: 'Internet Entreprise',
      description:
        'Le passage à 1 instance XXX du lundi au samedi de 20h à 7h du matin ,  et une instance le dimanche. Le reste du temps,  nous avons XX instance(s)',
      regionsValues: [90, 168],
    },
    {
      id: 'Distributeur',
      description:
        'Le passage à 1 instance XXX du lundi au samedi de 20h à 7h du matin ,  et une instance le dimanche. Le reste du temps,  nous avons XX instance(s)',
      regionsValues: [90, 168],
    },
    {
      id: 'Administratif',
      description:
        'Le passage à 1 instance XXX du lundi au vendredi, de 19h30 à 7h30 du matin et une instance les samedi et dimanche. Le reste du temps,  nous avons XX instance(s)',
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
        description: region.description
          .replace('XXX', `<b>${instance.title}</b>`)
          .replace('XX', nbInstance),
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
    <Tabs>
      <Tabs.Tab title="AZURE" classModifier="has-icon-right">
        <div>
          <div className="finops-container">
            <Table className="">
              <Table.Header>
                <Table.Tr>
                  <Table.Th>
                    <span className="af-table-th-content"></span>
                  </Table.Th>
                  <Table.Th>
                    <span className="af-table-th-content">
                      Service plan actuel sur une region
                    </span>
                  </Table.Th>
                  <Table.Th>
                    <span className="af-table-th-content">
                      Projection sur une region
                    </span>
                  </Table.Th>
                </Table.Tr>
              </Table.Header>
              <Table.Body>
                <Table.Tr>
                  <Table.Td>
                    <div className="af-table-body-content">{`${i1Instance.title} - ${i1Instance.price} €/mois`}</div>
                    <div className="af-table-body-content">{`${i1Instance.description}`}</div>
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
                        computeAutoScaleRegions(i1Instance, current);
                        setNbInstance(current);
                        setInstanceType(i1Instance);
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
                    <div className="af-table-body-content">{`${i2Instance.title} - ${i2Instance.price} €/mois`}</div>
                    <div className="af-table-body-content">{`${i2Instance.description}`}</div>
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
                        computeAutoScaleRegions(i2Instance, current);
                        setNbInstance(current);
                        setInstanceType(i2Instance);
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
                    <div className="af-table-body-content">{`${i3Instance.title} - ${i3Instance.price} €/mois`}</div>
                    <div className="af-table-body-content">{`${i3Instance.description}`}</div>
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
                        computeAutoScaleRegions(i3Instance, current);
                        setNbInstance(current);
                        setInstanceType(i3Instance);
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
          <PriceRecap
            currentPrice={currentPrice}
            projectionPrice={projectionPrice}
          />
          <div className="recap-container">
            <AutoScaleRecap
              autoScaleRegion={autoScaleRegion}
              nbInstance={nbInstance}
              instanceType={instanceType}
              currentPrice={currentPrice}
            />
          </div>
        </div>
      </Tabs.Tab>
      <Tabs.Tab title="PIAAS" classModifier="has-icon-right">
        à venir...
      </Tabs.Tab>
    </Tabs>
  );
};

export default Home;
