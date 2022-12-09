const { escapeUu5StringArray} = require("../../helper/uu5string-escape-helper");

const template = (visualization, range, table, configuration) => {

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
    
    return `<uu5string/>
    <UU5.Bricks.Lsi>
        <UU5.Bricks.Lsi.Item language="en">
            <UU5.Bricks.Section contentEditable colorSchema=null level="3" header="${range.header}">
                <UuContentKit.Bricks.BlockDefault>
                    <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                </UuContentKit.Bricks.BlockDefault>
                <UuContentKit.Bricks.BlockInfo>
                    <UU5.RichText.Block uu5string="${range.description}"/>
                </UuContentKit.Bricks.BlockInfo>
                <UU5.Bricks.Accordion onClickNotCollapseOthers 
                    content="<uu5string/>
                      ${()=>{
                          //TODO create  function that will create tables based on configuration.exports count, separe function from code
      
            for (let i = 0; i < configuration.exports.length; i++) {
            generateTable()}
        }
                          
    }
               
                       
                    mountPanelContent="onEachExpand"
                />
            </UU5.Bricks.Section>
        </UU5.Bricks.Lsi.Item>
    </UU5.Bricks.Lsi>`
}

module.exports = template;