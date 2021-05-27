import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryGroup,
    VictoryTooltip,
    VictoryLegend,
    VictoryLabel,
    VictoryLine,
    VictoryVoronoiContainer,
} from "victory";
import { wincTheme } from "./WincTheme";

const Chart = ({ data, multipleStudents, difficult, fun, bargraph }) => {

    const activeData = array => {
        const test = array.map(element => element.filter(item => item.active === true))
        return test;
    }

    const getRightData = () => {
        if (multipleStudents === true) {
            const getAverage = (array, grade) => {
                return array.reduce((accumulator, item) => item[grade] + accumulator, 0) / array.length;
            }
            const getProject = array => {
                return [...new Set(array.map(item => item.project))][0];
            }

            const getAvgDifficulty = array => {
                const newDataArray = [];
                array.forEach(item => {
                    const project = getProject(item);
                    const difficulty = getAverage(item, "difficulty");
                    const newItem = { project: project, difficulty: difficulty, label: `Challenge. ${project} \n Difficult: ${difficulty}` };
                    newDataArray.push(newItem);
                })
                return newDataArray;
            }
            const getAvgEnjoyment = array => {
                const newDataArray = [];
                array.forEach(item => {
                    const project = getProject(item);
                    const enjoyment = getAverage(item, "enjoyment");
                    const newItem = { project: project, enjoyment: enjoyment, label: `Challenge. ${project} \n Fun: ${enjoyment}` };
                    newDataArray.push(newItem);
                })
                return newDataArray;
            }

            const difficulty = getAvgDifficulty(activeData(data));
            const enjoyment = getAvgEnjoyment(activeData(data));
            const dataObject = { difficulty: difficulty, enjoyment: enjoyment }
            return dataObject;
        } else {
            const difficulty = data.map(item => {
                return { project: item.project, difficulty: item.difficulty, label: `Challenge. ${item.project} \n Fun: ${item.difficulty}` }
            })
            const enjoyment = data.map(item => {
                return { project: item.project, enjoyment: item.enjoyment, label: `Challenge. ${item.project} \n Fun: ${item.enjoyment}` }
            })

            const dataObject = { difficulty: difficulty, enjoyment: enjoyment }
            return dataObject;
        }
    }

    const getTickValues = input => {
        if (input[0][0]) {
            return [...new Set(input.map(item => item.project))];
        } else {
            return input.project
        }
    }

    const getContainerComponent = () => {
        return bargraph ? undefined : <VictoryVoronoiContainer />;
    }

    return (
        <div className="chart">
            <VictoryChart
                domainPadding={10}
                animate={{ duration: 1000 }}
                width={900}
                theme={wincTheme}
                containerComponent={getContainerComponent()}
            >
                <VictoryLegend x={670} y={0}
                    title="Legenda"
                    centerTitle
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "black" }, title: { fontSize: 14 } }}
                    data={[
                        { name: "Fun", symbol: { fill: "#456268" } },
                        { name: "Difficult", symbol: { fill: "#F4511E" } },
                    ]}
                />
                <VictoryAxis
                    tickValues={getTickValues(data)}
                    tickLabelComponent={
                        <VictoryLabel
                            dy={-10}
                            dx={5}
                            angle={-45}
                            renderInPortal
                            textAnchor="end"
                            style={{
                                fontSize: 10,
                            }}
                            width={10}
                        />
                    }
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={[1, 2, 3, 4, 5]}
                />
                {bargraph ? <VictoryGroup
                    offset={5}
                >
                    {difficult ? <VictoryBar
                        labels={({ datum }) => `Name: ${datum.name} score: ${datum.score}`}
                        labelComponent={
                            <VictoryTooltip />
                        }
                        data={getRightData().difficulty}
                        x={"project"}
                        y={"difficulty"}
                        style={{
                            data: { fill: "#F4511E" }
                        }}
                    /> : null}
                    {fun ? <VictoryBar
                        labels={({ datum }) => `Name: ${datum.name} score: ${datum.score}`}
                        labelComponent={
                            <VictoryTooltip />
                        }
                        data={getRightData().enjoyment}
                        x={"project"}
                        y={"enjoyment"}
                        style={{
                            data: { fill: "#456268" }
                        }}
                    /> : null}
                </VictoryGroup> :
                    <VictoryGroup
                        offset={4}
                    >
                        {difficult ? <VictoryLine
                            labelComponent={
                                <VictoryTooltip />
                            }
                            data={getRightData().difficulty}
                            x={"project"}
                            y={"difficulty"}
                        /> : null}
                        {fun ? <VictoryLine
                            labelComponent={
                                <VictoryTooltip />
                            }
                            data={getRightData().enjoyment}
                            x={"project"}
                            y={"enjoyment"}
                        /> : null}
                    </VictoryGroup>}
            </VictoryChart>
        </div>
    );
}

export default Chart;