// PostRequests.js
export const PostRequests = {
    logInUser: async (email, password) => {
      // Simulate an API call
      try {
        if (email === 'Ola@wp.pl' && password === 'Ola') {
          // Simulated successful login
          return { success: true, token: 'simulated_token' };
        } else {
          // Simulated login failure
          return { success: false };
        }
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
  };
  
  export default PostRequests;
  