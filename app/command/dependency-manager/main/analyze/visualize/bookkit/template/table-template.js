const template = (table, analysisResult, projectPath, configuration) => {
    const [tableColumns, tableData] = table;

    return `<uu5string/>
        <UU5.Bricks.Lsi>
            <UU5.Bricks.Lsi.Item language="en">
                <UU5.Bricks.Section contentEditable level="3" header="${projectPath}" colorSchema=null>
                    <UuContentKit.Bricks.BlockDefault>
                        <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                    </UuContentKit.Bricks.BlockDefault>
                    <UuContentKit.Bricks.BlockInfo>
                        <UU5.RichText.Block uu5string="Branch: ${configuration.git.branch}"/>
                    </UuContentKit.Bricks.BlockInfo>
                    <UU5.Bricks.Panel 
                        header="${projectPath}" 
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
                            data='<uu5json/>${JSON.stringify(tableData)}'
                        />
                    </UU5.Bricks.Panel>
                </UU5.Bricks.Section>
            </UU5.Bricks.Lsi.Item>
        </UU5.Bricks.Lsi>`
};

module.exports = template;