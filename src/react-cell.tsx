import React from 'react';
import { DocumentNode } from 'graphql';
import { useQuery, ApolloError, QueryResult } from '@apollo/client';

interface CellDefinition<T, P> {
  Empty?: React.FC<P & QueryRest<T>>;
  Loading?: React.FC<P & QueryRest<T>>;
  Failure?: React.FC<P & QueryRest<T> & { error: ApolloError }>;
  Success: React.FC<P & T & QueryRest<T>>;
}

function isEmpty<T>(data: T) {
  const field = (data as any)[Object.keys(data as any)[0]];
  return (field == null) || (Array.isArray(field) && field.length == 0);
}

type QueryRest<T> = Omit<QueryResult<T>, 'error'|'loading'|'data'>;

export default function createCell<T, P = {}>(query: DocumentNode, {
  Success,
  Empty = () => null,
  Loading = () => null,
  Failure = ({ error }) => {
    console.error(error);
    return null;
  }
}: CellDefinition<T, P>): React.FC<P> {
  return (props: P) => {

    const { error, loading, data, ...rest } = useQuery<T>(query, {
      variables: props
    });

    if (error) {
      return <Failure error={error} {...props} {...rest} />;
    }

    if (loading) {
      return <Loading {...props} {...rest} />;
    }

    if (data == undefined || isEmpty(data)) {
      return <Empty {...props} {...rest} />;
    }

    return <Success {...data} {...props} {...rest} />
  };
}
