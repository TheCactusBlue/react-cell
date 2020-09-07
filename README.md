# react-cell

Inspired by [Redwood Cells](https://redwoodjs.com/tutorial/cells), using Apollo Client.

## Getting started

```
yarn add react-cell
```

## Features

- First-class TypeScript support

## Usage

```tsx
import cell from 'react-cell';
import { gql } from '@apollo/client';

interface NovelCellProps {
  title: string;
}

const NovelCell = cell<{ novel: Novel }, NovelCellProps>({
  query: gql`
  query($title: String) {
    novel(title: $title) {
      title
      description
    }
  }`,

  Success({ novel: Novel }) {
    return (
      <div>
        <h1>{novel.title}</h1>
        <h1>{novel.description}</h1>
      </div>
    );
  },

  Loading() {
    return (
      <div>Loading...</div>
    ); 
  },

  Empty() {
    return (
      <div>Found nothing.</div>
    ); 
  },

  Failure({ error }) {
    return (
      <div>Error: {error.message}</div>
    ); 
  }
});

<NovelCell title="Title here">
```