export default (email) => {
  function getRole () {
    switch (email) {
      case 'user@example.com':
        return 'user'
      case 'mod@example.com':
        return 'moderator'
      case 'mod2@example.com':
        return 'moderator'
      case 'admin@example.com':
        return 'admin'
      default:
        return 'user'
    }
  }

  function getName () {
    switch (email) {
      case 'user@example.com':
        return 'User'
      case 'mod@example.com':
        return 'Moderator'
      case 'mod2@example.com':
        return 'Moderator'
      case 'admin@example.com':
        return 'Admin'
      default:
        return 'User'
    }
  }

  function getPermissions () {
    const rootPermissions = [
      'own_topics:write',
      'own_topics:delete',
      'own_replies:write',
      'own_replies:delete'
    ]
    const categoryPermissions = [
      'categories_topics:write',
      'categories_topics:delete',
      'categories_replies:write',
      'categories_replies:delete'
    ]
    switch (email) {
      case 'user@example.com':
        return {
          root: rootPermissions,
          categories: {}
        }
      case 'mod@example.com':
        return {
          root: rootPermissions,
          categories: {
            'first-category': categoryPermissions
          }
        }
      case 'mod2@example.com':
        return {
          root: rootPermissions,
          categories: {
            'second-category': categoryPermissions
          }
        }
      case 'admin@example.com':
        return {
          root: [
            ...rootPermissions,
            'categories:write',
            'categories:delete'
          ],
          categories: {
            'first-category': categoryPermissions,
            'second-category': categoryPermissions,
            'third-category': categoryPermissions,
            'fourth-category': categoryPermissions
          }
        }
      default:
        return {
          root: rootPermissions,
          categories: {}
        }
    }
  }
  return {
    role: getRole(),
    _id: Math.round(Math.random() * 999999),
    email,
    name: getName(),
    avatarUrl: '',
    permissions: getPermissions()
  }
}
