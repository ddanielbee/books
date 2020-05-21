interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface RandomUser {
  name: RandomUserName;
  picture: RandomUserPicture;
}

interface RandomUserResponse {
  results: ReadonlyArray<RandomUser>;
}

const randomUserApiUrl = 'https://randomuser.me/api?results=10';

const isRandomUserName = (obj: any): obj is RandomUserName =>
  typeof obj === 'object' &&
  typeof obj.title === 'string' &&
  typeof obj.first === 'string' &&
  typeof obj.last === 'string';

const isRandomUserPicture = (obj: any): obj is RandomUserPicture =>
  typeof obj === 'object' &&
  typeof obj.large === 'string' &&
  typeof obj.medium === 'string' &&
  typeof obj.thumbnail === 'string';

const isRandomUser = (obj: any): obj is RandomUser =>
  typeof obj === 'object' && isRandomUserName(obj.name) && isRandomUserPicture(obj.picture);

const isRandomUserResponse = (obj: any): obj is RandomUserResponse =>
  typeof obj === 'object' && Array.isArray(obj.results) && obj.results.every(isRandomUser);

const fetchUsers = async (): Promise<ReadonlyArray<RandomUser>> => {
  const fetchResult = await fetch(randomUserApiUrl);
  if (fetchResult.ok) {
    const resultData = await fetchResult.json();
    if (isRandomUserResponse(resultData)) {
      return resultData.results;
    } else {
      throw new Error(`Could not decode Random User Api response: ${JSON.stringify(resultData)}`);
    }
  } else {
    throw new Error(`Random User Api request failed with status text ${fetchResult.statusText}`);
  }
};

const mapUserToListItem = (user: RandomUser): HTMLLIElement => {
  const userListItem = document.createElement('li');
  const userPicture = document.createElement('img');
  const userName = document.createElement('h3');
  userPicture.setAttribute('src', user.picture.medium);
  userName.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
  userListItem.appendChild(userPicture);
  userListItem.appendChild(userName);
  return userListItem;
};

const requestAndInjectUsers = async (id: string) => {
  const container = document.getElementById(id);

  if (container) {
    const randomUsers = await fetchUsers();
    const domUsers = randomUsers.map(mapUserToListItem);
    container.append(...domUsers);
  }
};

requestAndInjectUsers('user-list');
