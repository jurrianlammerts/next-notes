import * as React from 'react';

import { Card } from './Card';

const CardList = ({ data }) => (
  <ul className="card-list">
    {data.map((card) => (
      <Card key={card.id} {...card} />
    ))}
  </ul>
);


export default CardList;
