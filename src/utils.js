// import { decode } from "js-base64";

export const validateUserWithWallat = () => {
  const getUid = localStorage.getItem("uid");
  return getUid;

  //   return accounts[0] === decode(getUid);
};

const multiplier = 1000000000000000000;

export const convertToToken = (token) => {
  return token / multiplier;
};

export const convertFromToken = (token) => {
  return token * multiplier;
};

export const mapDataForPayableCollection = (getAllCollections) => {
  return getAllCollections.reduce((acc, item) => {
    const found = acc.find((i) => i.collection === item[0]);
    if (found) {
      found.id.push(item[1]);
    } else {
      acc.push({ collection: item[0], id: [item[1]] });
    }
    return acc;
  }, []);
};

export const coinName = () => {
  return "Pcoin";
};
