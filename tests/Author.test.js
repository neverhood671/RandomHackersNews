import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Author from '../src/components/Author/Author';

describe('Author Component', () => {
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

  it('renders author info', () => {
    const fakeUser = {
      id: 'testUser',
      karma: 123,
    };

    act(() => {
      render(<Author username={fakeUser.id} karmaScore={fakeUser.karma} />, container);
    });

    expect(container.querySelector('.author__name').textContent).toBe(fakeUser.id);
    expect(container.querySelector('.author__karma-value').textContent).toBe(fakeUser.karma.toString());
  });
});
