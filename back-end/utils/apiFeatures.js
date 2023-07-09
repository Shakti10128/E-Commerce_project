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

    // remnove some field for catogory
    const removefields = ["keyword", "page", "limit"];
    removefields.forEach((key) => delete queryCopy[key]);
    console.log(queryCopy);

    // for rating & price filter

    // queryCopy is a object so converting it into string by JSON.stringigy() method
    let queryStr = JSON.stringify(queryCopy);
    // replace all keyword like gt,gte,lt,lte with mongo operators before putting $ symbol of these
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key =>`$${key}`)

    // now convert in into object again by JSON.parse() method
    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr);
    return this;
  }
}

module.exports = ApiFeatures;
