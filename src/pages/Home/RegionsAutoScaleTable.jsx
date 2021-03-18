import React from 'react';
import Help from '@axa-fr/react-toolkit-help';
import { Table } from '@axa-fr/react-toolkit-all';
import { formatCurrency } from 'shared/helpers';
const RegionAutoScaleTable = ({ autoScaleRegion }) => {
  return (
    <Table className="">
      <Table.Header>
        <Table.Tr>
          <Table.Th>
            <span className="af-table-th-content">Autoscale</span>
          </Table.Th>
          <Table.Th>
            <span className="af-table-th-content">West</span>
          </Table.Th>
          <Table.Th>
            <span className="af-table-th-content">North</span>
          </Table.Th>
          <Table.Th>
            <span className="af-table-th-content">Total</span>
          </Table.Th>
          <Table.Th>
            <span className="af-table-th-content">Gain</span>
          </Table.Th>
        </Table.Tr>
      </Table.Header>
      <Table.Body>
        {autoScaleRegion.map(region => (
          <Table.Tr>
            <Table.Td classModifier="desc">
              <span> {region.id}</span>
              <Help>{region.description}</Help>
            </Table.Td>
            {region.regionsValues.map(value => (
              <Table.Td>
                <span className="af-table-body-content">{`${formatCurrency(
                  value
                )}/mois`}</span>
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Body>
    </Table>
  );
};

export default RegionAutoScaleTable;
