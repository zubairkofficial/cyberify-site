import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class Helpers {
  static developmentMode = false; // Change this to `false` when deploying
  static localhost = "127.0.0.1:8000";
  static server = "api.cyberify.co";
  static basePath = Helpers.developmentMode
    ? `http://${this.localhost}`
    : `https://${this.server}`;
  static apiUrl = `${this.basePath}/api/`;

  static openaiKey = "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";
  static googleApiKey = "AIzaSyDcfN0b1_bI-np84t35URWv3-Im1rCSzpc";
  static suggestionPrompt = `You are a customer service bot and you need to generate a SUGGESTION based on the conversation happened so far by AI and user.`;

  static authUser = JSON.parse(localStorage.getItem("user")) ?? {};

  static serverImage = (name) => {
    return `${this.basePath}/uploads/${name}`;
  };

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static getItem = (data, isJson = false) => {
    if (isJson) {
      return JSON.parse(localStorage.getItem(data));
    } else {
      return localStorage.getItem(data);
    }
  };

  static setItem = (key, data, isJson = false) => {
    if (isJson) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  };

  static isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  static toast = (type, message) => {
    const notyf = new Notyf();
    notyf.open({
      message: message,
      type: type,
      position: { x: "right", y: "top" },
      ripple: true,
      dismissible: true,
      duration: 2000,
    });
  };

  static staticImage(path) {
    return `/assets/${path}`; // Assuming assets are in the /public/assets folder
  }

  static replaceSpaces(str) {
    return str.replace(/ /g, "-");
  }

  // static loadScript(scriptName, dashboard = false) {
  //   return new Promise((resolve, reject) => {
  //     const scriptPath = new URL(
  //       `/src/assets/js/${scriptName}`,
  //       import.meta.url
  //     ).href;
  //     const script = document.createElement("script");
  //     script.src = scriptPath;
  //     script.async = true;

  //     script.onload = () => resolve(script);
  //     script.onerror = () =>
  //       reject(new Error(`Script load error: ${scriptPath}`));

  //     document.body.appendChild(script);
  //   });
  // }

static loadScript(scriptName, dashboard = false) {
  return new Promise((resolve, reject) => {
    const scriptPath = `/assets/js/${scriptName}`; // Served from public folder

    // Check if the script already exists and remove it
    const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
    if (existingScript) {
      // Remove the existing script to avoid duplication
      existingScript.remove();
    }

    // Create the new script element
    const script = document.createElement("script");
    script.src = scriptPath;
    script.async = true;

    // Once the script loads, resolve the promise
    script.onload = () => resolve(script);

    // In case of an error, reject the promise
    script.onerror = () => reject(new Error(`Script load error: ${scriptPath}`));

    // Append the new script to the document body
    document.body.appendChild(script);
  });
}

  


  static search = (query, data, fields) => {
    if (query) {
      // eslint-disable-next-line
      let filteredData = data.filter((row) => {
        for (let i = 0; i < fields.length; i++) {
          let field = fields[i];
          if (field.includes(".")) {
            let keyvalue = field.split(".");
            let key = keyvalue[0];
            let value = keyvalue[1];
            if (isNaN(query) && isNaN(row[key][value])) {
              if (row[key][value].toLowerCase().includes(query.toLowerCase())) {
                return row;
              }
            } else if (!isNaN(query) && !isNaN(row[key][value])) {
              if (row[key][value].toString().includes(query)) {
                return row;
              }
            }
          } else {
            if (isNaN(query) && isNaN(row[field])) {
              if (row[field].toLowerCase().includes(query.toLowerCase())) {
                return row;
              }
            } else if (!isNaN(query) && !isNaN(row[field])) {
              if (row[field].toString().includes(query)) {
                return row;
              }
            }
          }
        }
      });
      return filteredData;
    } else {
      return data;
    }
  };

  static paginate = (data, perPage = 10) => {
    let input = data;
    let chunked = [];
    let size = perPage;

    Array.from({ length: Math.ceil(input.length / size) }, (val, i) => {
      chunked.push(input.slice(i * size, i * size + size));
    });

    return chunked;
  };
}

export default Helpers;
