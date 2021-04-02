import React, { useEffect, useState } from 'react';
import { Text, Table, Tabs } from '@axa-fr/react-toolkit-all';
import config from './config.json';

import './Home.scss';
import AutoScaleRecap from './AutoScaleRecap';
import PriceRecap from 'pages/Home/PriceRecap';

const Home = () => {
  const { instances } = JSON.parse(JSON.stringify(config));
  const [currentPrice, setCurrentPrice] = useState(0);
  const [projectionPrice, setProjectionPrice] = useState(0);
  const [nbInstance, setNbInstance] = useState(0);
  const [nbInstanceProjection, setNbInstanceProjection] = useState(0);
  const [instanceType, setInstanceType] = useState({});

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

  const computePrice = quantity => {
    const priceInfos = instances.find(i => i.id === instanceType.id);
    return priceInfos ? priceInfos.price * quantity : 0;
  };

  useEffect(() => {
    setCurrentPrice(computePrice(nbInstance));
    computeAutoScaleRegions(instanceType, nbInstance);
    if (nbInstance === 0) {
      setAutoScaleRegion(defaultRegionsValues);
    }
  }, [nbInstance]);

  useEffect(() => {
    setProjectionPrice(computePrice(nbInstanceProjection));
  }, [nbInstanceProjection]);

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
  const formInputValuesDefaultValue = instances.map(instance => ({
    instance,
    inputs: [
      {
        id: `${instance.id}-instance`,
        name: `${instance.id}_instance`,
        value: 0,
      },
      {
        id: `${instance.id}-projection`,
        name: `${instance.id}_projection`,
        value: 0,
      },
    ],
  }));
  const isInstanceInput = inputId => inputId.endsWith('instance');
  const [formInputs, setFormInputs] = useState(formInputValuesDefaultValue);

  const updateInput = (formPrevStateField, inputId, newValue, inputType) => {
    if (formPrevStateField.id === inputId) {
      return newValue;
    }
    if (formPrevStateField.id.endsWith(inputType)) {
      return 0;
    }
    return formPrevStateField.value;
  };

  const instanceInputChangeHandler = (value, inputId, instance) => {
    const [, inputType] = inputId.split('-');
    const formatedInput = parseInt(value) || 0;
    setFormInputs(inputInstances =>
      inputInstances.map(inputInstance => ({
        ...inputInstance,
        inputs: inputInstance.inputs.map(input => ({
          ...input,
          value: updateInput(input, inputId, value, inputType),
        })),
      }))
    );

    if (isInstanceInput(inputId)) {
      setNbInstance(formatedInput);
    } else {
      setNbInstanceProjection(formatedInput);
    }
    setInstanceType(instance);
  };

  const computeAutoScaleRegions = (instance, inputNbInstance) => {
    const regionCost = dataModel.map(region => {
      const [west, north] = region.regionsValues;

      const westCost =
        inputNbInstance * instance.price * ((168 - west) / 168) +
        instance.price * (west / 168);

      const northCost =
        inputNbInstance * instance.price * ((168 - north) / 168) +
        instance.price * (north / 168);
      const total = westCost + northCost;
      return {
        id: region.id,
        description: region.description
          .replace('XXX', `<b>${instance.title}</b>`)
          .replace('XX', inputNbInstance),
        regionsValues: [
          westCost,
          northCost,
          total,
          2 * inputNbInstance * instance.price - total,
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
                {formInputs.map(({ instance, inputs }) => (
                  <Table.Tr>
                    <Table.Td>
                      <div className="af-table-body-content">{`${instance.title} - ${instance.price} €/mois`}</div>
                      <div className="af-table-body-content">{`${instance.description}`}</div>
                    </Table.Td>

                    {inputs.map(input => (
                      <Table.Td>
                        <Text
                          id={input.id}
                          name={input.id}
                          value={input.value}
                          onChange={({ value }) =>
                            instanceInputChangeHandler(
                              value,
                              input.id,
                              instance
                            )
                          }
                        />
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
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
