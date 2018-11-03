export class TopologyService {
  constructor() {
    this.baseUrl = '/api/topology';
    this.topology;
  }

  getTopology(useCache) {
    if (useCache && this.topology) {
      return new Promise((resolve) => {
        resolve(this.topology);
      });
    }

    return fetch(this.baseUrl)
      .then((resp) => resp.json())
      .then((response) => {
        this.topology = response;

        return this.topology;
      });
  }

}