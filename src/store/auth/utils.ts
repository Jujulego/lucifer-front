// Functions
export const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`
});
