import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { unix } from 'dayjs';
import Story from '../src/components/Story/Story';

describe('Story Component', () => {
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

  it('renders story info', () => {
    const fakeStory = {
      storyData: {
        by: 'TestUser',
        title: 'Test Story Title',
        url: 'https://google.com/',
        score: 999,
        time: 1630423663,
      },
      authorData: {
        id: 'TestUser',
        karma: 123,
      },
      isAuthorsRequestInProgress: false,
    };

    act(() => {
      render(
        <Story
          storyData={fakeStory.storyData}
          authorData={fakeStory.authorData}
          isWaitingForAuthorData={fakeStory.isAuthorsRequestInProgress}
        />, container,
      );
    });

    expect(container.querySelector('.author')).toBeDefined();
    expect(container.querySelector('.story__score').textContent).toBe(fakeStory.storyData.score.toString());
    expect(container.querySelector('.story__title').textContent).toBe(fakeStory.storyData.title);
    expect(container.querySelector('.story__full-text-link').href).toBe(fakeStory.storyData.url);
    expect(container.querySelector('.story__date').textContent).toBe(
      unix(fakeStory.storyData.time).format('D.MM.YYYY H:mm'),
    );
  });

  it("checks that there is a stub if author's data still loading", () => {
    const fakeStory = {
      storyData: {
        by: 'TestUser',
        title: 'Test Story Title',
        url: 'https://google.com/',
        score: 999,
        time: 1630423663,
      },
      isAuthorsRequestInProgress: true,
    };

    act(() => {
      render(
        <Story
          storyData={fakeStory.storyData}
          authorData={fakeStory.authorData}
          isWaitingForAuthorData={fakeStory.isAuthorsRequestInProgress}
        />, container,
      );
    });

    expect(container.querySelector('.story__author-stub')).toBeDefined();
  });

  it("there is only author name and no karma info if author's data missed", () => {
    const fakeStory = {
      storyData: {
        by: 'TestUser',
        title: 'Test Story Title',
        url: 'https://google.com/',
        score: 999,
        time: 1630423663,
      },
      isAuthorsRequestInProgress: false,
    };

    act(() => {
      render(
        <Story
          storyData={fakeStory.storyData}
          authorData={fakeStory.authorData}
          isWaitingForAuthorData={fakeStory.isAuthorsRequestInProgress}
        />, container,
      );
    });

    expect(container.querySelector('.story__author-stub')).toBeNull();
    expect(container.querySelector('.author__name').textContent).toBe(fakeStory.storyData.by);
    expect(container.querySelector('.author__karma')).toBeNull();
  });
});
