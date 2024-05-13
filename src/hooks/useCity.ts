export type City = {
  name: string;
  latitude: number;
  longitude: number;
};

export const useCity = () => {
  const search = async (keyword: string) => {
    const response = await fetch("/api/city?keyword=" + keyword);
    const result = (await response.json()) as City[];
    return result;
  };

  return { search };
};
