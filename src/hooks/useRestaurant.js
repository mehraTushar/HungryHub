import { ResturantDetailsUrl } from '../config.js';
import { checkJsonData } from '../helper';

export async function useRestaurant(latitude, longitude) {
  try {
    const proxyUrl = "https://cors-proxy-green.vercel.app/api/proxy"; // ✅ correct path
    const targetUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const res = await fetch(`${proxyUrl}?url=${encodeURIComponent(targetUrl)}`);
    const data = await res.json();

    const resData = checkJsonData(data);
    return { finalData: resData, loaded: true };
  } catch (ex) {
    console.error("Error in fetching restaurant data:", ex);
    throw ex;
  }
}
