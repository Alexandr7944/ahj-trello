import dataJSON from "../data.json";

class DataStor {
  static getData = () => {
    if (sessionStorage.getItem("trello")) {
      return JSON.parse(sessionStorage.getItem("trello"));
    }
    sessionStorage.setItem("trello", JSON.stringify(dataJSON));
    return dataJSON;
  };

  static changeData(data) {
    sessionStorage.setItem("trello", JSON.stringify(data));
  }
}

export default DataStor;
