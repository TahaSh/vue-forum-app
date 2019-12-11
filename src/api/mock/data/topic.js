export default (topicId) => {
  if (!(/c[1-4]t[1-3]/).test(topicId)) {
    return null
  }
  function getCategorySlug () {
    if (topicId.indexOf('c1') === 0) {
      return 'first-category'
    } else if (topicId.indexOf('c2') === 0) {
      return 'second-category'
    } else if (topicId.indexOf('c3') === 0) {
      return 'third-category'
    } else if (topicId.indexOf('c4') === 0) {
      return 'fourth-category'
    } else {
      return 'first-category'
    }
  }

  return {
    _id: topicId,
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    user: {
      name: 'First User',
      avatar: ''
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab delectus soluta ut error quibusdam ipsum laboriosam nostrum recusandae labore vero nihil deleniti in, reiciendis doloremque at, nam rerum ratione pariatur!',
    category: { slug: getCategorySlug() },
    createdAt: '2019-03-27',
    replies: [
      {
        _id: 1,
        user: {
          name: 'Second User',
          avatar: ''
        },
        content: 'Expedita aliquid at suscipit molestias eos dicta, sed iste quidem blanditiis quod.',
        createdAt: '2019-03-27'
      },
      {
        _id: 2,
        user: {
          name: 'First User',
          avatar: ''
        },
        content: 'Aperiam minima autem aliquam alias consequuntur quas magnam?',
        createdAt: '2019-03-27'
      }
    ]
  }
}
