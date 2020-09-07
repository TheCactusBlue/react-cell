# react-cell

Inspired by [Redwood Cells](https://redwoodjs.com/tutorial/cells).

## Getting started

```
yarn add react-cell
```

## Features

- First-class TypeScript support

## Usage

```tsx
import cell from 'react-cell';

const NovelCell = cell({
  async query({ title: string }) {
    return { novel: await getNovelByTitle(title) };
  },

  success({ novel: Novel }) {
    return (
      <div>
        <h1>{novel.title}</h1>
        <h1>{novel.description}</h1>
      </div>
    );
  },

  loading() {
    return (
      <div>Loading...</div>
    ); 
  },

  empty() {
    return (
      <div>Found nothing...</div>
    ); 
  },

  failure({ error: string }) {
    return (
      <div>Error: {error}</div>
    ); 
  }
});

<NovelCell title="Title here">
```