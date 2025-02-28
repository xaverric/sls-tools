const { enterStringNestedObjects } = require("../../../../../../bookkit/helper/uu5string-escape-helper");

const template = (table, chart) => {
    const [tableColumns, tableData] = table;
    const [chartSeries, chartData, tableChartColumns, tableChartData] = chart;

    return `<uu5string/>
        <UU5.Bricks.Lsi>
            <UU5.Bricks.Lsi.Item language="en">
                <UU5.Bricks.Section contentEditable colorSchema=null level="3" header="Dashboard">
                    <UuContentKit.Bricks.BlockDefault icon="mdi-timelapse">
                        <UU5.RichText.Block uu5string="${new Date()}"/>
                    </UuContentKit.Bricks.BlockDefault>
                    <UU5.Bricks.Row contentEditable>
                        ${Object.keys(chartData).map(group => `
                            <UU5.Bricks.Column colWidth="s-6 m-4 l-3">
                                <UU5.Bricks.Section contentEditable level="3" header="${group}" colorSchema=null>
                                    <UU5.Bricks.Tabs mountTabContent="onActive" type="tabs" size="s" elevation="1" elevationHover="2" fade underline=false colorSchema="info">
                                        <UU5.Bricks.Tabs.Item header="Chart" name="Item 1">
                                            <UU5.SimpleChart.PieChart 
                                                series='<uu5json/>${JSON.stringify(chartSeries[group])}' 
                                                data='<uu5json/>${JSON.stringify(chartData[group])}' 
                                                displayLabel=false 
                                                displayLegend="top-center"
                                            />
                                        </UU5.Bricks.Tabs.Item>
                                        <UU5.Bricks.Tabs.Item header="Detail" name="Item 2">
                                            <Uu5TilesBricks.Table 
                                                columns='<uu5json/>${JSON.stringify(tableChartColumns)}' 
                                                data='<uu5json/>${JSON.stringify(tableChartData[group])}'
                                            />
                                        </UU5.Bricks.Tabs.Item>
                                    </UU5.Bricks.Tabs>
                                </UU5.Bricks.Section>
                            </UU5.Bricks.Column>
                        `).join("")}"
                    </UU5.Bricks.Row>
                </UU5.Bricks.Section>
                <UU5.Bricks.Section contentEditable level="3" header="Detail" colorSchema=null>
                        ${Object.keys(tableData).map(group => `
                                <UU5.Bricks.Panel 
                                    header="${group}" 
                                    mountContent="onEachExpand" 
                                    colorSchemaContent="info" 
                                    bgStyleContent="transparent" 
                                    bgStyleHeader="outline" 
                                    colorSchemaHeader="info" 
                                    iconExpanded="mdi-folder-open-outline" 
                                    iconCollapsed="mdi-folder"
                                >
                                    <Uu5TilesBricks.Table 
                                        columns='<uu5json/>${JSON.stringify(tableColumns)}'
                                        data='<uu5json/>${enterStringNestedObjects(JSON.stringify(tableData[group]))}'
                                    />
                                </UU5.Bricks.Panel>
                            `).join("")}
                </UU5.Bricks.Section>
            </UU5.Bricks.Lsi.Item>
        </UU5.Bricks.Lsi>`
};

module.exports = template;