class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        console.log(queryObj);
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        console.log(this.queryString, queryObj);

        ///////////////////////////////////Advanced Filtering :-///////////////////////////////////
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, match => `$${match}`);
        // queryStr =  queryStr.split(",").join(" ");
        // console.log(queryStr[0], queryStr[1]);
        queryStr = JSON.parse(queryStr);
        console.log(queryStr);

        this.query = this.query.find(queryStr);

        return this;
    }

    sort() {
            if(this.queryString.sort) {
                const sortBy =  this.queryString.sort.split(",").join(" ");
                console.log(sortBy);
                this.query = this.query.sort(sortBy);
            } else {
                this.query = this.query.sort("-createdAt");
            }
        return this;
    }

    limitFields() {
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            console.log(fields);
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }

    pagination() {
        // if(this.queryString.page || this.queryString.limit) {
            const page = this.queryString.page * 1 || 1;
            const limit = this.queryString.limit * 1 || 100;
            const skip = (page - 1) * limit;
            this.query = this.query.skip(skip).limit(limit);
        // }

        return this;
    }
}

module.exports = APIFeatures;