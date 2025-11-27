// Mock users data for testing
const mockUsers = [
  {
    id: '1',
    username: 'super1',
    password: 'super123',
    fullName: 'Super Usuario 1',
    email: 'super1@example.com',
    role: 'superuser'
  },
  {
    id: '2',
    username: 'super2',
    password: 'super456',
    fullName: 'Super Usuario 2',
    email: 'super2@example.com',
    role: 'superuser'
  },
  {
    id: '3',
    username: 'admin1',
    password: 'admin123',
    fullName: 'Administrador 1',
    email: 'admin1@example.com',
    role: 'administrator'
  },
  {
    id: '4',
    username: 'admin2',
    password: 'admin456',
    fullName: 'Administrador 2',
    email: 'admin2@example.com',
    role: 'administrator'
  },
  {
    id: '5',
    username: 'user1',
    password: 'user123',
    fullName: 'Usuario 1',
    email: 'user1@example.com',
    role: 'user'
  },
  {
    id: '6',
    username: 'user2',
    password: 'user456',
    fullName: 'Usuario 2',
    email: 'user2@example.com',
    role: 'user'
  }
];

async function authenticateUser(username, password) {
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));

    const user = mockUsers.find(
      item => item.username === username && item.password === password
    );

    if (user) {
      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      };
    } else {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: 'Error al verificar credenciales'
    };
  }
}
