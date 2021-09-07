import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import StoriesList from '../src/components/StoriesList/StoriesList';

describe('StoriesList Component', () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders 10 stories', async () => {
    const fakeStoriesIds = [100, 111, 222, 333, 444, 555, 666, 777, 888, 999];
    let i = -1;

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeStoriesIds),
    })).mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: fakeStoriesIds[i++],
        by: 'TestUser',
        title: 'Test Story Title',
        url: 'https://google.com/',
        score: 999,
        time: 1630423663,
      }),
    }));

    await act(async () => {
      render(<StoriesList />, container);
    });

    expect(container.querySelectorAll('.story').length).toBe(10);

    global.fetch.mockRestore();
  });
});
