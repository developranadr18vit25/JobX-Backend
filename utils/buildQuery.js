function buildQuery(params) {
    let query = {};

    if (params.title) {

        query.Title = { $regex: params.title };

    }

    if (params.company) {
        query.Company = { $regex: params.company };
    }

    if (params.location) {
        query.Location = { $regex: params.location };
    }

    if (params.minSalary && params.maxSalary) {
        query.Salary = { $gte: Number(params.minSalary), $lte: Number(params.maxSalary)};
    }

    else if (params.minSalary) {
        query.Salary = { $gte: Number(params.minSalary)};
    }

    else if(params.maxSalary) {
        query.Salary = { $lte: Number(params.maxSalary)};
    }

    return query;
}

module.exports = buildQuery