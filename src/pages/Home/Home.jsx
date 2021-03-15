import React, { useEffect, useState } from 'react';
import { Text, Table, Restitution } from '@axa-fr/react-toolkit-all';
import config from './config.json';


import './Home.css';

const Home = () => {
  const {instances} = JSON.parse(JSON.stringify(config));
  const [i1Price, i2Price, i3Price] = instances;
  const [i1, setI1] = useState(0);
  const [i2, setI2] = useState(0);
  const [i3, setI3] = useState(0);
  const [result, setResult] = useState(0);
  const [resultProjection, setResultProjection] = useState(0);

  const [i4, setI4] = useState(0);
  const [i5, setI5] = useState(0);
  const [i6, setI6] = useState(0);

  const [resulAutoScale, setResulAutoScale] = useState(0)

  const liveCompute = (v1, v2, v3) => {
    setResult(v1 * i1Price.price + v2 * i2Price.price + v3 * i3Price.price) 
  }
  
 useEffect(() => {
   liveCompute(i1, i2, i3);
 });

  const liveComputeProjection = (v4, v5, v6) => {
    setResultProjection(v4 * i1Price.price + v5 * i2Price.price + v6 * i3Price.price) 
  }
  const winLabel = () => {
    if(resultProjection === 0 || result - resultProjection  === 0) {
      return ""
    }
    return result - resultProjection > 0 ? `Gain ${result - resultProjection} €` : `Perte ${resultProjection -result} €`
  }
  const autoScale = (instance, nbInstance) => {
    setResulAutoScale(nbInstance * instance.price * (6/7) + instance.price* (1/7))
  }
  

  return (
    <div>
    <div className="finops-container">
      <Table
        className="">
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
                  const current  = parseInt(value) || 0
                  setI1(current)
                  setI2(0)
                  setI3(0)
                  liveCompute(current, i2, i3)
                  autoScale(i1Price, current)
                }}
              />
          </Table.Td>
          <Table.Td>
            <span className="af-table-body-content"> <Text
                id="adultnumber"
                name="I1"
                value={i4}
                onChange={({ value }) => {
                  const current  = parseInt(value) || 0
                  setI4(current)
                  setI5(0)
                  setI6(0)
                  liveComputeProjection(current, i5, i6)
                }}
              /></span>
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
                  const current  = parseInt(value) || 0
                  setI2(current)
                  setI1(0)
                  setI3(0)
                  liveCompute(i1, current, i3)
                  autoScale(i2Price, current)
                }}
              />
          </Table.Td>
          <Table.Td>
          <Text
                id="adultnumber"
                name="I1"
                value={i5}
                onChange={({ value }) => {
                  const current  = parseInt(value) || 0
                  setI5(current)
                  setI4(0)
                  setI6(0)
                  liveComputeProjection(i4, current, i6)
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
                  const current  = parseInt(value) || 0
                  setI3(current)
                  setI2(0)
                  setI1(0)
                  liveCompute(i1, i2, current)
                  autoScale(i3Price, current)
                }}
              />
          </Table.Td>
          <Table.Td>
          <Text
                   id="adultnumber"
                   name="I1"
                   value={i6}
                   onChange={({ value }) => {
                     const current  = parseInt(value) || 0
                     setI6(current)
                     setI5(0)
                     setI4(0)
                     liveComputeProjection(i4, i5, current)
                   }}
                 />
          </Table.Td>
        </Table.Tr>
        {/* footer */}
        <Table.Tr>
          <Table.Td>
            <div className="af-table-body-content">Prix</div>
          </Table.Td>
          <Table.Td>
          <span className="af-table-body-content">{`${result} euros par mois`} </span>
          </Table.Td>
          <Table.Td>
          <div className="af-table-body-content">{`${resultProjection} euros par mois`}</div>
          <div>{winLabel()} </div>
          </Table.Td>
        </Table.Tr>
      </Table.Body>
      
    </Table>
  </div>

  <div>
    <h1 className="af-title--content">Auto scale</h1>
        <div className="tax-result">
    
          <Restitution label="Gain auto scale" value={`${Math.round((result - resulAutoScale)*100)/100}`} />
          <Restitution label="Auto scale" value={Math.round(resulAutoScale*100)/100} />
      </div>
   </div>
   
  </div>
  );
};

export default Home;
