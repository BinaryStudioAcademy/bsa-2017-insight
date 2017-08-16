export const getStatisticById = (id) => {
    return {
        type: 'GET_STATISTIC_BY_ID' ,
        payload:{
            id
        }
    } 
    };