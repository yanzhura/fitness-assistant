import httpService from './httpService';

const trainingPlanEndpoint = 'trainingPlan';

const fetchAll = async () => {
    const { data } = await httpService.get(`${trainingPlanEndpoint}.json`);
    return data;
};

export default {
    fetchAll
};
