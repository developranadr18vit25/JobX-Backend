function buildQuery(params) {
    let query = {};

    if (params.JobType) {
        query.JobType = params.JobType;
    }

    if (params.title) {

        query.Title = { $regex: params.title };

    }

    if(params.skills){
        query.Skills={$all:params.skills}
    }

    if (params.company) {
        query.Company = { $regex: params.company };
    }

    if (params.location) {
        query.Location = { $regex: params.location };
    }

    if (params.minSalary && params.maxSalary) {
        query.Salary = { $gte: Number(params.minSalary), $lte: Number(params.maxSalary) };
    }

    else if (params.minSalary) {
        query.Salary = { $gte: Number(params.minSalary) };
    }

    else if (params.maxSalary) {
        query.Salary = { $lte: Number(params.maxSalary) };
    }

    // if(params.minExp){
    //     query.Experience={$gte: Number(params.minExp)};
    // }

    // if(params.maxExp){
    //     query.Experience={$lte: Number(params.maxExp)};
    // }

    if (params.minExp && params.maxExp) {
        query.Experience = { $gte: Number(params.minExp), $lte: Number(params.maxExp) };
    }

    else if (params.minExp) {
        query.Experience = { $gte: Number(params.minExp) };
    }

    if (params.status) {
        query.Status = { $regex: params.status }
    }

    return query;
}

module.exports = buildQuery