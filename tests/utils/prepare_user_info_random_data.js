export function generateUserData() {
const timestamp = Date.now();
 const userName=  Math.random().toString(36).substring(2, 10);
 return {
    userName,
    userEmail: `user_${timestamp}@mail.busy.in`,
    userMobile: `9${Math.floor(100000000 + Math.random() * 900000000)}`
  };
}

