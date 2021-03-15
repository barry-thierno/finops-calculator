import React, { useEffect, useState } from 'react';
import { Text, Button } from '@axa-fr/react-toolkit-all';
import config from './config.json';


import './Home.css';

const Home = () => {
  const {instances} = JSON.parse(JSON.stringify(config));
  const [i1Price, i2Price, i3Price] = instances;
  const [i1, setI1] = useState(0);
  const [i2, setI2] = useState(0);
  const [i3, setI3] = useState(2);
  const [result, setResult] = useState(0);
  const [resultProjection, setResultProjection] = useState(0);

  const [i4, setI4] = useState(0);
  const [i5, setI5] = useState(0);
  const [i6, setI6] = useState(0);

  // const computePriceHandler = () => {
  //   setResult(i1 * i1Price.price + i2 * i2Price.price + i3 * i3Price.price) 
  // };
  const liveCompute = (v1, v2, v3) => {
    setResult(v1 * i1Price.price + v2 * i2Price.price + v3 * i3Price.price) 
  }
  
 useEffect(() => {
   liveCompute(i1, i2, i3);
 });

  const liveComputeProjection = (v4, v5, v6) => {
    setResultProjection(v4 * i1Price.price + v5 * i2Price.price + v6 * i3Price.price) 
  }

  return (
    <>
      <div className="">
      <dl className="input-line">
      <dt></dt>
            <dd >
              Service plan actuel
            </dd>
        </dl>
        <dl className="input-line">
            <dt>I1</dt>
            <dd >
              <Text
                id="adultnumber"
                name="I1"
                value={i1}
                onChange={({ value }) => {
                  const current  = parseInt(value) || 0
                  setI1(current)
                  liveCompute(current, i2, i3)
                }}
              />
              {/* {i1Price.price} euros / mois */}
            </dd>
            <dd>
              <Text
                id="adultnumber"
                name="I1"
                value={i4}
                onChange={({ value }) => {
                  const current  = parseInt(value) || 0
                  setI4(current)
                  liveComputeProjection(current, i5, i6)
                }}
              />
              {i1Price.price} euros / mois
            </dd>
            
          </dl>
          <dl className="input-line">
            <dt>I2</dt>
            <dd >
              <Text
                id="adultnumber"
                name="I1"
                value={i2}
                onChange={({ value }) => {
                  const current  = parseInt(value) || 0
                  setI2(current)
                  liveCompute(i1, current, i3)
                }}
              />
               {/* {i2Price.price} euros / mois */}
            </dd>
            <dd>
              <Text
                id="adultnumber"
                name="I1"
                value={i5}
                onChange={({ value }) => {
                  const current  = parseInt(value) || 0
                  setI5(current)
                  liveComputeProjection(i4, current, i6)
                }}
              />
              {i1Price.price} euros / mois
            </dd>
          </dl>
          <dl className="input-line">
            <dt>I3</dt>
            <dd >
              <Text
                id="adultnumber"
                name="I1"
                value={i3}
                onChange={({ value }) => {
                  const current  = parseInt(value) || 0
                  setI3(current)
                  liveCompute(i1, i2, current)
                }}
              />
               {/* {i3Price.price} euros / mois */}
        
            </dd>
            <dd>
                 
                 <Text
                   id="adultnumber"
                   name="I1"
                   value={i6}
                   onChange={({ value }) => {
                     const current  = parseInt(value) || 0
                     setI6(current)
                     liveComputeProjection(i4, i5, current)
                   }}
                 />
                 {i1Price.price} euros / mois
               </dd>
          </dl>
      </div>
      {/* <div>
      <Button onClick={computePriceHandler}>Valider</Button>
      </div> */}

      <div>{result} euros par mois</div>
      <div>{resultProjection} euros par mois</div>

    </>
  );
};

export default Home;
