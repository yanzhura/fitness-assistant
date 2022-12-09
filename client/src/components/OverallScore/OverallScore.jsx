import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useSelector } from 'react-redux';
import { getUserCompletedWorkouts, getUserSchedule } from '../../store/user';
import { green } from '@ant-design/colors';
import { getTrainingPlan } from '../../store/trainingPlan';
//* styles
import { StyledGraphBox, StyledTitle } from '../StyledComponents';
import { TextBox, TextWrapper } from './styles';

const OverallScore = () => {
    const userSchedule = useSelector(getUserSchedule());
    const workoutsTotal = useSelector(getTrainingPlan()).length;
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());

    const getGraphData = () => {
        const dailyResults = [];
        const graphData = [
            {
                id: 'Overall score',
                data: []
            }
        ];
        for (let i = 1; i <= workoutsTotal; i++) {
            if (i <= userCompletedWorkouts) {
                const { results } = userSchedule[i - 1];
                dailyResults.push(results.reduce((acc, val) => acc + val.count, 0));
            } else {
                dailyResults.push(0);
            }
        }
        let counter = 1;
        let graphPointsCounter = 1;
        let accumulator = 0;
        for (const res of dailyResults) {
            accumulator = accumulator + res;
            counter++;
            if (counter > 3) {
                graphData[0].data.push({
                    x: graphPointsCounter,
                    y: accumulator === 0 ? null : accumulator
                });
                accumulator = 0;
                counter = 1;
            }
            graphPointsCounter++;
        }
        return graphData;
    };

    const data = getGraphData();

    return (
        <StyledGraphBox>
            {userCompletedWorkouts < 4 ? (
                <TextWrapper>
                    <TextBox>
                        У нас пока недостаточно данных, чтобы отобразить график общего прогреса. Он появится, когда вы
                        закончите не менее 3-х тренировок.
                    </TextBox>
                </TextWrapper>
            ) : (
                <>
                    <StyledTitle level="4" italic>
                        Общий прогресс в баллах
                    </StyledTitle>
                    <ResponsiveLine
                        data={data}
                        margin={{ top: 30, right: 50, bottom: 100, left: 50 }}
                        lineWidth={1}
                        enablePointLabel={true}
                        pointSize={8}
                        pointColor={'white'}
                        pointBorderWidth={1}
                        pointBorderColor={green[5]}
                        colors={green[5]}
                        axisLeft={null}
                        axisBottom={{ legend: 'Тренировки', legendPosition: 'middle', legendOffset: 40 }}
                    />
                </>
            )}
        </StyledGraphBox>
    );
};

export default OverallScore;
