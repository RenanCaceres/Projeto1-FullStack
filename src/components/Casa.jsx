import { memo } from 'react';

// memo: só re-renderiza se os dados da casa mudarem
function Casa({ data }) {
  return (
    <p>
      <strong>{data.name}</strong> - Fundador: {data.founder}
    </p>
  );
}

export default memo(Casa);
