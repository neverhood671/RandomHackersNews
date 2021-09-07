import fetchJSON from '../utils/fetchJSON';
import { StoryItem } from '../types/StoryItem';
import { User } from '../types/User';

const API_URL = 'https://hacker-news.firebaseio.com/v0';

const contentLoader = {

  getTopStories: async (): Promise<Array<number>> => fetchJSON(`${API_URL}/topstories.json`)
    .then((stories) => stories as Array<number>),

  getStory: async (id: number): Promise<StoryItem> => fetchJSON(`${API_URL}/item/${id}.json`)
    .then((story) => story as StoryItem),

  getUser: async (id: string): Promise<User> => fetchJSON(`${API_URL}/user/${id}.json`)
    .then((user) => user as User),
};

export default contentLoader;
