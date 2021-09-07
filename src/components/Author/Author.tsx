import React from 'react';
import './Author.scss';
import userImg from './user.png';
import karmaImg from './karma.png';

type AuthorProps = {
  username: string;
  karmaScore?: number;
};

const Author = ({ username, karmaScore }: AuthorProps): JSX.Element => (
  <address className="author">
    <div className="author__img-wrapper">
      <img className="author__img" src={userImg} alt={`Avatar of ${username} - author of the story`} />
    </div>
    <div className="author__name">{username}</div>
    <div className="author__karma">
      <div className="author__karma-icon-wrapper">
        <img className="author__karma-icon" src={karmaImg} alt="" />
      </div>
      <div className="author__karma-value">{karmaScore}</div>
    </div>
  </address>
);

Author.defaultProps = {
  karmaScore: 0,
};

export default Author;
