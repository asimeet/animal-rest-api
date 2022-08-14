class MockRestClient {

    constructor() {
        this.mockDataMap = { post : {}, get: {}};
    }

    setMockData(url, method, mockdata) {
        this.mockDataMap[method][url] = mockdata;
    }

    get(url) {
        return this.mockDataMap.get[url];
    }

    post(url) {
        return this.mockDataMap.post[url];
    }

    resetMockData() {
        this.mockDataMap = { post : {}, get: {}};
    }

}

const mockRestClient = new MockRestClient();

module.exports = { mockRestClient };