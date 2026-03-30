function buildFilter(params , filter){

    if(params.minExperience && params.maxExperience){
        filter.Experience={$gte:Number(params.minExperience) , $lte:Number(params.maxExperience)};
    }

    if(params.status){
        filter.Status={$regex: params.status}
    }

    if(params.keyword){
        filter.$text={$search:params.keyword}
    }

    return filter;
}

module.exports=buildFilter