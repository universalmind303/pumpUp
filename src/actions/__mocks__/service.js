const photoResponse = {
  status: 200,
  data  : {
    result: {
      posts: [{
        createdAt: 'sometimestring',
        thumbnail: 'fakeurl',
        className: 'Post',
        objectId : 2,
        __type   : 'Object'
      },
      {
        createdAt: 'sometimestring',
        thumbnail: 'fakeurl',
        className: 'Post',
        objectId : 5,
        __type   : 'Object'
      },
      {
        createdAt: 'sometimestring',
        thumbnail: 'fakeurl',
        className: 'Post',
        objectId : 4,
        __type   : 'Object'
      },
      {
        createdAt: 'sometimestring',
        thumbnail: 'fakeurl',
        className: 'Post',
        objectId : 3,
        __type   : 'Object'
      },
      {
        createdAt: 'sometimestring',
        thumbnail: 'fakeurl',
        className: 'Post',
        objectId : 2,
        __type   : 'Object'
      }]
    }
  }
}

export async function getUserProfile() {
  const payload = {
    status: 200,
    data  : {
      bio             : 'bio',
      birthday        : {
        __type: 'Date',
        iso   : '1992-02-17T00:00:00.000Z'
      },
      followerCount   : 1,
      followingCount  : 1,
      gender          : 2,
      lastActiveDate  : {
        __type: 'Date',
        iso   : '2017-11-02T16:29:03.237Z'
      },
      location        : 'Minneapolis, Minnesota',
      name            : 'cory',
      postCount       : 1,
      profileImage    : 'fakeurl',
      profileThumbnail: 'fakeurl',
      role            : 3,
      website         : 'fakewebsite',
      createdAt       : '2014-02-03T07:21:44.372Z',
      updatedAt       : '2017-11-02T16:47:05.891Z',
      className       : 'User',
      objectId        : 1
    }
  }
  return payload
}

export async function userFeedPhotos() {
  return photoResponse
}

export async function popularFeedPhotos() {
  return photoResponse
}
