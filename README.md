# react-cell

[![npm](https://img.shields.io/npm/v/react-cell.svg?color=brightgreen)](https://www.npmjs.com/package/react-cell)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/react-cell.svg?style=flat&label=size)](https://bundlephobia.com/result?p=react-cell)
![Misaka](https://img.shields.io/badge/Best%20Girl-⚡Misaka%20Mikoto-%23ff8000)

🔋 Declarative React Components that fetch GraphQL. Inspired by [Redwood Cells](https://redwoodjs.com/tutorial/cells), using Apollo Client.

## Getting started

```
yarn add react-cell
```

## Features

- 🍱 Structured declaration for components
- 📘 First-class TypeScript support
- 🚀 Apollo-based GraphQL queries
- ⚡ Only peer dependencies

## Usage

```tsx
import cell from 'react-cell';
import { gql } from '@apollo/client';

interface NovelCellProps {
  title: string;
}

const QUERY = gql`
query($title: String) {
  novel(title: $title) {
    title
    description
  }
}`;

// props are passed onto the query as variables
const NovelCell = cell<{ novel: Novel }, NovelCellProps>(QUERY, {
  Success({ novel }) {
    return (
      <div>
        <h1>{novel.title}</h1>
        <h1>{novel.description}</h1>
      </div>
    );
  },

  // While your query is executing.
  Loading: () =>
    <div>Loading...</div>,

  // Renders if your query results in null or an empty array.
  Empty: () =>
    <div>Found nothing.</div>,

  // This renders if your query results in an error.
  Failure: ({ error }) =>
    <div>Error: {error.message}</div>
});

<NovelCell title="Title here">
```