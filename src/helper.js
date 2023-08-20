import { ResturantDetailsUrl, ResturantMenuUrl } from "./config";

export async function useResturant() {
  try {
    const res = await fetch(ResturantDetailsUrl);
    const json = await res.json();

    async function checkJsonData(jsonData) {
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {
        // initialize checkData for Swiggy Restaurant data
        let checkData =
          json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        // if checkData is not undefined then return it
        if (checkData !== undefined) {
          return checkData;
        }
      }
    }
    // call the checkJsonData() function which return Swiggy Restaurant data
    const resData = await checkJsonData(json);
    return resData;
  } catch (ex) {}
}

export const useFilterCard = (searchTest, restaurantList) => {
  const res = restaurantList.filter((meal) => {
    return searchTest.toLowerCase() === ""
      ? meal
      : meal?.info?.name?.toLowerCase()?.includes(searchTest);
  });
  return res;
};
export async function useResturantById(id) {
  try {
    const res = await fetch(ResturantMenuUrl + id);
    const data = await res.json();
    return data;
  } catch (ex) {}
}