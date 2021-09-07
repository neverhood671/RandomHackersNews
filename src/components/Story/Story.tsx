import React from 'react';
import { unix } from 'dayjs';
import { sanitize } from 'dompurify';
import Author from '../Author/Author';
import { StoryItem } from '../../types/StoryItem';
import { User } from '../../types/User';
import './Story.scss';

type StoryProps = {
  storyData: StoryItem,
  authorData: User | undefined,
  isWaitingForAuthorData: boolean,
};

const Story = (props: StoryProps): JSX.Element => {
  const { storyData, authorData, isWaitingForAuthorData } = props;
  const formattedStoryDate = unix(storyData.time).format('D.MM.YYYY H:mm');
  const authorInfoBlock = () => {
    if (isWaitingForAuthorData) return <div className="story__author-stub" />;
    if (!isWaitingForAuthorData && authorData) {
      return (
        <Author
          username={storyData.by}
          karmaScore={authorData.karma}
        />
      );
    }
    return <Author username={storyData.by} />;
  };

  return (
    <article className="story">
      <header className="story__header">
        <div className="story__score">{storyData.score}</div>
        <div className="story__meta-data">
          {authorInfoBlock()}
          <h2 className="story__title">{storyData.title}</h2>
          <time className="story__date" dateTime={formattedStoryDate}>{formattedStoryDate}</time>
        </div>
      </header>

      <div className="story__body">
        <p className="story__text" dangerouslySetInnerHTML={{ __html: sanitize(storyData.text) }} />
        <div className="story__full-text-link-wrapper">
          <a className="story__full-text-link" href={storyData.url}>Read more</a>
        </div>
      </div>
    </article>
  );
};

export default Story;
