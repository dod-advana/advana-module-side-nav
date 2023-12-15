import axios from "axios";

export async function getLinks() {
  try {
    let data;

    try {
      data = JSON.parse(sessionStorage.getItem("advana-mega-menu"));
    } catch (err) {
      console.error(err);
    }

    if (!data) {
      const response = await axios.get(
        window?.__env__?.REACT_APP_MEGA_MENU_ENDPOINT ||
          process.env.REACT_APP_MEGA_MENU_ENDPOINT,
        { withCredentials: true }
      );
      data = response?.data;
      sessionStorage.setItem("advana-mega-menu", JSON.stringify(data));
    }
    return data?.links || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}
