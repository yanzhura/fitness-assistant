import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';
import { getExercises } from '../../store/trainingPlan';
import { getUserCompletedWorkouts, getUserSchedule } from '../../store/user';
//* styles
import {
    red,
    volcano,
    orange,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta
} from '@ant-design/colors';
import { StyledGraphBox, StyledTitle } from '../StyledComponents';
import { TextBox, TextWrapper } from './styles';

const GroupProgress = () => {
    const exercises = useSelector(getExercises());
    const userSchedule = useSelector(getUserSchedule());
    const userCompletedWorkouts = useSelector(getUserCompletedWorkouts());

    const getGraphData = () => {
        const preDataObject = {};
        for (let i = 1; i <= userCompletedWorkouts; i++) {
            const { results } = userSchedule[i - 1];
            for (const result of results) {
                const groupName = exercises.find((ex) => ex._id === result.exercise);
                if (!preDataObject[groupName]) {
                    preDataObject[groupName] = [];
                    preDataObject[groupName].push(result.count);
                } else {
                    preDataObject[groupName].push(result.count);
                }
            }
        }
        const graphData = [];
        const graphKeys = [];
        const colors = [red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta];
        let colorIndex = 0;
        for (const key in preDataObject) {
            const barGroupObject = {};
            barGroupObject.exerciseGroup = key;
            let keyIndex = 0;
            preDataObject[key].forEach((element, index) => {
                const barKeyName = `bar${index}`;
                if (!graphKeys.includes(barKeyName)) {
                    graphKeys.push(barKeyName);
                }
                const colorKeyName = `bar${index}Color`;
                barGroupObject[barKeyName] = element;
                if (keyIndex >= 0 && keyIndex <= 2) {
                    barGroupObject[colorKeyName] = colors[colorIndex][3];
                } else if (keyIndex >= 3 && keyIndex <= 5) {
                    barGroupObject[colorKeyName] = colors[colorIndex][4];
                } else if (keyIndex >= 6 && keyIndex <= 8) {
                    barGroupObject[colorKeyName] = colors[colorIndex][5];
                } else {
                    barGroupObject[colorKeyName] = colors[colorIndex][6];
                }
                keyIndex++;
            });
            colorIndex++;
            if (colorIndex > 11) {
                colorIndex = 0;
            }
            graphData.push(barGroupObject);
        }
        return { graphData, graphKeys };
    };

    const { graphData, graphKeys } = getGraphData();

    return (
        <StyledGraphBox>
            {userCompletedWorkouts < 4 ? (
                <TextWrapper>
                    <TextBox>
                        У нас пока недостаточно данных, чтобы отобразить график прогреса по группам. Он появится, когда
                        вы закончите не менее 3-х тренировок.
                    </TextBox>
                </TextWrapper>
            ) : (
                <>
                    <StyledTitle level="4" italic>
                        Прогресс по группам
                    </StyledTitle>
                    <ResponsiveBar
                        data={graphData}
                        keys={graphKeys}
                        indexBy="exerciseGroup"
                        margin={{ top: 30, right: 50, bottom: 100, left: 50 }}
                        groupMode="grouped"
                        colors={({ id, data }) => {
                            return String(data[`${id}Color`]);
                        }}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]]
                        }}
                        enableLabel={false}
                        axisLeft={null}
                        axisBottom={{
                            legend: 'Группы упражнений',
                            legendPosition: 'middle',
                            legendOffset: 60,
                            tickRotation: 15
                        }}
                        isInteractive={false}
                    />
                </>
            )}
        </StyledGraphBox>
    );
};

export default GroupProgress;
