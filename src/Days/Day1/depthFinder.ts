export class DepthFinder {
    isDeeper(prev: number, cur: number) {
        return cur > prev;
    }

    generateThreeMeasurementWindowData(data: number[]): number[] {
        let windowData: number[] = [];
        data.forEach((depthReading, index) => {
            let firstMeasurement = depthReading;
            let secondMeasurement = isNaN(data[index+1]) ? 0: data[index+1];
            let thirdMeasurement = isNaN(data[index+2])? 0: data[index+2];
            let sum = firstMeasurement + secondMeasurement + thirdMeasurement;

            windowData.push(sum)
            // console.log(`Adding ${firstMeasurement}, ${secondMeasurement}, & ${thirdMeasurement} = ${sum}`);
        })

        return windowData;
    }
}