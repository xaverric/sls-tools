const {escapeUu5StringArray} = require("../../helper/uu5string-escape-helper");

// TODO rename, not chart template but table template

const template = (table, configuration) => {

    const [tableColumns, tableData] = table;

    const generateTable = () => {
        return ` <UU5.Bricks.Panel
            colorSchemaHeader=\\"blue-grey-rich\\"
        bgStyleHeader=\\"outline\\"
        bgStyleContent=\\"transparent\\"
        header=\\"Data\\"
        mountContent=\\"onEachExpand\\"
        colorSchemaContent=\\"\\"
        >
        <Uu5TilesBricks.Table
        columns='<uu5json/>${escapeUu5StringArray(tableColumns)}'
        data='<uu5json/>${escapeUu5StringArray(tableData)}'
            />
            </UU5.Bricks.Panel>`
    }
    const generateTables = () => {
        let tables = ``;
        for (const element of configuration.exports) {
            tables += generateTable()}
    return tables
    }
    
    return `<uu5string/>
    <UU5.Bricks.Lsi>
        <UU5.Bricks.Lsi.Item language="en">
            <UU5.Bricks.Section contentEditable colorSchema=null level="3" header="${configuration.exports.visualize.header}">
                <UuContentKit.Bricks.BlockDefault>
                    <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                </UuContentKit.Bricks.BlockDefault>
                <UuContentKit.Bricks.BlockInfo>
                    <UU5.RichText.Block uu5string="${configuration.exports.visualize.description}"/>
                </UuContentKit.Bricks.BlockInfo>
                <UU5.Bricks.Accordion onClickNotCollapseOthers 
                    content="<uu5string/>
                      ${generateTables()}
               
                       
                    mountPanelContent="onEachExpand"
                />
            </UU5.Bricks.Section>
        </UU5.Bricks.Lsi.Item>
    </UU5.Bricks.Lsi>`
}

module.exports = template;