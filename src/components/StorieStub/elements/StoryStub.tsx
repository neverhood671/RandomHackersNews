import React from 'react';
import './StoryStub.scss';

const StoryStub = (): JSX.Element => (
  <div className="story-stub">
    <div className="story-stub__header">
      <div className="story-stub__elem story-stub__score" />
      <div className="story-stub__elem" />
    </div>

    <div className="story-stub__body">
      <div className="story-stub__elem" />
      <div className="story-stub__elem" />
    </div>
  </div>
);

export default StoryStub;
