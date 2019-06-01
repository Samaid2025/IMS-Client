import React from 'react';

function TableHead(props) {
  return (
    <React.Fragment>
      <tr>
        {props.headings.map((item, key) => (
          <th key={key}>{item}</th>
        ))}{' '}
        <th>Actions</th>
      </tr>
    </React.Fragment>
  );
}

export default TableHead;
