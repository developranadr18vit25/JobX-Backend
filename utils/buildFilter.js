function buildFilter(params){

    let filter={};

    if(params.minExperience && params.maxExperience){
        filter.Experience={$gte:Number(params.minExperience) , $lte:Number(params.maxExperience)};
    }
    else if(params.minExperience ){
        filter.Experience={$gte:Number(params.minExperience)};
    }

    else if( params.maxExperience){
        filter.Experience={$lte:Number(params.maxExperience)};
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