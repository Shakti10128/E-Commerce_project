class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //   search functionality

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //   filter functionality
  filter() {
    // making a copy of queryStr using spread operator because all object pass by reference by default
    const queryCopy = { ...this.queryStr };

    console.log(queryCopy);
    // remnove some field for catogory
    const removefields = ["keyword", "page", "limit"];
    removefields.forEach((key) => delete queryCopy[key]);
    console.log(queryCopy);

    let queryStr = JSON.stringify(queryCopy);
    // replace all keyword like gt,gte,lt,lte with mongo operators before putting $ symbol of keyword
    queryStr = queryStr.replace(/\b()\b/g,key =>`$${key}`)

    this.query = this.query.find(queryCopy);
    return this;
  }
}

module.exports = ApiFeatures;
