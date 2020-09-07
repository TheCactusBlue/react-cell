// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...

import React from 'react';

interface CellDefinition<R, T, E> {
  query: (props: T) => Promise<R>;

  empty?: React.FC;
  loading?: React.FC;
  failure?: React.FC<T & { error: E }>;
  success: React.FC<T & R>;
}

enum CellState {
  Loading,
  Success,
  Failure,
}

export default function createCell<R, T = {}, E = unknown>(cell: CellDefinition<R, T, E>): React.FC<T> {
  const Empty = cell.empty || (() => null);
  const Loading = cell.loading || (() => null);
  const Failure = cell.failure || (() => null);

  return (props: T) => {
    const [result, setResult] = React.useState<R|null>(null);
    const [failure, setFailure] = React.useState<E|null>(null);
    const [cellState, setCellState] = React.useState(CellState.Loading);

    React.useEffect(() => {
      async function fn() {
        try {
          setResult(await cell.query(props));
          setCellState(CellState.Success)
        } catch(e) {
          if (cell.failure == undefined) {
            console.error(e);
          }
          setFailure(e as any)
          setCellState(CellState.Failure)
        }
      }

      fn();
    }, [props]);

    if (result == null && (cellState != CellState.Loading)) {
      return <Empty />
    }

    switch(cellState) {
      case CellState.Loading:
        return <Loading />;
      case CellState.Success:
        return <cell.success {...Object.assign(props, result!)} />;
      case CellState.Failure:
        return <Failure {...Object.assign(props, { error: failure! })} />
    }
  };
}
