class AuthService {
    constructor() {
      this.apiUrl = 'http://localhost:8080/api/v1/auth'; 
    }
  
    async register(firstName, lastName, login, email, password, phone) {
      try {
        const response = await fetch(`${this.apiUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            login,
            email,
            password,
            phone,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to register.');
        }
  
        return await response.json(); 
      } catch (error) {
        throw error;
      }
    }
  
    async login(email, password) {
      try {
        const response = await fetch(`${this.apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to login.');
        }
  
        return await response.json(); 
      } catch (error) {
        throw error;
      }
    }
  
    
    async logout(token) {
      try {
        const response = await fetch(`${this.apiUrl}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to logout.');
        }
  
        return await response.json();
      } catch (error) {
        throw error;
      }
    }
    }