export const loadData = (name: string) => {
  try {
    const dt = localStorage.getItem(name);
    if (dt === null)
      return null;
    return JSON.parse(dt);
  } catch (err) {
    return null;
  }
};

export const saveData = (name: string, state: any) => {
  try {
    const dt = JSON.stringify(state);
    localStorage.setItem(name, dt);
  } catch {
    
  }
};
