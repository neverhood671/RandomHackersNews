import React, { useEffect, useState } from 'react';
import contentLoader from '../../api/contentLoader';
import StoriesStub from '../StorieStub/StoriesStub';
import { StoryItem } from '../../types/StoryItem';
import Story from '../Story/Story';
import { User } from '../../types/User';

import './StoriesList.scss';

const StoriesList = (): JSX.Element => {
  const [isStoriesRequestInProgress, setIsStoriesRequestInProgress] = useState<boolean>(false);
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [storiesIds, setStoriesIds] = useState<number[]>([]);
  const [storiesRequestStatus, setStoriesRequestStatus] = useState<string>('');
  const [isAuthorsRequestInProgress, setIsAuthorsRequestInProgress] = useState<boolean>(false);
  const [authors, setAuthors] = useState<User[]>([]);

  const STORY_REQUEST_IN_PROGRESS = 'Getting stories...';
  const NO_STORIES_FOUND = 'No stories found';

  const DISPLAYED_NEWS_NUMBER = 10;

  const loadNewStories = () => {
    setIsStoriesRequestInProgress(true);
    setStoriesRequestStatus(STORY_REQUEST_IN_PROGRESS);

    contentLoader.getTopStories()
      .then((ids) => {
        if (ids.length === 0) {
          setStoriesRequestStatus(NO_STORIES_FOUND);
          setIsStoriesRequestInProgress(false);
          return;
        }

        const randomStoriesIds = Array(DISPLAYED_NEWS_NUMBER)
          .fill(null)
          .map(() => {
            const randomStoryIndex = Math.floor(Math.random() * (ids.length - 1));
            return ids[randomStoryIndex];
          });

        setStoriesIds(randomStoriesIds);
      })
      .catch((e: Error) => {
        setIsStoriesRequestInProgress(false);
        setStoriesRequestStatus(e.message);
      });
  };

  useEffect(() => loadNewStories(), []);

  const storiesIdsStr = JSON.stringify(storiesIds);
  useEffect(() => {
    if (storiesIds.length === 0) return;

    const randomStoriesRequests = storiesIds.map((id) => contentLoader.getStory(id));

    Promise.allSettled(randomStoriesRequests)
      .then((results) => {
        const storiesInfo = results
          .filter((res) => res.status === 'fulfilled')
          .map((res) => (res as unknown as PromiseFulfilledResult<StoryItem>).value);
        setStories(storiesInfo);
        setIsStoriesRequestInProgress(false);
      })
      .catch(() => {
        setIsStoriesRequestInProgress(false);
        setStories([]);
      });
  }, [storiesIdsStr, storiesIds]);

  useEffect(() => {
    if (isStoriesRequestInProgress || stories.length === 0) return;
    setIsAuthorsRequestInProgress(true);

    const authorsRequests = stories.map((story) => contentLoader.getUser(story.by));
    Promise.allSettled(authorsRequests)
      .then((results) => {
        const authorsInfo = results
          .filter((res) => res.status === 'fulfilled')
          .map((res) => (res as unknown as PromiseFulfilledResult<User>).value);

        setAuthors(authorsInfo);
        setIsAuthorsRequestInProgress(false);
      })
      .catch(() => {
        setIsAuthorsRequestInProgress(false);
        setAuthors([]);
      });
  }, [isStoriesRequestInProgress, stories]);

  if (isStoriesRequestInProgress) return <StoriesStub />;

  return (
    <section className="stories-list">
      {Array.isArray(stories) && stories.length > 0
        ? stories
          .sort((s1, s2) => s1.score - s2.score)
          .map((story) => (
            <Story
              key={story.id}
              storyData={story}
              authorData={authors.find((author) => author.id === story.by)}
              isWaitingForAuthorData={isAuthorsRequestInProgress}
            />
          ))
        : <div>{storiesRequestStatus}</div>}
      <div className="stories-list__get-other-news-wrapper">
        <button onClick={loadNewStories} className="stories-list__get-other-news" type="button">
          Get Other News
        </button>
      </div>
    </section>
  );
};

export default StoriesList;
