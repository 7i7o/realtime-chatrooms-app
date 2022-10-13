export const leaveRoom = (id: string, users: any[]) => {
  return users.filter((u: { id: string }) => u.id != id);
};
