import BASE_URL from "./env";

class APIService {
  POST(endpoint, params, token) {
    let URL = this.normalizePath(endpoint);
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "POST",
        body: JSON.stringify(params),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((response) => {
          resolve({ success: true, data: response });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  GET(endpoint, token) {
    let URL = this.normalizePath(endpoint);
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            var returnJson = response.json();
            return returnJson;
          }
        })
        .then((response) => {
          resolve({ success: true, data: response });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  GETBYID(endpoint, token) {
    let URL = this.normalizePath(endpoint);
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            var returnJson = response.json();
            return returnJson;
          }
        })
        .then((response) => {
          resolve({ success: true, data: response });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  PUT(endpoint, params, token) {
    let URL = this.normalizePath(endpoint);
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "PUT",
        body: JSON.stringify(params),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return true;
          }
        })
        .then((response) => {
          resolve({ success: true, message: "Data Added Successfully" });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  UPDATE(endpoint, params, token) {
    let URL = this.normalizePath(endpoint);
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "POST",
        body: JSON.stringify(params),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return true;
          }
        })
        .then((response) => {
          resolve({ success: true, message: "Data Updated Succesfully" });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  EXPORT(endpoint, token, fileName) {
    let URL = this.normalizePath(endpoint);
    let Token = this.normalizeToken(token);

    return new Promise((resolve, reject) => {
      fetch(URL, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            reject({ success: false, message: "Download failed" });
          }
        })
        .then((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            resolve({ success: true, message: "Download successful" });
          } else {
            reject({ success: false, message: "Blob is undefined" });
          }
        })
        .catch((error) => {
          reject({ success: false, message: error });
        });
    });
  }

  EXPORTBYBUID(endpoint, token, fileName, BuId) {
    let URL = this.normalizePath(endpoint) + `/${BuId}`;
    let Token = this.normalizeToken(token);

    return new Promise((resolve, reject) => {
      fetch(URL, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            reject({ success: false, message: "Download failed" });
          }
        })
        .then((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            resolve({ success: true, message: "Download successful" });
          } else {
            reject({ success: false, message: "Blob is undefined" });
          }
        })
        .catch((error) => {
          reject({ success: false, message: error });
        });
    });
  }

  DELETE(endpoint, token) {
    let URL = this.normalizePath(endpoint);
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return true;
          }
        })
        .then((response) => {
          resolve({ success: true, message: "Deleted Successfully" });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  GETLISTPAGINATED(endpoint, pageNo, perPage, token, searchString, showDeleted) {
    let URL =
      this.normalizePath(endpoint) +
      `/${showDeleted}/${pageNo}/${perPage}/${searchString}`;
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            var returnJson = response.json();
            return returnJson;
          }
        })
        .then((response) => {
          resolve({ success: true, data: response });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  GETLISTPAGINATEDBYBUID(endpoint, pageNo, perPage, BuId, token, searchString, showDeleted) {
    let URL =
      this.normalizePath(endpoint) +
      `/${BuId}/${showDeleted}/${pageNo}/${perPage}/${searchString}`;
    let Token = this.normalizeToken(token);

    return new Promise((resolve) => {
      fetch(URL, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: Token,
        }),
      })
        .then((response) => {
          if (response.ok) {
            var returnJson = response.json();
            return returnJson;
          }
        })
        .then((response) => {
          resolve({ success: true, data: response });
        })
        .catch((error) => {
          resolve({ success: false, message: error });
        });
    });
  }

  normalizePath(endpoint) {
    return `${BASE_URL}/${endpoint}`;
  }

  normalizeToken(token) {
    return `Bearer ${token}`;
  }
}

export default new APIService();
